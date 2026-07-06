import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '@/services/api';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const data = (error as { response: { data: { message?: string } } }).response.data;
        Alert.alert('Erro', data.message || 'Erro ao criar conta');
      } else {
        Alert.alert('Erro', 'Erro ao criar conta');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-3xl font-bold text-brand-500 mb-8">Criar Conta</Text>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          className="w-full border border-neutral-300 rounded-lg p-4 mb-4"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-full border border-neutral-300 rounded-lg p-4 mb-4"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-neutral-300 rounded-lg p-4 mb-6"
        />
        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          className="w-full bg-brand-500 rounded-lg p-4 items-center"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Cadastrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-brand-500">Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
