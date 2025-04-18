import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";

import { extractComponentSource } from "@/lib/getComponentSource";

import ProductDetailOne from "@/components/simple-ui/product-details/ProductDetailOne";
import ProductDetailTwo from "@/components/simple-ui/product-details/ProductDetailTwo";
import ProductDetailThree from "@/components/simple-ui/product-details/ProductDetailThree";
import ProductDetailFour from "@/components/simple-ui/product-details/ProductDetailFour";
import ProductDetailFive from "@/components/simple-ui/product-details/ProductDetailFive";
import ProductDetailSix from "@/components/simple-ui/product-details/ProductDetailSix";
import ProductDetailSeven from "@/components/simple-ui/product-details/ProductDetailSeven";
import ProductDetailEight from "@/components/simple-ui/product-details/ProductDetailEight";

export default async function Headers() {
  const h1 = await getComponentViews("6801ee231cc2d5e3f74118e2");
  const h2 = await getComponentViews("6801ee351cc2d5e3f74118e3");
  const h3 = await getComponentViews("6801ee3c1cc2d5e3f74118e4");
  const h4 = await getComponentViews("6801ee5a1cc2d5e3f74118e5");
  const h5 = await getComponentViews("6801ee611cc2d5e3f74118e6");
  const h6 = await getComponentViews("6801ee681cc2d5e3f74118e7");
  const h7 = await getComponentViews("6801ee741cc2d5e3f74118e8");
  const h8 = await getComponentViews("6801ee821cc2d5e3f74118e9");

  const productSections = [
    {
      id: "6801ee231cc2d5e3f74118e2",
      title: "Product Detail One",
      component: ProductDetailOne,
      downloads: h1,
      sourcePath: "product-details/ProductDetailOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/product-details/one",
    },
    {
      id: "6801ee351cc2d5e3f74118e3",
      title: "Product Detail Two",
      component: ProductDetailTwo,
      downloads: h2,
      sourcePath: "product-details/ProductDetailTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/product-details/two",
    },
    {
      id: "6801ee3c1cc2d5e3f74118e4",
      title: "Product Detail Three",
      component: ProductDetailThree,
      downloads: h3,
      sourcePath: "product-details/ProductDetailThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/product-details/three",
    },
    {
      id: "6801ee5a1cc2d5e3f74118e5",
      title: "Product Detail Four",
      component: ProductDetailFour,
      downloads: h4,
      sourcePath: "product-details/ProductDetailFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/product-details/four",
    },
    {
      id: "6801ee611cc2d5e3f74118e6",
      title: "Product Detail Five",
      component: ProductDetailFive,
      downloads: h5,
      sourcePath: "product-details/ProductDetailFive.tsx",
      githubUrl: "#",
      externalUrl: "/pages/product-details/five",
    },
    {
      id: "6801ee681cc2d5e3f74118e7",
      title: "Product Detail Six",
      component: ProductDetailSix,
      downloads: h6,
      sourcePath: "product-details/ProductDetailSix.tsx",
      githubUrl: "#",
      externalUrl: "/pages/product-details/six",
    },
    {
      id: "6801ee741cc2d5e3f74118e8",
      title: "Product Detail Seven",
      component: ProductDetailSeven,
      downloads: h7,
      sourcePath: "product-details/ProductDetailSeven.tsx",
      githubUrl: "#",
      externalUrl: "/pages/product-details/seven",
    },
    {
      id: "6801ee821cc2d5e3f74118e9",
      title: "Product Detail Eight",
      component: ProductDetailEight,
      downloads: h8,
      sourcePath: "product-details/ProductDetailEight.tsx",
      githubUrl: "#",
      externalUrl: "/pages/product-details/eight",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Product Detail Pages ({productSections.length})
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
