import FeaturesV1 from "@/components/pages/FeaturesV1";
import FeaturesV2 from "@/components/pages/FeaturesV2";
import FeatureSectionFive from "@/components/simple-ui/feature-sections/FeatureFive";
import FeatureSectionFour from "@/components/simple-ui/feature-sections/FeatureFour";
import FeatureSectionOne from "@/components/simple-ui/feature-sections/FeatureOne";
import FeatureSectionSeven from "@/components/simple-ui/feature-sections/FeatureSeven";
import FeatureSectionSix from "@/components/simple-ui/feature-sections/FeatureSix";
import FeatureSectionThree from "@/components/simple-ui/feature-sections/FeatureThree";
import FeatureSectionTwo from "@/components/simple-ui/feature-sections/FeatureTwo";
import React from "react";

export default function page() {
  return (
    <div>
      <FeaturesV1 />
      <FeaturesV2 />
      <FeatureSectionOne />
      <FeatureSectionTwo />
      <FeatureSectionThree />
      <FeatureSectionFour />
      <FeatureSectionFive />
      <FeatureSectionSix />
      <FeatureSectionSeven />
    </div>
  );
}
