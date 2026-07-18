import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantBg = {
  primary: colors.primary[500],
  secondary: colors.neutral[800],
  outline: 'transparent',
  ghost: 'transparent',
};

const variantText = {
  primary: colors.white,
  secondary: colors.white,
  outline: colors.primary[500],
  ghost: colors.primary[500],
};

const sizeMap = {
  sm: { paddingHorizontal: 16, paddingVertical: 8 },
  md: { paddingHorizontal: 24, paddingVertical: 14 },
  lg: { paddingHorizontal: 32, paddingVertical: 16 },
};

export function Button({ title, variant = 'primary', size = 'md', loading = false, disabled, style, ...props }: ButtonProps) {
  const isLoading = disabled || loading;

  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[
        styles.base,
        { backgroundColor: variantBg[variant] },
        variant === 'outline' ? { borderWidth: 1, borderColor: colors.primary[500] } : undefined,
        sizeMap[size],
        isLoading && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' || variant === 'ghost' ? colors.primary[500] : colors.white} />
      ) : (
        <Text style={[styles.text, { color: variantText[variant] }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  text: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
