import { View, ViewProps } from 'react-native';

interface ContainerProps extends ViewProps {
  padded?: boolean;
}

export function Container({
  padded = true,
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <View className={`flex-1 ${padded ? 'px-4' : ''} ${className}`} {...props}>
      {children}
    </View>
  );
}
