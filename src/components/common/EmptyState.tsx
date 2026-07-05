import { View, Text, ViewProps } from 'react-native';

interface EmptyStateProps extends ViewProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
  ...props
}: EmptyStateProps) {
  return (
    <View className={className} {...props}>
      {icon && <Text>{icon}</Text>}
      <Text>{title}</Text>
      {description && <Text>{description}</Text>}
      {action}
    </View>
  );
}
