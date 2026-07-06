import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
}

const variantStyles: Record<string, string> = {
  elevated: 'bg-white shadow-md',
  outlined: 'bg-white border border-neutral-200',
  filled: 'bg-neutral-100',
};

export function Card({
  variant = 'elevated',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <View className={`rounded-lg p-4 ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </View>
  );
}
