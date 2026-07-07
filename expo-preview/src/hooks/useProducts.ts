import { useQuery } from '@tanstack/react-query';
import { mockFetch } from '@/lib/mockApi';
import products from '@/mock/products.json';

export const useProducts = (categoryId?: string) => {
  return useQuery({
    queryKey: ['products', categoryId],
    queryFn: () =>
      mockFetch(
        categoryId
          ? products.filter((p) => p.categoryId === categoryId)
          : products
      ),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () =>
      mockFetch(products.find((p) => p.id === productId) ?? null),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFlashSaleProducts = () => {
  return useQuery({
    queryKey: ['products', 'flash-sale'],
    queryFn: () => mockFetch(products.filter((p) => p.isFlashSale)),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () =>
      mockFetch(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
      ),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
