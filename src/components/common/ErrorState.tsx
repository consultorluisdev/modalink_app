import { View, Text, ViewProps } from 'react-native';

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
    <View className={className} {...props}>
      <Text>{title}</Text>
      <Text>{message}</Text>
      {onRetry && <Text>{retryLabel}</Text>}
    </View>
  );
}
