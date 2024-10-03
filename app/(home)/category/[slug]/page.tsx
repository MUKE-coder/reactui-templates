import HeroSection from "@/components/frontend/HeroSection";
import Templates from "@/components/frontend/Templates";
import React from "react";
import { templateCategories } from "../../page";

export default function page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <HeroSection
        slug={slug}
        categories={templateCategories}
        title={`Responsive ${slug} Website Templates`}
        description="100+ beautiful templates and systems built with React, TypeScript,
            Tailwind CSS, and Framer Motion. Save thousands of hours, create a
            beautiful landing page, and convert your visitors into customers."
      />
      <div className="">
        <Templates />
        {/* <Showcase /> */}
      </div>
    </div>
  );
}
