import { View, ViewProps, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
  scroll?: boolean;
  padded?: boolean;
}

export function Screen({
  scroll = false,
  padded = true,
  className = '',
  children,
  ...props
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className={`flex-1 ${padded ? 'px-4' : ''} ${className}`}
      {...props}
    >
      {children}
    </View>
  );

  if (scroll) {
    return <ScrollView>{content}</ScrollView>;
  }

  return content;
}
