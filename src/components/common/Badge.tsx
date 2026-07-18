import { View, Text, ViewProps, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface BadgeProps extends ViewProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

const variantBg = {
  default: colors.neutral[100],
  success: '#DCFCE7',
  warning: '#FEF9C3',
  error: '#FEE2E2',
  info: '#DBEAFE',
};

const variantText = {
  default: colors.neutral[600],
  success: '#15803D',
  warning: '#A16207',
  error: '#DC2626',
  info: '#2563EB',
};

export function Badge({ label, variant = 'default', size = 'sm', style, ...props }: BadgeProps) {
  return (
    <View
      style={[
        styles.base,
        { backgroundColor: variantBg[variant] },
        size === 'md' ? styles.md : styles.sm,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: variantText[variant] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
