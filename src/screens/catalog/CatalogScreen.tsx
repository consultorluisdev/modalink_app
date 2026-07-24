import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StatusBar,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

import { colors, typography, shadows } from '@/theme';
import { formatCurrency, calcDiscount } from '@/utils';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';
import api from '@/services/api';
import type { Product, ProductCategory } from '@/types';

const { width } = Dimensions.get('window');
const CARD_W = (width - 48) / 2;

const useCategories = () =>
  useQuery<ProductCategory[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<ProductCategory[]>('/products/categories');
      return data;
    },
    staleTime: 5 * 60_000,
  });

const useProducts = (search: string, categoryId: string | null) =>
  useQuery<Product[]>({
    queryKey: ['products', search, categoryId],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products', {
        params: {
          search: search || undefined,
          categoryId: categoryId || undefined,
          limit: 40,
        },
      });
      return data;
    },
    staleTime: 30_000,
  });

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const favorited = isFavorite(product.id);
  const hasDiscount =
    product.compareAtPrice != null && product.compareAtPrice > product.price;

  return (
    <TouchableOpacity style={cardStyles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={cardStyles.imageWrap}>
        {product.images?.[0] ? (
          <Image
            source={{ uri: product.images[0] }}
            style={cardStyles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={cardStyles.imagePlaceholder}>
            <Ionicons name="image-outline" size={32} color={colors.neutral[300]} />
          </View>
        )}

        {hasDiscount && (
          <View style={cardStyles.discountWrap}>
            <View style={cardStyles.discountBadge}>
              <Text style={cardStyles.discountText}>
                -{calcDiscount(product.price, product.compareAtPrice!)}%
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={cardStyles.favBtn}
          onPress={() => toggle({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] })}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={18}
            color={favorited ? colors.error : colors.neutral[400]}
          />
        </TouchableOpacity>

        {product.stock === 0 && (
          <View style={cardStyles.outOfStock}>
            <Text style={cardStyles.outOfStockText}>Sem estoque</Text>
          </View>
        )}
      </View>

      <View style={cardStyles.info}>
        <Text style={cardStyles.category} numberOfLines={1}>
          {product.category?.name ?? ''}
        </Text>
        <Text style={cardStyles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={cardStyles.priceRow}>
          <Text style={cardStyles.price}>{formatCurrency(product.price)}</Text>
          {hasDiscount && (
            <Text style={cardStyles.comparePrice}>
              {formatCurrency(product.compareAtPrice!)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    width: CARD_W,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.md,
  },
  imageWrap: {
    width: '100%',
    height: 180,
    backgroundColor: colors.neutral[100],
    position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountWrap: { position: 'absolute', top: 8, left: 8 },
  discountBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  discountText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  favBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  outOfStock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingVertical: 5,
    alignItems: 'center',
  },
  outOfStockText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
    marginBottom: 2,
  },
  info: {
    padding: 10,
  },
  category: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
    marginBottom: 2,
  },
  name: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: 6,
    lineHeight: 18,
  },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  price: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[700],
  },
  comparePrice: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
    textDecorationLine: 'line-through',
  },
});

export const CatalogScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const itemCount = useCartStore((s) => s.itemCount);

  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories } = useCategories();
  const {
    data: products,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useProducts(search, selectedCategory);

  const handleSearch = useCallback(() => {
    setSearch(searchInput);
  }, [searchInput]);

  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    setSearch('');
  }, []);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={() =>
          router.push(`/product-detail/${item.id}` as any)
        }
      />
    ),
    [router]
  );

  const renderSkeleton = () => (
    <View style={styles.grid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={[cardStyles.card, styles.skeletonCard]}>
          <View style={[cardStyles.imageWrap, { backgroundColor: colors.neutral[200] }]} />
          <View style={cardStyles.info}>
            <View style={[styles.skeletonLine, { width: '40%', height: 10, marginBottom: 6 }]} />
            <View style={[styles.skeletonLine, { width: '80%', height: 12, marginBottom: 8 }]} />
            <View style={[styles.skeletonLine, { width: '50%', height: 14 }]} />
          </View>
        </View>
      ))}
    </View>
  );

  if (isError) {
    return (
      <View style={[styles.flex, styles.centered]}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
        <Text style={styles.errorTitle}>Erro ao carregar catálogo</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Catálogo</Text>
            <Text style={styles.headerSub}>
              {products?.length ?? 0} produto
              {(products?.length ?? 0) !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push('/favorites' as any)}
            >
              <Ionicons name="heart-outline" size={22} color={colors.neutral[700]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push('/cart' as any)}
            >
              <Ionicons name="bag-outline" size={22} color={colors.neutral[700]} />
              {itemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {itemCount > 9 ? '9+' : itemCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchWrap}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color={colors.neutral[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar produtos..."
              placeholderTextColor={colors.neutral[400]}
              value={searchInput}
              onChangeText={setSearchInput}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchInput.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch}>
                <Ionicons name="close-circle" size={18} color={colors.neutral[400]} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {(categories?.length ?? 0) > 0 && (
          <FlatList
            data={[{ id: null, name: 'Todos' }, ...(categories ?? [])] as any[]}
            keyExtractor={(item) => item.id ?? 'all'}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => {
              const active = selectedCategory === item.id;
              return (
                <TouchableOpacity
                  style={[styles.categoryChip, active && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(item.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      {isLoading ? (
        renderSkeleton()
      ) : (products?.length ?? 0) === 0 ? (
        <View style={[styles.flex, styles.centered]}>
          <Ionicons name="search-outline" size={48} color={colors.neutral[300]} />
          <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
          <Text style={styles.emptyDesc}>
            Tente buscar por outro termo ou categoria.
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.grid}
          contentContainerStyle={styles.listContent}
          renderItem={renderProduct}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.white },
  centered: { alignItems: 'center', justifyContent: 'center', gap: 12 },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  headerSub: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginTop: 2,
  },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.primary[500],
    borderRadius: 999,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
  },
  searchWrap: { marginBottom: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.neutral[900],
  },
  categoriesList: { gap: 8, paddingBottom: 4 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.neutral[100],
  },
  categoryChipActive: {
    backgroundColor: colors.primary[500],
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    fontWeight: typography.fontWeight.medium,
  },
  categoryTextActive: {
    color: colors.white,
  },
  grid: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  skeletonCard: {
    backgroundColor: colors.neutral[100],
    ...shadows.sm,
  },
  skeletonLine: {
    backgroundColor: colors.neutral[200],
    borderRadius: 6,
  },
  errorTitle: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[700],
    fontWeight: typography.fontWeight.medium,
  },
  retryBtn: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
  },
  retryText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  emptyTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[700],
  },
  emptyDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
});
