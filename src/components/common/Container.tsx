import { View, ViewProps, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface ContainerProps extends ViewProps {
  padded?: boolean;
}

export function Container({ padded = true, children, style, ...props }: ContainerProps) {
  return (
    <View style={[styles.base, padded && styles.padded, style]} {...props}>
      {children}
    </View>
  );
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
