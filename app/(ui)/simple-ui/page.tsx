import * as React from "react";
import Link from "next/link";
import {
  Navigation,
  Sidebar,
  LayoutGrid,
  MonitorPlay,
  UserCheck2,
  EditIcon,
  Image,
  FileText,
  ArrowRight,
} from "lucide-react";
import HeroSectionOne from "@/components/simple-ui/hero-sections/HeroSectionOne";
import AnnouncementBanner from "@/components/Announcement";

// Example data structure
const categories = [
  {
    name: "Marketing",
    items: [
      {
        name: "Hero Sections",
        count: 13,
        icon: Navigation,
        href: "/simple-ui/hero-sections",
      },
      {
        name: "Feature Sections",
        count: 9,
        icon: Sidebar,
        href: "/simple-ui/feature-sections",
      },
      {
        name: "CTAs",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/ctas",
      },
      {
        name: "Bento Grids",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/bento-grids",
      },
      {
        name: "Pricing Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/pricing-sections",
      },
      {
        name: "Header Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/header-sections",
      },
      {
        name: "Newsletter Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/newsletter-sections",
      },
      {
        name: "Stats Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/stats-sections",
      },
      {
        name: "Testimonials Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/testimonial-sections",
      },
      {
        name: "Blog Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/blog-sections",
      },
      {
        name: "Contact Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/contact-sections",
      },
      {
        name: "Teams Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/teams-sections",
      },
      {
        name: "Content Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/content-sections",
      },
      {
        name: "Logo Cloud",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/logo-cloud",
      },
      {
        name: "FAQS",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/faqs",
      },
      {
        name: "Footers",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/footers",
      },
      {
        name: "Mega Menus",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/mega-menus",
      },
      {
        name: "Banners",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/banners",
      },
      {
        name: "404 Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/empty-pages",
      },
      {
        name: "Landing Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/landing-pages",
      },
      {
        name: "Pricing Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/pricing-pages",
      },
      {
        name: "About Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/about-pages",
      },
    ],
  },
  {
    name: "Application UI",
    items: [
      {
        name: "Dashboard Pages",
        count: 3,
        icon: Sidebar,
        href: "/simple-ui/dashboard-pages",
      },
      {
        name: "Sidebars",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/sidebars",
      },
      {
        name: "Image Uploads",
        count: 1,
        icon: Image,
        href: "/simple-ui/image-uploads",
      },
      {
        name: "Page Headings",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/page-headings",
      },
      {
        name: "Navbars",
        count: 3,
        icon: Navigation,
        href: "/simple-ui/site-headers",
      },

      {
        name: "Carousels",
        count: 5,
        icon: MonitorPlay,
        href: "/simple-ui/carousels",
      },

      {
        name: "Pricing Sections",
        count: 2,
        icon: LayoutGrid,
        href: "/simple-ui/pricing",
      },
      {
        name: "Footers",
        count: 1,
        icon: LayoutGrid,
        href: "/simple-ui/footers",
      },
      {
        name: "Auth UI",
        count: 1,
        icon: UserCheck2,
        href: "/simple-ui/auth",
      },
      {
        name: "Forms",
        count: 4,
        icon: FileText,
        href: "/simple-ui/forms",
      },
      {
        name: "Rich Text Editors",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/editors",
      },
      {
        name: "Calendars",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/calendars",
      },
      {
        name: "Tables",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/calendars",
      },
      {
        name: "Forms",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/forms",
      },
      {
        name: "Form Inputs",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/form-inputs",
      },
      {
        name: "Empty States",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/empty-states",
      },
      {
        name: "Navigation Tabs",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/nav-tabs",
      },
      {
        name: "Home Screens",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/home-screens",
      },
      {
        name: "Detail Screens",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/detail-screens",
      },
      {
        name: "Settings Screens",
        count: 1,
        icon: EditIcon,
        href: "/simple-ui/settings-screens",
      },
    ],
  },
  {
    name: "Ecommerce",
    items: [
      {
        name: "Store Navigation",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/store-navigation",
      },
      {
        name: "Store Banners",
        count: 6,
        icon: Sidebar,
        href: "/simple-ui/store-banners",
      },
      {
        name: "Store Categories",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/store-categories",
      },
      {
        name: "Store Products",
        count: 5,
        icon: Navigation,
        href: "/simple-ui/store-products",
      },
      {
        name: "Product Detail Pages",
        count: 7,
        icon: Sidebar,
        href: "/simple-ui/product-details",
      },

      {
        name: "Shopping Carts",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/shopping-carts",
      },
      {
        name: "Category Filters",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/category Filters",
      },
      {
        name: "Product Quick Views",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/product-quckviews",
      },
      {
        name: "Product Features",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/product-features",
      },

      {
        name: "Promo Sections",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/promo-sections",
      },
      {
        name: "Checkout forms",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/checkout-forms",
      },
      {
        name: "Reviews",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/reviews",
      },
      {
        name: "Order Summaries",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/order-summaries",
      },
      {
        name: "Order History",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/order-history",
      },
      {
        name: "Incentives",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/incentives",
      },
      {
        name: "Store front Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/store-front-pages",
      },
      {
        name: "Product Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/product-pages",
      },
      {
        name: "Category Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/category-pages",
      },
      {
        name: "Shopping Cart Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/shopping-cart-pages",
      },
      {
        name: "Checkout Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/checkout-pages",
      },
      {
        name: "Order detail Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/order-detail-pages",
      },
      {
        name: "Order history Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/order-history-pages",
      },
    ],
  },
  {
    name: "Complete Pages",
    items: [
      {
        name: "Invoice Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/complete-pages",
      },
      {
        name: "AI Pages",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/ai-pages",
      },
    ],
  },
  {
    name: "Projects",
    items: [
      {
        name: "Momo Market",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/momo-market",
      },
    ],
  },
];

export default function SimpleUI() {
  const releases = [
    { name: "Category List - 6", url: "/simple-ui/store-categories" },
    { name: "Product Lists -7", url: "/simple-ui/store-products" },
    { name: "Product detail 8", url: "/simple-ui/product-details" },
  ];
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          <LayoutGrid className="h-3.5 w-3.5" /> React · Tailwind · shadcn/ui
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">Simple UI</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Copy-paste web components and sections built with React, TypeScript,
          Tailwind CSS and shadcn/ui.
        </p>

        <div className="mt-12 space-y-12">
          {categories.map((category) => (
            <section key={category.name}>
              <div className="mb-4 flex items-baseline gap-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  {category.name}
                </h2>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {category.items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-muted/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground">
                      <item.icon className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium">
                        {item.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {item.count} variants
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
