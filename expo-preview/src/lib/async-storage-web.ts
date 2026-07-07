// Web shim for @react-native-async-storage/async-storage used by zustand
// persist middleware in extracted stores. Backed by localStorage (falls back to
// in-memory). Aliased in vite.config.
const mem = new Map<string, string>();

const backend =
  typeof localStorage !== "undefined"
    ? {
        get: (k: string) => localStorage.getItem(k),
        set: (k: string, v: string) => localStorage.setItem(k, v),
        del: (k: string) => localStorage.removeItem(k),
      }
    : {
        get: (k: string) => (mem.has(k) ? (mem.get(k) as string) : null),
        set: (k: string, v: string) => void mem.set(k, v),
        del: (k: string) => void mem.delete(k),
      };

const AsyncStorage = {
  getItem: async (key: string) => backend.get(key),
  setItem: async (key: string, value: string) => {
    backend.set(key, value);
  },
  removeItem: async (key: string) => {
    backend.del(key);
  },
  clear: async () => {},
  getAllKeys: async () => [] as string[],
};

export default AsyncStorage;
