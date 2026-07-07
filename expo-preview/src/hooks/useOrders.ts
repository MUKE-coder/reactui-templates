import { useQuery } from '@tanstack/react-query';
import { mockFetch } from '@/lib/mockApi';
import orders from '@/mock/orders.json';

type OrderStatus = 'active' | 'completed' | 'cancelled';

export const useOrders = (status?: OrderStatus) => {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: () =>
      mockFetch(
        status ? orders.filter((o) => o.status === status) : orders
      ),
    staleTime: 1 * 60 * 1000,
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () =>
      mockFetch(orders.find((o) => o.id === orderId) ?? null),
    staleTime: 1 * 60 * 1000,
  });
};
