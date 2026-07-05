import { View, Text, ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({
  label,
  variant: _variant = 'default',
  size: _size = 'sm',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <View className={className} {...props}>
      <Text>{label}</Text>
    </View>
  );
}
