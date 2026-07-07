import {
  LayoutGrid,
  ShoppingBag,
  Home,
  ShoppingCart,
  Package,
  Layers,
  MessagesSquare,
  Gift,
  PanelTop,
  Grid3x3,
  LogIn,
  Store,
  CreditCard,
  UserRound,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export type ExpoCategory = {
  name: string;
  slug: string;
  count: number;
  icon: LucideIcon;
  description: string;
};

// Single source of truth for the Expo UI category nav + landing grid.
export const expoCategories: ExpoCategory[] = [
  {
    name: "Auth & Onboarding",
    slug: "auth",
    count: 6,
    icon: LogIn,
    description: "Full onboarding, login, register, OTP & password screens.",
  },
  {
    name: "Shop Screens",
    slug: "shop",
    count: 5,
    icon: Store,
    description: "Home feed, product detail, cart, wishlist, search screens.",
  },
  {
    name: "Checkout",
    slug: "checkout",
    count: 5,
    icon: CreditCard,
    description: "Full checkout flow: address, payment, review, success.",
  },
  {
    name: "Account",
    slug: "account",
    count: 4,
    icon: UserRound,
    description: "Profile, orders, wallet and edit-profile screens.",
  },
  {
    name: "Dashboard & Charts",
    slug: "dashboard",
    count: 6,
    icon: LayoutDashboard,
    description: "Stat cards, bar/line/donut charts, data tables, dashboard.",
  },
  {
    name: "UI Primitives",
    slug: "ui",
    count: 16,
    icon: LayoutGrid,
    description: "Buttons, inputs, badges, avatars, cards, sheets, timers.",
  },
  {
    name: "Product",
    slug: "product",
    count: 7,
    icon: ShoppingBag,
    description: "Cards, galleries, size & color selectors, add-to-cart.",
  },
  {
    name: "Home",
    slug: "home",
    count: 11,
    icon: Home,
    description: "Hero banners, promos, category circles, coupons.",
  },
  {
    name: "Category",
    slug: "category",
    count: 2,
    icon: Grid3x3,
    description: "Subcategory grids and sidebar menus.",
  },
  {
    name: "Navigation",
    slug: "navigation",
    count: 3,
    icon: PanelTop,
    description: "Filter/sort bars, product headers, filter sheets.",
  },
  {
    name: "Cart",
    slug: "cart",
    count: 2,
    icon: ShoppingCart,
    description: "Cart items and remove-item sheets.",
  },
  {
    name: "Orders",
    slug: "order",
    count: 2,
    icon: Package,
    description: "Order cards and delivery timelines.",
  },
  {
    name: "Rewards",
    slug: "rewards",
    count: 3,
    icon: Gift,
    description: "Points cards, tier progress, referral codes.",
  },
  {
    name: "Chat",
    slug: "chat",
    count: 2,
    icon: MessagesSquare,
    description: "Chat bubbles and voice messages.",
  },
  {
    name: "Shared",
    slug: "shared",
    count: 4,
    icon: Layers,
    description: "Screen headers, price displays, OTP inputs.",
  },
];

export const expoTotal = expoCategories.reduce((n, c) => n + c.count, 0);
