import { View, Text, ViewProps } from 'react-native';

interface HeaderProps extends ViewProps {
  title: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  leftAction,
  rightAction,
  className = '',
  ...props
}: HeaderProps) {
  return (
    <View className={className} {...props}>
      {leftAction}
      <View>
        <Text>{title}</Text>
        {subtitle && <Text>{subtitle}</Text>}
      </View>
      {rightAction}
    </View>
  );
}
