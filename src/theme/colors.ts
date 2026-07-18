export const colors = {
  primary: {
    50: '#F3EEFF',
    100: '#E4D5FE',
    200: '#C9ABFD',
    300: '#AE81FC',
    400: '#8B52FB',
    500: '#6D28FF',
    600: '#7C3AED',
    700: '#5B21B6',
    800: '#4C1D95',
    900: '#3B0764',
  },
  secondary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  white: '#FFFFFF',
  black: '#000000',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  sidebar: '#09090B',
  border: '#E5E7EB',
} as const;

export const gradient = {
  primary: ['#5B21B6', '#6D28FF', '#9333EA', '#C026D3'] as const,
} as const;

export type ColorKey = keyof typeof colors;
