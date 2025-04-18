import React from "react";
import ProductOne from "@/components/simple-ui/store-products/ProductOne";
import ProductTwo from "@/components/simple-ui/store-products/ProductTwo";
import ProductThree from "@/components/simple-ui/store-products/ProductThree";
import ProductFour from "@/components/simple-ui/store-products/ProductFour";
import ProductFive from "@/components/simple-ui/store-products/ProductFive";
import ProductSix from "@/components/simple-ui/store-products/ProductSix";
import ProductSeven from "@/components/simple-ui/store-products/ProductSeven";

export default function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <ProductOne />;
  } else if (slug === "two") {
    return <ProductTwo />;
  } else if (slug === "three") {
    return <ProductThree />;
  } else if (slug === "four") {
    return <ProductFour />;
  } else if (slug === "five") {
    return <ProductFive />;
  } else if (slug === "six") {
    return <ProductSix />;
  } else if (slug === "seven") {
    return <ProductSeven />;
  }

  // Default fallback
  return (
    <div>
      <ProductOne />
    </div>
  );
}
