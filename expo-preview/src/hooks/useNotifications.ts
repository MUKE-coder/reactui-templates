import { useQuery } from '@tanstack/react-query';
import { mockFetch } from '@/lib/mockApi';
import notifications from '@/mock/notifications.json';

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => mockFetch(notifications),
    staleTime: 1 * 60 * 1000,
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () =>
      mockFetch(notifications.filter((n) => !n.read).length),
    staleTime: 1 * 60 * 1000,
  });
};
