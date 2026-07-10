import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from 'expo-router/build/react-navigation';

type LoginScreenNavigatorProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth();
  const Navigation = useNavigation<LoginScreenNavigatorProp>();

  const handleLogin = async () => {
    if(!email || "password"){
      Alert.alert('Erro', 'Por Favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    try{
      await login(email, password);
    }catch(error: any){
      Alert.alert('Erro', error.message || 'Falha ao fazer login');
    }finally{
      setIsLoading(false);
    }
  };

  return(
    <KeyboardAvoidingView style={styles.container} behavior={Plataform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}></Text>
          </View>
          <Text style={styles.title}>ModaLink</Text>
          <Text style={styles.subtitle}>Bem-vindo(a) de volta!</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
            style={styles.input}
            placeholder='seu@email.com'
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-addres'
            />

            <View style={StyleSheet.inputContainer}>
              <Text styles={styles.label}>Senha</Text>
              <TextInput
              style={styles.input}
              placeholder='.......'
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry />
            </View>

            <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />

              ): (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
            style={StyleSheet.registerLinkText}>
              Não tem uma conta? <Text style={styles.registerLinkText}>Criar conta

              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e1b4b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e1b4b',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  loginButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerLinkText: {
    fontSize: 14,
    color: '#666',
  },
  registerLinkHighlight: {
    color: '#1e1b4b',
    fontWeight: 'bold',
  },
});

export default LoginScreen;