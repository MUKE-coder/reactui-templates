export const colors = {
  primary: {
    DEFAULT: "#F04E3E",
    light: "#FFF0EE",
    dark: "#C93B2C",
  },
  neutral: {
    900: "#1A1A1A",
    700: "#4A4A4A",
    500: "#888888",
    300: "#D4D4D4",
    100: "#F5F5F5",
  },
  white: "#FFFFFF",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  headingXl: { fontSize: 28, fontWeight: "700" as const, lineHeight: 34 },
  headingLg: { fontSize: 22, fontWeight: "700" as const, lineHeight: 28 },
  headingMd: { fontSize: 18, fontWeight: "600" as const, lineHeight: 24 },
  headingSm: { fontSize: 16, fontWeight: "600" as const, lineHeight: 22 },
  bodyLg: { fontSize: 16, fontWeight: "400" as const, lineHeight: 24 },
  bodyMd: { fontSize: 14, fontWeight: "400" as const, lineHeight: 20 },
  bodySm: { fontSize: 12, fontWeight: "400" as const, lineHeight: 18 },
  label: { fontSize: 12, fontWeight: "600" as const, lineHeight: 16 },
  price: { fontSize: 16, fontWeight: "700" as const, lineHeight: 22 },
  priceLg: { fontSize: 22, fontWeight: "700" as const, lineHeight: 28 },
} as const;

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
} as const;
