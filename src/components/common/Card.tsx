import { View, ViewProps, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
}

const variantMap = {
  elevated: {
    backgroundColor: colors.white,
    ...{
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
  },
  outlined: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  filled: { backgroundColor: colors.neutral[50] },
};

export function Card({ variant = 'elevated', children, style, ...props }: CardProps) {
  return (
    <View style={[styles.base, variantMap[variant], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    padding: 16,
  },
});
