import React from "react";

import DashboardOne from "@/components/simple-ui/dashboard-pages/DashboardOne";
import DashboardTwo from "@/components/simple-ui/dashboard-pages/DashboardTwo";
import DashboardThree from "@/components/simple-ui/dashboard-pages/DashboardThree";
import InvoiceOne from "@/components/simple-ui/pages/InvoiceOne";
import InvoiceTwo from "@/components/simple-ui/pages/InvoiceTwo";
import InvoiceThree from "@/components/simple-ui/pages/InvoiceThree";
import InvoiceFour from "@/components/simple-ui/pages/InvoiceFour";

export default function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <InvoiceOne />;
  } else if (slug === "two") {
    return <InvoiceTwo />;
  } else if (slug === "three") {
    return <InvoiceThree />;
  } else if (slug === "four") {
    return <InvoiceFour />;
  }

  // Default fallback
  return (
    <div>
      <DashboardOne />
    </div>
  );
}
