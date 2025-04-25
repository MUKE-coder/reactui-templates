import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";

import { extractComponentSource } from "@/lib/getComponentSource";

import NavBarOne from "@/components/simple-ui/store-navigation/NavBarOne";
import NavBarTwo from "@/components/simple-ui/store-navigation/NavBarTwo";
import NavBarThree from "@/components/simple-ui/store-navigation/NavBarThree";
import NavBarFive from "@/components/simple-ui/store-navigation/NavBarFive";
import NavBarFour from "@/components/simple-ui/store-navigation/NavBarFour";
import BannerOne from "@/components/simple-ui/store-banners/BannerOne";
import BannerTwo from "@/components/simple-ui/store-banners/BannerTwo";
import BannerThree from "@/components/simple-ui/store-banners/BannerThree";
import BannerFour from "@/components/simple-ui/store-banners/BannerFour";
import BannerFive from "@/components/simple-ui/store-banners/BannerFive";
import BannerSix from "@/components/simple-ui/store-banners/BannerSix";
import BannerSeven from "@/components/simple-ui/store-banners/BannerSeven";
import CategoryOne from "@/components/simple-ui/store-categories/CategoryOne";
import CategoryTwo from "@/components/simple-ui/store-categories/CategoryTwo";
import CategoryFour from "@/components/simple-ui/store-categories/CategoryFour";
import CategoryFive from "@/components/simple-ui/store-categories/CategoryFive";
import CategorySix from "@/components/simple-ui/store-categories/CategorySix";
import CategoryThree from "@/components/simple-ui/store-categories/CategoryThree";
import ProductOne from "@/components/simple-ui/store-products/ProductOne";
import ProductTwo from "@/components/simple-ui/store-products/ProductTwo";
import ProductThree from "@/components/simple-ui/store-products/ProductThree";
import ProductFour from "@/components/simple-ui/store-products/ProductFour";
import ProductFive from "@/components/simple-ui/store-products/ProductFive";
import ProductSix from "@/components/simple-ui/store-products/ProductSix";
import ProductSeven from "@/components/simple-ui/store-products/ProductSeven";

export default async function Headers() {
  const h1 = await getComponentViews("6801c05b5dd74c4d75d5b252");
  const h2 = await getComponentViews("6801c0635dd74c4d75d5b253");
  const h3 = await getComponentViews("6801c0695dd74c4d75d5b254");
  const h4 = await getComponentViews("6801c0705dd74c4d75d5b255");
  const h5 = await getComponentViews("6801c0765dd74c4d75d5b256");
  const h6 = await getComponentViews("6801c0805dd74c4d75d5b257");
  const h7 = await getComponentViews("6801c0875dd74c4d75d5b258");

  const productSections = [
    {
      id: "6801c05b5dd74c4d75d5b252",
      title: "Product One",
      component: ProductOne,
      downloads: h1,
      sourcePath: "store-products/ProductOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/one",
    },
    {
      id: "6801c0635dd74c4d75d5b253",
      title: "Product Two",
      component: ProductTwo,
      downloads: h2,
      sourcePath: "store-products/ProductTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/two",
    },
    {
      id: "6801c0695dd74c4d75d5b254",
      title: "Product Three",
      component: ProductThree,
      downloads: h3,
      sourcePath: "store-products/ProductThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/three",
    },
    {
      id: "6801c0705dd74c4d75d5b255",
      title: "Product Four",
      component: ProductFour,
      downloads: h4,
      sourcePath: "store-products/ProductFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/four",
    },
    {
      id: "6801c0765dd74c4d75d5b256",
      title: "Product Five",
      component: ProductFive,
      downloads: h5,
      sourcePath: "store-products/ProductFive.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/five",
    },
    {
      id: "6801c0805dd74c4d75d5b257",
      title: "Product Six",
      component: ProductSix,
      downloads: h6,
      sourcePath: "store-products/ProductSix.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/six",
    },
    {
      id: "6801c0875dd74c4d75d5b258",
      title: "Product Seven",
      component: ProductSeven,
      downloads: h7,
      sourcePath: "store-products/ProductSeven.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/seven",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Store Products ({productSections.length})
      </h1>
      <div className="space-y-12">
        {productSections.map((header, index) => {
          const sourceCode = extractComponentSource(header.sourcePath);
          return (
            <ComponentPreview
              key={index}
              title={header.title}
              component={<header.component />}
              sourceCode={sourceCode}
              githubUrl={header.githubUrl}
              externalUrl={header.externalUrl}
              id={header.id}
              downloads={header.downloads}
              route="pricing"
            />
          );
        })}
      </div>
    </div>
  );
}
