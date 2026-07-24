import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface FavoritesState {
  favorites: FavoriteProduct[];
  isHydrated: boolean;
  toggle: (product: FavoriteProduct) => void;
  isFavorite: (id: string) => boolean;
  hydrate: () => Promise<void>;
}

const STORAGE_KEY = '@ModalinkApp:favorites';

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isHydrated: false,

  toggle: (product) => {
    const { favorites } = get();
    const exists = favorites.some((f) => f.id === product.id);
    const next = exists
      ? favorites.filter((f) => f.id !== product.id)
      : [...favorites, product];
    set({ favorites: next });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },

  isFavorite: (id) => get().favorites.some((f) => f.id === id),

  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) set({ favorites: JSON.parse(raw), isHydrated: true });
      else set({ isHydrated: true });
    } catch {
      set({ isHydrated: true });
    }
  },
}));

export function useHydrateFavorites() {
  const hydrate = useFavoritesStore((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}
