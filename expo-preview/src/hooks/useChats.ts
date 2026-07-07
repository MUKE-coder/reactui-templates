import { useQuery } from '@tanstack/react-query';
import { mockFetch } from '@/lib/mockApi';
import chats from '@/mock/chats.json';

export const useChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => mockFetch(chats),
    staleTime: 1 * 60 * 1000,
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () =>
      mockFetch(chats.find((c) => c.id === chatId) ?? null),
    staleTime: 1 * 60 * 1000,
  });
};

export const useUnreadChatCount = () => {
  return useQuery({
    queryKey: ['chats', 'unread-count'],
    queryFn: () =>
      mockFetch(chats.reduce((sum, c) => sum + c.unreadCount, 0)),
    staleTime: 1 * 60 * 1000,
  });
};
