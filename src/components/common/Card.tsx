import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
}

export function Card({
  variant: _variant = 'elevated',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <View className={className} {...props}>
      {children}
    </View>
  );
}
