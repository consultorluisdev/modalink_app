import { Image, View, Text, ImageProps, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface AvatarProps extends Omit<ImageProps, 'source'> {
  source?: ImageProps['source'];
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  uri?: string;
}

export function Avatar({ source, name, size: _size = 'md', uri, style, ...props }: AvatarProps) {
  const imgSource = source || (uri ? { uri } : undefined);

  if (imgSource) {
    return <Image source={imgSource} style={[styles.image, style]} {...props} />;
  }

  return (
    <View style={[styles.fallback, style]}>
      <Text style={styles.fallbackText}>{name?.charAt(0).toUpperCase() || '?'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  fallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[600],
  },
});
