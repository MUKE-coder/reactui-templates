import { create } from 'zustand';

type Gender = 'all' | 'men' | 'women';

interface FiltersStore {
  sortBy: string;
  category: string;
  sizes: string[];
  priceRange: [number, number];
  colors: string[];
  gender: Gender;
  setSortBy: (sort: string) => void;
  setCategory: (cat: string) => void;
  toggleSize: (size: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleColor: (color: string) => void;
  setGender: (gender: Gender) => void;
  resetFilters: () => void;
}

const initialState = {
  sortBy: 'popular',
  category: '',
  sizes: [] as string[],
  priceRange: [0, 10000] as [number, number],
  colors: [] as string[],
  gender: 'all' as Gender,
};

export const useFiltersStore = create<FiltersStore>()((set) => ({
  ...initialState,

  setSortBy: (sort) => set({ sortBy: sort }),

  setCategory: (cat) => set({ category: cat }),

  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size],
    })),

  setPriceRange: (range) => set({ priceRange: range }),

  toggleColor: (color) =>
    set((state) => ({
      colors: state.colors.includes(color)
        ? state.colors.filter((c) => c !== color)
        : [...state.colors, color],
    })),

  setGender: (gender) => set({ gender }),

  resetFilters: () => set(initialState),
}));
