import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistStore {
  items: string[];
  toggleItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId) =>
        set((state) => {
          const exists = state.items.includes(productId);
          return {
            items: exists
              ? state.items.filter((id) => id !== productId)
              : [...state.items, productId],
          };
        }),
      isWishlisted: (productId) => get().items.includes(productId),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
