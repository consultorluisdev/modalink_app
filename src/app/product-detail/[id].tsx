import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Produto #{id}</Text>
      <Text className="text-neutral-600 mb-8">Detalhes do produto em breve</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-brand-500 rounded-lg px-6 py-3">
        <Text className="text-white font-semibold">Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
