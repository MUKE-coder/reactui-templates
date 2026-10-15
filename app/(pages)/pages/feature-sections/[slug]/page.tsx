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

export default async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <FeatureSectionOne />;
  } else if (slug === "two") {
    return <FeatureSectionTwo />;
  } else if (slug === "three") {
    return <FeatureSectionThree />;
  } else if (slug === "four") {
    return <FeatureSectionFour />;
  } else if (slug === "five") {
    return <FeatureSectionFive />;
  } else if (slug === "six") {
    return <FeatureSectionSix />;
  } else if (slug === "seven") {
    return <FeatureSectionSeven />;
  } else if (slug === "eight") {
    return <FeatureSectionEight />;
  } else if (slug === "nine") {
    return <FeatureSectionNine />;
  }

  // Default fallback
  return (
    <div>
      <FeatureSectionOne />
    </div>
  );
}
