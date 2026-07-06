import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const mockProducts = [
  { id: 1, name: 'Produto 1', price: 99.90 },
  { id: 2, name: 'Produto 2', price: 149.90 },
  { id: 3, name: 'Produto 3', price: 199.90 },
];

export default function CatalogScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl font-bold p-4">Catálogo</Text>
      <FlatList
        data={mockProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/product-detail/${item.id}`)}
            className="p-4 border-b border-neutral-200"
          >
            <Text className="text-lg">{item.name}</Text>
            <Text className="text-brand-500 font-semibold">
              R$ {item.price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
