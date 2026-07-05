import { ActivityIndicator, View, Text, ViewProps } from 'react-native';

interface LoaderProps extends ViewProps {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
}

export function Loader({
  size = 'large',
  message,
  fullScreen: _fullScreen = false,
  className = '',
  ...props
}: LoaderProps) {
  return (
    <View className={className} {...props}>
      <ActivityIndicator size={size} />
      {message && <Text>{message}</Text>}
    </View>
  );
}
