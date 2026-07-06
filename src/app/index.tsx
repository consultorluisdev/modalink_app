import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect href="/login" />;
  return <Redirect href="/catalog" />;
}
