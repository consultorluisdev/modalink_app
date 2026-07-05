import { TextInput, Text, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <View>
      {label && <Text>{label}</Text>}
      <TextInput className={className} {...props} />
      {error && <Text>{error}</Text>}
    </View>
  );
}
