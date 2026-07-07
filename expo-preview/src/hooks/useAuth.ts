import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const hasSeenOnboarding = useAuthStore((state) => state.hasSeenOnboarding);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setHasSeenOnboarding = useAuthStore(
    (state) => state.setHasSeenOnboarding
  );
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return {
    token,
    user,
    hasSeenOnboarding,
    setToken,
    setUser,
    setHasSeenOnboarding,
    logout,
    isAuthenticated,
  };
};
