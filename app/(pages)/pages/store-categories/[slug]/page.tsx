import React from "react";

import BannerOne from "@/components/simple-ui/store-banners/BannerOne";
import BannerTwo from "@/components/simple-ui/store-banners/BannerTwo";
import BannerThree from "@/components/simple-ui/store-banners/BannerThree";
import BannerFour from "@/components/simple-ui/store-banners/BannerFour";
import BannerFive from "@/components/simple-ui/store-banners/BannerFive";
import BannerSix from "@/components/simple-ui/store-banners/BannerSix";
import BannerSeven from "@/components/simple-ui/store-banners/BannerSeven";
import CategoryOne from "@/components/simple-ui/store-categories/CategoryOne";
import CategoryTwo from "@/components/simple-ui/store-categories/CategoryTwo";
import CategoryThree from "@/components/simple-ui/store-categories/CategoryThree";
import CategoryFour from "@/components/simple-ui/store-categories/CategoryFour";
import CategoryFive from "@/components/simple-ui/store-categories/CategoryFive";
import CategorySix from "@/components/simple-ui/store-categories/CategorySix";

export default async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <CategoryOne />;
  } else if (slug === "two") {
    return <CategoryTwo />;
  } else if (slug === "three") {
    return <CategoryThree />;
  } else if (slug === "four") {
    return <CategoryFour />;
  } else if (slug === "five") {
    return <CategoryFive />;
  } else if (slug === "six") {
    return <CategorySix />;
  }

  // Default fallback
  return (
    <div>
      <CategoryOne />
    </div>
  );
}
