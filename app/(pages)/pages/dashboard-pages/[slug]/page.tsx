import React from "react";

import DashboardOne from "@/components/simple-ui/dashboard-pages/DashboardOne";
import DashboardTwo from "@/components/simple-ui/dashboard-pages/DashboardTwo";
import DashboardThree from "@/components/simple-ui/dashboard-pages/DashboardThree";

export default function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <DashboardOne />;
  } else if (slug === "two") {
    return <DashboardTwo />;
  } else if (slug === "three") {
    return <DashboardThree />;
  }

  // Default fallback
  return (
    <div>
      <DashboardOne />
    </div>
  );
}
