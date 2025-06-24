import HeroSectionOne from "@/components/simple-ui/hero-sections/HeroSectionOne";
import HeroSectionTwo from "@/components/simple-ui/hero-sections/HeroSectionTwo";
import HeroSectionThree from "@/components/simple-ui/hero-sections/HeroSectionThree";
import HeroSectionFour from "@/components/simple-ui/hero-sections/HeroSectionFour";
import HeroSectionFive from "@/components/simple-ui/hero-sections/HeroSectionFive";
import HeroSectionSix from "@/components/simple-ui/hero-sections/HeroSectionSix";
import HeroSectionSeven from "@/components/simple-ui/hero-sections/HeroSectionSeven";
import HeroSectionEight from "@/components/simple-ui/hero-sections/HeroSectionEight";
import HeroSectionNine from "@/components/simple-ui/hero-sections/HeroSectionNine";
import HeroSectionTen from "@/components/simple-ui/hero-sections/HeroSectionTen";
import HeroSectionEleven from "@/components/simple-ui/hero-sections/HeroSectionEleven";
import HeroSectionTwelve from "@/components/simple-ui/hero-sections/HeroSectionTwelve";
import HeroSectionThirteen from "@/components/simple-ui/hero-sections/HeroSectionThirteen";
import React from "react";
import HeroSectionFourteen from "@/components/simple-ui/hero-sections/HeroSectionFourteen";
import HeroSectionFifteen from "@/components/simple-ui/hero-sections/HeroSectionFifteen";
import HeroSectionSixteen from "@/components/simple-ui/hero-sections/HeroSectionSixteen";

export default function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const key = slug.split("-")[2];

  if (key === "one") {
    return <HeroSectionOne />;
  } else if (key === "two") {
    return <HeroSectionTwo />;
  } else if (key === "three") {
    return <HeroSectionThree />;
  } else if (key === "four") {
    return <HeroSectionFour />;
  } else if (key === "five") {
    return <HeroSectionFive />;
  } else if (key === "six") {
    return <HeroSectionSix />;
  } else if (key === "seven") {
    return <HeroSectionSeven />;
  } else if (key === "eight") {
    return <HeroSectionEight />;
  } else if (key === "nine") {
    return <HeroSectionNine />;
  } else if (key === "ten") {
    return <HeroSectionTen />;
  } else if (key === "eleven") {
    return <HeroSectionEleven />;
  } else if (key === "twelve") {
    return <HeroSectionTwelve />;
  } else if (key === "thirteen") {
    return <HeroSectionThirteen />;
  } else if (key === "fourteen") {
    return <HeroSectionFourteen />;
  } else if (key === "fifteen") {
    return <HeroSectionFifteen />;
  } else if (key === "sixteen") {
    return <HeroSectionSixteen />;
  }

  // Default fallback
  return (
    <div>
      <HeroSectionOne />
    </div>
  );
}
