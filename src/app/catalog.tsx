import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { shadows, typography } from '@/theme';

const { fontSize, fontWeight } = typography;

const mockProducts = [
  { id: 1, name: 'Produto 1', price: 99.90 },
  { id: 2, name: 'Produto 2', price: 149.90 },
  { id: 3, name: 'Produto 3', price: 199.90 },
];

export default function CatalogScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo</Text>
      <FlatList
        data={mockProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/product-detail/${item.id}`)}
            style={styles.item}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.neutral[900],
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  itemName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.neutral[900],
  },
  itemPrice: {
    color: colors.primary[600],
    fontWeight: fontWeight.semibold,
    marginTop: 4,
  },
});
