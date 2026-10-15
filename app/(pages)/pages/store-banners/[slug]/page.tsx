import React from "react";

import BannerOne from "@/components/simple-ui/store-banners/BannerOne";
import BannerTwo from "@/components/simple-ui/store-banners/BannerTwo";
import BannerThree from "@/components/simple-ui/store-banners/BannerThree";
import BannerFour from "@/components/simple-ui/store-banners/BannerFour";
import BannerFive from "@/components/simple-ui/store-banners/BannerFive";
import BannerSix from "@/components/simple-ui/store-banners/BannerSix";
import BannerSeven from "@/components/simple-ui/store-banners/BannerSeven";

export default async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <BannerOne />;
  } else if (slug === "two") {
    return <BannerTwo />;
  } else if (slug === "three") {
    return <BannerThree />;
  } else if (slug === "four") {
    return <BannerFour />;
  } else if (slug === "five") {
    return <BannerFive />;
  } else if (slug === "six") {
    return <BannerSix />;
  } else if (slug === "seven") {
    return <BannerSeven />;
  }

  // Default fallback
  return (
    <div>
      <BannerOne />
    </div>
  );
}
