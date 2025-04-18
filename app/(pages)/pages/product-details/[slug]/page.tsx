import React from "react";
import ProductOne from "@/components/simple-ui/store-products/ProductOne";
import ProductTwo from "@/components/simple-ui/store-products/ProductTwo";
import ProductThree from "@/components/simple-ui/store-products/ProductThree";
import ProductFour from "@/components/simple-ui/store-products/ProductFour";
import ProductFive from "@/components/simple-ui/store-products/ProductFive";
import ProductSix from "@/components/simple-ui/store-products/ProductSix";
import ProductSeven from "@/components/simple-ui/store-products/ProductSeven";
import ProductDetailOne from "@/components/simple-ui/product-details/ProductDetailOne";
import ProductDetailTwo from "@/components/simple-ui/product-details/ProductDetailTwo";
import ProductDetailThree from "@/components/simple-ui/product-details/ProductDetailThree";
import ProductDetailFour from "@/components/simple-ui/product-details/ProductDetailFour";
import ProductDetailFive from "@/components/simple-ui/product-details/ProductDetailFive";
import ProductDetailSix from "@/components/simple-ui/product-details/ProductDetailSix";
import ProductDetailSeven from "@/components/simple-ui/product-details/ProductDetailSeven";
import ProductDetailEight from "@/components/simple-ui/product-details/ProductDetailEight";

export default function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <ProductDetailOne />;
  } else if (slug === "two") {
    return <ProductDetailTwo />;
  } else if (slug === "three") {
    return <ProductDetailThree />;
  } else if (slug === "four") {
    return <ProductDetailFour />;
  } else if (slug === "five") {
    return <ProductDetailFive />;
  } else if (slug === "six") {
    return <ProductDetailSix />;
  } else if (slug === "seven") {
    return <ProductDetailSeven />;
  } else if (slug === "eight") {
    return <ProductDetailEight />;
  }

  // Default fallback
  return (
    <div>
      <ProductDetailOne />
    </div>
  );
}
