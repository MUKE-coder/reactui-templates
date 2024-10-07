import HeroSection from "@/components/frontend/HeroSection";
import Templates from "@/components/frontend/Templates";
import React from "react";
// import { templateCategories } from "../../page";
import { getAllCategories } from "@/actions/categories";
import { getCategoryTemplatesBySlug } from "@/actions/templates";
import { notFound } from "next/navigation";
import TemplateComingSoon from "@/components/TemplateCommingSoon";

export default async function page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = await getCategoryTemplatesBySlug(slug);
  if (!category) {
    return notFound();
  }
  const categories = (await getAllCategories()) || [];
  const categoryTemplates = category.templates;

  return (
    <div>
      {categoryTemplates.length > 0 ? (
        <>
          <HeroSection
            slug={slug}
            categories={categories}
            title={`Responsive ${slug} Website Templates`}
            description={category.description ?? ""}
          />
          <Templates templates={categoryTemplates} />
        </>
      ) : (
        <div className="py-16 my-16">
          <TemplateComingSoon category={`${slug} category`} />
        </div>
      )}
    </div>
  );
}
