import { ActivityIndicator, View, Text, ViewProps } from 'react-native';

interface LoaderProps extends ViewProps {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
}

export function Loader({
  size = 'large',
  message,
  fullScreen = false,
  className = '',
  ...props
}: LoaderProps) {
  const content = (
    <View className={`items-center justify-center ${className}`} {...props}>
      <ActivityIndicator size={size} color="#6C3EF4" />
      {message && <Text className="mt-3 text-neutral-600">{message}</Text>}
    </View>
  );

  if (fullScreen) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        {content}
      </View>
    );
  }

  return content;
}
