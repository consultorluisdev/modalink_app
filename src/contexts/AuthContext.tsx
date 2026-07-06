import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface User {
    name: string;
    email: string;
}

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try{
                const token = await AsyncStorage.getItem('@ModalinkApp:token');
                const userData = await AsyncStorage.getItem('@ModalinkApp:user');

                if(token && userData){
                    api.defaults.headers.Authorization = `Bearer ${token}`;
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    const login = async (email: string, password: string) => {
        try{
            const response = await api.post('/auth/login', { email, password });
            const { token, userName, userEmail } = response.data;

            await AsyncStorage.setItem('@ModalinkApp:token', token);
            await AsyncStorage.setItem('@ModalinkApp:user', JSON.stringify({ name: userName, email: userEmail }));
            
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUser({ name: userName, email: userEmail });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Erro ao fazer login', { cause: error });
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('@ModalinkApp:token');
        await AsyncStorage.removeItem('@ModalinkApp:user');
        delete api.defaults.headers.Authorization;
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth deve ser usado dentro de uma AuthProvider');
    }
    return context; 
}