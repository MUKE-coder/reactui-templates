import { getAllCategories } from "@/actions/categories";
import { getFrontendTemplates } from "@/actions/templates";
import HeroSection, { CategoryProps } from "@/components/frontend/HeroSection";
import Templates from "@/components/frontend/Templates";
import HeroSectionOne from "@/components/simple-ui/hero-sections/HeroSectionOne";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { query = "all" } = searchParams;
  const categories = (await getAllCategories()) || [];
  const templates = (await getFrontendTemplates(query as string)) || [];
  // const filteredTemplates =templates.filter((tem)=>tem.)
  return (
    <main className="min-h-screen">
      {/* <HeroSection
        categories={categories}
        title="Beautifully designed website templates"
        description="100+ beautiful templates and systems built with React, TypeScript,
            Tailwind CSS, and Framer Motion. Save thousands of hours, create a
            beautiful landing page, and convert your visitors into customers."
      /> */}

      <div className="">
        <Templates templates={templates} />
        {/* <Showcase /> */}
      </div>
    </main>
  );
}
