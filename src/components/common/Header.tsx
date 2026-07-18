import { View, Text, ViewProps, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface HeaderProps extends ViewProps {
  title: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export function Header({ title, subtitle, leftAction, rightAction, style, ...props }: HeaderProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {leftAction}
      <View style={styles.textContainer}>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightAction}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: 12,
    color: colors.neutral[500],
  },
});
