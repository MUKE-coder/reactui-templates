import { getAllCategories } from "@/actions/categories";
import { getFrontendTemplates } from "@/actions/templates";
import HeroSection, { CategoryProps } from "@/components/frontend/HeroSection";
import Templates from "@/components/frontend/Templates";
// export const templateCategories: CategoryProps[] = [
//   {
//     title: "All",
//     slug: "all",
//     description: "Browse all available templates.",
//   },
//   {
//     title: "3D",
//     slug: "3d",
//     description: "Templates designed for 3D modeling and rendering projects.",
//   },
//   {
//     title: "Agency",
//     slug: "agency",
//     description:
//       "Templates tailored for digital agencies and creative studios.",
//   },
//   {
//     title: "AI",
//     slug: "ai",
//     description: "Artificial Intelligence-driven website and app templates.",
//   },
//   {
//     title: "Animated",
//     slug: "animated",
//     description: "Templates with dynamic animations and visual effects.",
//   },
//   {
//     title: "App",
//     slug: "app",
//     description: "Templates for mobile or web applications.",
//   },
//   {
//     title: "Blog",
//     slug: "blog",
//     description: "Minimal and clean templates for blogs and news sites.",
//   },
//   {
//     title: "Brand Guidelines",
//     slug: "brand-guidelines",
//     description: "Templates to present or design brand guidelines.",
//   },
//   {
//     title: "Business",
//     slug: "business",
//     description: "Templates designed for corporate and business websites.",
//   },
//   {
//     title: "Changelog",
//     slug: "changelog",
//     description: "Templates for tracking product updates and changelogs.",
//   },
//   {
//     title: "Documentation",
//     slug: "documentation",
//     description: "Templates for technical documentation and user guides.",
//   },
//   {
//     title: "Ecommerce",
//     slug: "ecommerce",
//     description: "Online store templates for selling products or services.",
//   },
//   {
//     title: "Education",
//     slug: "education",
//     description: "Templates for educational institutions or online courses.",
//   },
//   {
//     title: "Entertainment",
//     slug: "entertainment",
//     description: "Templates for entertainment, media, or event websites.",
//   },
//   {
//     title: "Food",
//     slug: "food",
//     description: "Templates designed for restaurants and food businesses.",
//   },
//   {
//     title: "Free",
//     slug: "free",
//     description: "Free to use templates for various use cases.",
//   },
//   {
//     title: "Health",
//     slug: "health",
//     description: "Templates for healthcare and wellness businesses.",
//   },
//   {
//     title: "Landing Page",
//     slug: "landing-page",
//     description: "Templates optimized for product or service landing pages.",
//   },
//   {
//     title: "Membership",
//     slug: "membership",
//     description: "Templates for membership or subscription services.",
//   },
//   {
//     title: "Minimal",
//     slug: "minimal",
//     description: "Clean, minimal templates for modern websites.",
//   },
//   {
//     title: "Modern",
//     slug: "modern",
//     description: "Stylish, contemporary templates for various uses.",
//   },
//   {
//     title: "New",
//     slug: "new",
//     description: "Recently added templates across various categories.",
//   },
//   {
//     title: "News",
//     slug: "news",
//     description: "Templates for news or media websites.",
//   },
//   {
//     title: "Personal",
//     slug: "personal",
//     description: "Personal portfolio or blog templates.",
//   },
//   {
//     title: "Photography",
//     slug: "photography",
//     description: "Templates designed for photographers and visual artists.",
//   },
//   {
//     title: "Podcast",
//     slug: "podcast",
//     description: "Templates for podcast hosting and streaming.",
//   },
//   {
//     title: "Portfolio",
//     slug: "portfolio",
//     description:
//       "Templates for showcasing personal or professional portfolios.",
//   },
//   {
//     title: "Real Estate",
//     slug: "real-estate",
//     description: "Templates for real estate agents or property listings.",
//   },
//   {
//     title: "Restaurant",
//     slug: "restaurant",
//     description:
//       "Templates for restaurants, cafes, and food delivery services.",
//   },
//   {
//     title: "Resume",
//     slug: "resume",
//     description: "Templates for online resumes or CVs.",
//   },
//   {
//     title: "SaaS",
//     slug: "saas",
//     description:
//       "Templates designed for Software as a Service (SaaS) platforms.",
//   },
//   {
//     title: "Sidebar",
//     slug: "sidebar",
//     description: "Templates featuring sidebar navigation and layouts.",
//   },
//   {
//     title: "Splash",
//     slug: "splash",
//     description: "Single-page templates used as splash or welcome pages.",
//   },
//   {
//     title: "Startup",
//     slug: "startup",
//     description: "Templates for startups to showcase products and services.",
//   },
//   {
//     title: "Tech",
//     slug: "tech",
//     description: "Templates for technology and IT service companies.",
//   },
//   {
//     title: "Web3",
//     slug: "web3",
//     description:
//       "Templates designed for Web3, blockchain, and crypto projects.",
//   },
// ];
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { query = "all" } = searchParams;
  const categories = (await getAllCategories()) || [];
  const templates = (await getFrontendTemplates(query as string)) || [];
  return (
    <main className="min-h-screen">
      <HeroSection
        categories={categories}
        title="Beautifully designed website templates"
        description="100+ beautiful templates and systems built with React, TypeScript,
            Tailwind CSS, and Framer Motion. Save thousands of hours, create a
            beautiful landing page, and convert your visitors into customers."
      />

      <div className="">
        <Templates templates={templates} />
        {/* <Showcase /> */}
      </div>
    </main>
  );
}
