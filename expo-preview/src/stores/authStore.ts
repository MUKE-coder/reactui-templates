import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  avatar: string;
  location: string;
}

interface AuthStore {
  token: string | null;
  user: User | null;
  hasSeenOnboarding: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setHasSeenOnboarding: (value: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      hasSeenOnboarding: false,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),
      logout: () => set({ token: null, user: null }),
      isAuthenticated: () => get().token !== null,
    }),
    { name: 'auth-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
);
