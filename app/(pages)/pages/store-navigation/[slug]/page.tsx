import React from "react";

import NavBarOne from "@/components/simple-ui/store-navigation/NavBarOne";
import NavBarTwo from "@/components/simple-ui/store-navigation/NavBarTwo";
import NavBarThree from "@/components/simple-ui/store-navigation/NavBarThree";
import NavBarFive from "@/components/simple-ui/store-navigation/NavBarFive";
import NavBarFour from "@/components/simple-ui/store-navigation/NavBarFour";
import NavBarSix from "@/components/simple-ui/store-navigation/NavBarSix";

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
  } else if (slug == "six") {
    return <NavBarSix />;
  }

  // Default fallback
  return (
    <div>
      <NavBarOne />
    </div>
  );
}
