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
import ProductEight from "@/components/simple-ui/store-products/ProductEight";
import ProductNine from "@/components/simple-ui/store-products/ProductNine";
import ProductTen from "@/components/simple-ui/store-products/ProductTen";
import ProductEleven from "@/components/simple-ui/store-products/ProductEleven";
import FormOne from "@/components/simple-ui/forms/FormOne";
import FormTwo from "@/components/simple-ui/forms/FormTwo";
import FormThree from "@/components/simple-ui/forms/FormThree";
import FormFour from "@/components/simple-ui/forms/FormFour";

export default async function Headers() {
  const h1 = await getComponentViews("683d889503d5cfd772b04d04");
  const h2 = await getComponentViews("683d88d003d5cfd772b04d05");
  const h3 = await getComponentViews("683d890003d5cfd772b04d06");
  const h4 = await getComponentViews("683d892b03d5cfd772b04d07");

  const formSections = [
    {
      id: "683d889503d5cfd772b04d04",
      title: "Form One with Zod",
      component: FormOne,
      downloads: h1,
      sourcePath: "forms/FormOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/forms/one",
    },
    {
      id: "683d88d003d5cfd772b04d05",
      title: "Form Two",
      component: FormTwo,
      downloads: h2,
      sourcePath: "forms/FormTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/two",
    },
    {
      id: "683d890003d5cfd772b04d06",
      title: "Form Three with Zod",
      component: FormThree,
      downloads: h3,
      sourcePath: "forms/FormThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/three",
    },
    {
      id: "683d892b03d5cfd772b04d07",
      title: "Form Four without Zod",
      component: FormFour,
      downloads: h4,
      sourcePath: "forms/FormFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-products/four",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">Forms({formSections.length})</h1>
      <div className="space-y-12">
        {formSections.map((header, index) => {
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
