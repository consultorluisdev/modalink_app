import { ActivityIndicator, View, Text, ViewProps, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface LoaderProps extends ViewProps {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
}

export function Loader({ size = 'large', message, fullScreen = false, style, ...props }: LoaderProps) {
  const content = (
    <View style={[styles.center, style]} {...props}>
      <ActivityIndicator size={size} color={colors.primary[500]} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );

  if (fullScreen) {
    return <View style={styles.fullScreen}>{content}</View>;
  }

  return content;
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 12,
    color: colors.neutral[500],
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
  },
});
