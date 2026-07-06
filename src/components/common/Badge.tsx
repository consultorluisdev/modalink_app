import { View, Text, ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

const variantStyles: Record<string, string> = {
  default: 'bg-neutral-200',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
  info: 'bg-blue-100',
};

const variantTextStyles: Record<string, string> = {
  default: 'text-neutral-700',
  success: 'text-green-700',
  warning: 'text-yellow-700',
  error: 'text-red-700',
  info: 'text-blue-700',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-2 py-0.5',
  md: 'px-3 py-1',
};

export function Badge({
  label,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <View className={`rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      <Text className={`text-xs font-medium ${variantTextStyles[variant]}`}>{label}</Text>
    </View>
  );
}
