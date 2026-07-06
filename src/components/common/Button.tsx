import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantStyles: Record<string, string> = {
  primary: 'bg-brand-500',
  secondary: 'bg-neutral-800',
  outline: 'border border-brand-500 bg-transparent',
  ghost: 'bg-transparent',
};

const variantTextStyles: Record<string, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-brand-500',
  ghost: 'text-brand-500',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      className={`items-center justify-center rounded-lg ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' || variant === 'ghost' ? '#6C3EF4' : '#fff'} />
      ) : (
        <Text className={`font-semibold ${variantTextStyles[variant]}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
