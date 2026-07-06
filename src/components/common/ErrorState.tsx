import { View, Text, TouchableOpacity, ViewProps } from 'react-native';

interface ErrorStateProps extends ViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Algo deu errado',
  message = 'Tente novamente mais tarde.',
  onRetry,
  retryLabel = 'Tentar novamente',
  className = '',
  ...props
}: ErrorStateProps) {
  return (
    <View className={`items-center justify-center p-8 ${className}`} {...props}>
      <Text className="text-lg font-semibold text-neutral-800 mb-2">{title}</Text>
      <Text className="text-neutral-600 text-center mb-4">{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} className="bg-brand-500 rounded-lg px-6 py-3">
          <Text className="text-white font-semibold">{retryLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
