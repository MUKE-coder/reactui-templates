import React from "react";

import DashboardOne from "@/components/simple-ui/dashboard-pages/DashboardOne";

import InvoiceThree from "@/components/simple-ui/pages/InvoiceThree";
import InvoiceFour from "@/components/simple-ui/pages/InvoiceFour";

import ChatPageTwo from "@/components/simple-ui/ai/ChatPageTwo";
import MomoNavbar from "@/components/simple-ui/momo-market/MomoNavbar";
import MomoBannerCarousel from "@/components/simple-ui/momo-market/MomoBannerCarousel";
import MomoProductListing from "@/components/simple-ui/momo-market/MomoProductListing";
import MomoProductDetail from "@/components/simple-ui/momo-market/MomoProductDetail";
import MomoFooter from "@/components/simple-ui/momo-market/MomoFooter";
import MomoCartItems from "@/components/simple-ui/momo-market/MomoCartItems";

export default function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <MomoNavbar />;
  } else if (slug === "two") {
    return <MomoBannerCarousel />;
  } else if (slug === "three") {
    return <MomoProductListing />;
  } else if (slug === "four") {
    return <MomoFooter />;
  } else if (slug === "five") {
    return <MomoProductDetail />;
  } else if (slug === "six") {
    return <MomoCartItems />;
  }

  // Default fallback
  return (
    <div>
      <DashboardOne />
    </div>
  );
}
