import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';
import { colors, shadows, typography } from '@/theme';
import { formatCurrency } from '@/utils';
import api from '@/services/api';

const { fontSize, fontWeight } = typography;
const { width } = Dimensions.get('window');
const CARD_W = (width - 48) / 2;

interface DashData {
  todaySales: number;
  monthSales: number;
  totalSales: number;
  totalCustomers: number;
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    status: string;
  }[];
}

const useDashboard = () => {
  return useQuery<DashData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard');
      return data;
    },
    staleTime: 60_000,
  });
};

interface MetricCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
  isCurrency?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, color, isCurrency = true }) => (
  <View style={[metricStyles.card, { width: CARD_W }]}>
    <View style={[metricStyles.icon, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon as any} size={20} color={color} />
    </View>
    <Text style={metricStyles.value}>
      {isCurrency ? formatCurrency(value) : value.toString()}
    </Text>
    <Text style={metricStyles.label}>{label}</Text>
  </View>
);

const metricStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    ...shadows.sm,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.neutral[900],
    letterSpacing: -0.5,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.neutral[500],
    marginTop: 2,
  },
});

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { data, isLoading, isError, refetch, isRefetching } = useDashboard();

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando dashboard...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Erro ao carregar dados</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const metrics: MetricCardProps[] = [
    {
      label: 'Vendas hoje',
      value: data?.todaySales ?? 0,
      icon: 'trending-up',
      color: colors.primary[500],
    },
    {
      label: 'Mês atual',
      value: data?.monthSales ?? 0,
      icon: 'receipt-outline',
      color: colors.secondary[500],
      isCurrency: false,
    },
  ];

  const quickActions = [
    { label: 'Catálogo', icon: 'grid-outline', tab: '/catalog', color: colors.primary[500] },
    { label: 'Pedidos', icon: 'receipt-outline', tab: '/orders', color: colors.info },
    { label: 'Clientes', icon: 'people-outline', tab: '/customers', color: colors.success },
    { label: 'Promoções', icon: 'pricetag-outline', tab: '/promotions', color: colors.warning },
  ];

  return (
    <View style={styles.flex}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.flex}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor={colors.primary[500]}
          />
        }
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>
                Olá, {user?.name.split(' ')[0] ?? 'Vendedor'} 👋
              </Text>
              <Text style={styles.headerSub}>Aqui está o resumo de hoje</Text>
            </View>

            <TouchableOpacity onPress={logout} style={styles.avatarBtn}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitial}>
                  {user?.name.charAt(0).toUpperCase() ?? 'U'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Highlight do dia */}
          <View style={styles.highlight}>
            <Text style={styles.highlightLabel}>Faturamento de hoje</Text>
            <Text style={styles.highlightValue}>
              {formatCurrency(data?.todaySales ?? 0)}
            </Text>
            <View style={styles.highlightBadge}>
              <Ionicons name="trending-up" size={13} color={colors.success} />
              <Text style={styles.highlightBadgeText}>Meta diária em progresso</Text>
            </View>
          </View>
        </View>

        {/* Métricas */}
        <View style={styles.metricsGrid}>
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </View>

        {/* Acesso rápido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acesso rápido</Text>
          <View style={styles.quickGrid}>
            {quickActions.map((a) => (
              <TouchableOpacity
                key={a.label}
                style={styles.quickItem}
                onPress={() => router.push(a.tab as any)}
                activeOpacity={0.75}
              >
                <View style={[styles.quickIcon, { backgroundColor: `${a.color}12` }]}>
                  <Ionicons name={a.icon as any} size={24} color={a.color} />
                </View>
                <Text style={styles.quickLabel}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pedidos recentes */}
        <View style={[styles.section, { paddingBottom: 32 }]}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Pedidos recentes</Text>
            <TouchableOpacity onPress={() => router.push('/orders' as any)}>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {(data?.recentOrders ?? []).length === 0 ? (
            <View style={styles.emptyOrders}>
              <Ionicons name="receipt-outline" size={32} color={colors.neutral[300]} />
              <Text style={styles.emptyText}>Nenhum pedido ainda</Text>
            </View>
          ) : (
            <View style={styles.ordersList}>
              {(data?.recentOrders ?? []).map((order) => (
                <TouchableOpacity
                  key={order.id}
                  style={styles.orderCard}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/order/${order.id}` as any)}
                >
                  <View style={styles.orderLeft}>
                    <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                    <Text style={styles.orderCustomer}>{order.customerName}</Text>
                  </View>
                  <View style={styles.orderRight}>
                    <Text style={styles.orderTotal}>{formatCurrency(order.total)}</Text>
                    <View style={styles.statusTag}>
                      <Text style={styles.statusText}>{order.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.neutral[50] },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.neutral[50] },
  loadingText: { fontSize: fontSize.md, color: colors.neutral[500] },
  retryButton: { marginTop: 12, padding: 12, backgroundColor: colors.primary[500], borderRadius: 12 },
  retryText: { color: colors.white, fontWeight: '600' },

  // header
  header: { paddingHorizontal: 20, paddingBottom: 32, backgroundColor: colors.white },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greeting: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.neutral[900],
  },
  headerSub: {
    fontSize: fontSize.sm,
    color: colors.neutral[500],
    marginTop: 2,
  },
  avatarBtn: { padding: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },

  // Highlight
  highlight: {
    backgroundColor: colors.neutral[900],
    borderRadius: 16,
    padding: 20,
  },
  highlightLabel: {
    fontSize: fontSize.sm,
    color: colors.neutral[400],
  },
  highlightValue: {
    fontSize: 38,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginTop: 4,
    letterSpacing: -1,
  },
  highlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  highlightBadgeText: {
    fontSize: fontSize.xs,
    color: colors.success,
    fontWeight: fontWeight.medium,
  },

  // Métricas
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: -16,
    marginBottom: 8,
  },

  // Seção
  section: { paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: 14,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  seeAll: {
    fontSize: fontSize.sm,
    color: colors.primary[500],
    fontWeight: fontWeight.semibold,
  },

  // Quick actions
  quickGrid: { flexDirection: 'row', gap: 12 },
  quickItem: { flex: 1, alignItems: 'center', gap: 8 },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.neutral[600],
    textAlign: 'center',
  },

  // Pedidos
  ordersList: { gap: 10 },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    ...shadows.sm,
  },
  orderLeft: { gap: 3 },
  orderNumber: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.neutral[900],
  },
  orderCustomer: { fontSize: fontSize.sm, color: colors.neutral[500] },
  orderRight: { alignItems: 'flex-end', gap: 6 },
  orderTotal: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primary[600],
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colors.neutral[100],
  },
  statusText: { fontSize: fontSize.xs, color: colors.neutral[500] },

  // Empty
  emptyOrders: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  emptyText: { fontSize: fontSize.sm, color: colors.neutral[400] },
});
