import { useWishlistStore } from '@/stores/wishlistStore';
import { useQuery } from '@tanstack/react-query';
import { mockFetch } from '@/lib/mockApi';
import products from '@/mock/products.json';

export const useWishlist = () => {
  const items = useWishlistStore((state) => state.items);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  return { items, toggleItem, isWishlisted, clearWishlist };
};

export const useWishlistProducts = (categoryId?: string) => {
  const items = useWishlistStore((state) => state.items);

  return useQuery({
    queryKey: ['wishlist-products', items, categoryId],
    queryFn: () => {
      const wishlisted = products.filter((p) => items.includes(p.id));
      return mockFetch(
        categoryId
          ? wishlisted.filter((p) => p.categoryId === categoryId)
          : wishlisted
      );
    },
    staleTime: 1 * 60 * 1000,
  });
};
