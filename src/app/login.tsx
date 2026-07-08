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
              style={styles.in}
            </View>
          </View>

        </View>

      </View>


    </KeyboardAvoidingView>
  )
}
