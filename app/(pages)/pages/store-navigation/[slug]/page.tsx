import React from "react";
import FeatureSectionOne from "@/components/simple-ui/feature-sections/FeatureOne";
import FeatureSectionTwo from "@/components/simple-ui/feature-sections/FeatureTwo";
import FeatureSectionThree from "@/components/simple-ui/feature-sections/FeatureThree";
import FeatureSectionFour from "@/components/simple-ui/feature-sections/FeatureFour";
import FeatureSectionFive from "@/components/simple-ui/feature-sections/FeatureFive";
import FeatureSectionSix from "@/components/simple-ui/feature-sections/FeatureSix";
import FeatureSectionSeven from "@/components/simple-ui/feature-sections/FeatureSeven";
import FeatureSectionEight from "@/components/simple-ui/feature-sections/FeatureEight";
import FeatureSectionNine from "@/components/simple-ui/feature-sections/FeatureNine";
import NavBarOne from "@/components/simple-ui/store-navigation/NavBarOne";
import NavBarTwo from "@/components/simple-ui/store-navigation/NavBarTwo";
import NavBarThree from "@/components/simple-ui/store-navigation/NavBarThree";
import NavBarFive from "@/components/simple-ui/store-navigation/NavBarFive";
import NavBarFour from "@/components/simple-ui/store-navigation/NavBarFour";

export default function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <NavBarOne />;
  } else if (slug === "two") {
    return <NavBarTwo />;
  } else if (slug === "three") {
    return <NavBarThree />;
  } else if (slug === "four") {
    return <NavBarFour />;
  } else if (slug === "five") {
    return <NavBarFive />;
  }

  // Default fallback
  return (
    <div>
      <NavBarOne />
    </div>
  );
}
