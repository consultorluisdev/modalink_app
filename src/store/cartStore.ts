import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
  itemCount: number;
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  hydrate: () => Promise<void>;
}

const STORAGE_KEY = '@ModalinkApp:cart';

function calcItemCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isHydrated: false,
  itemCount: 0,

  addItem: (product, quantity = 1) => {
    const { items } = get();
    const existing = items.find((i) => i.id === product.id);
    let next: CartItem[];
    if (existing) {
      next = items.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      next = [...items, { ...product, quantity }];
    }
    set({ items: next, itemCount: calcItemCount(next) });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },

  removeItem: (id) => {
    const next = get().items.filter((i) => i.id !== id);
    set({ items: next, itemCount: calcItemCount(next) });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    const next = get().items.map((i) =>
      i.id === id ? { ...i, quantity } : i
    );
    set({ items: next, itemCount: calcItemCount(next) });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },

  clear: () => {
    set({ items: [], itemCount: 0 });
    AsyncStorage.removeItem(STORAGE_KEY);
  },

  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items: CartItem[] = JSON.parse(raw);
        set({ items, itemCount: calcItemCount(items), isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch {
      set({ isHydrated: true });
    }
  },
}));

export function useHydrateCart() {
  const hydrate = useCartStore((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}
