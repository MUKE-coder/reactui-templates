import React from "react";

import DashboardOne from "@/components/simple-ui/dashboard-pages/DashboardOne";

import PricingV1 from "@/components/simple-ui/pricing/PricingV1";
import PricingV4 from "@/components/simple-ui/pricing/PricingV4";
import PricingV3 from "@/components/simple-ui/pricing/PricingV3";
import PricingV2 from "@/components/simple-ui/pricing/PricingV2";

export default async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <PricingV1 />;
  } else if (slug === "two") {
    return <PricingV2 />;
  } else if (slug === "three") {
    return <PricingV3 />;
  } else if (slug === "four") {
    return <PricingV4 />;
  }

  // Default fallback
  return (
    <div>
      <DashboardOne />
    </div>
  );
}
