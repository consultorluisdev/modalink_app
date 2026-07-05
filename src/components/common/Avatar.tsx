import { Image, View, Text, ImageProps } from 'react-native';

interface AvatarProps extends Omit<ImageProps, 'source'> {
  source?: ImageProps['source'];
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  uri?: string;
}

export function Avatar({
  source,
  name,
  size: _size = 'md',
  uri,
  className = '',
  ...props
}: AvatarProps) {
  const imgSource = source || (uri ? { uri } : undefined);

  if (imgSource) {
    return (
      <Image source={imgSource} className={className} {...props} />
    );
  }

  return (
    <View className={className}>
      <Text>{name?.charAt(0).toUpperCase() || '?'}</Text>
    </View>
  );
}
