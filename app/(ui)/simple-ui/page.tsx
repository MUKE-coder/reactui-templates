import * as React from "react";
import Link from "next/link";
import {
  Navigation,
  Sidebar,
  LayoutGrid,
  MonitorPlay,
  UserCheck2,
  EditIcon,
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
        name: "Sidebars",
        count: 5,
        icon: Sidebar,
        href: "/simple-ui/sidebars",
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
];

export default function SimpleUI() {
  const releases = [
    { name: "Category List - 6", url: "/simple-ui/store-categories" },
    { name: "Product Lists -7", url: "/simple-ui/store-products" },
    { name: "Product detail 8", url: "/simple-ui/product-details" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto container py-10">
        <h1 className="text-3xl font-bold mb-8">Component Gallery</h1>
        <AnnouncementBanner
          weeklyReleases={releases}
          weekNumber={16}
          releaseDate="April 18, 2025"
        />
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.name} className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">{category.name}</h2>
                <span className="text-sm text-muted-foreground">
                  {category.items.length} components
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative overflow-hidden rounded-lg border bg-card transition-colors "
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-muted flex items-center justify-center">
                      <item.icon className="w-12 h-12 text-primary transition-transform group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {item.count} variants
                        </span>
                      </div>
                    </div>
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
