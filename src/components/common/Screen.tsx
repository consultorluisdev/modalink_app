import { View, ViewProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

interface ScreenProps extends ViewProps {
  scroll?: boolean;
  padded?: boolean;
}

export function Screen({ scroll = false, padded = true, children, style, ...props }: ScreenProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[styles.base, padded && styles.padded, { paddingTop: insets.top, paddingBottom: insets.bottom }, style]}
      {...props}
    >
      {children}
    </View>
  );

  if (scroll) {
    return <>{content}</>;
  }

  return content;
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  padded: {
    paddingHorizontal: 16,
  },
});
