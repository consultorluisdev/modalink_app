import { View, ViewProps } from 'react-native';

interface ContainerProps extends ViewProps {
  padded?: boolean;
}

export function Container({
  padded: _padded = true,
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <View className={className} {...props}>
      {children}
    </View>
  );
}
