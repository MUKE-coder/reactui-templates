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

export default async function Headers() {
  const h1 = await getComponentViews("6800fdc04f4da26adc64faf1");
  const h2 = await getComponentViews("6800fdcb4f4da26adc64faf2");
  const h3 = await getComponentViews("6800fdd24f4da26adc64faf3");
  const h4 = await getComponentViews("6800fdda4f4da26adc64faf4");
  const h5 = await getComponentViews("6800fde04f4da26adc64faf5");
  const h6 = await getComponentViews("6800fdee4f4da26adc64faf6");

  const bannerSections = [
    {
      id: "6800fdc04f4da26adc64faf1",
      title: "Category One",
      component: CategoryOne,
      downloads: h1,
      sourcePath: "store-categories/CategoryOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-categories/one",
    },
    {
      id: "6800fdcb4f4da26adc64faf2",
      title: "Category Two",
      component: CategoryTwo,
      downloads: h2,
      sourcePath: "store-categories/CategoryTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-categories/two",
    },
    {
      id: "6800fdd24f4da26adc64faf3",
      title: "Category Three",
      component: CategoryThree,
      downloads: h3,
      sourcePath: "store-categories/CategoryThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-categories/three",
    },
    {
      id: "6800fdda4f4da26adc64faf4",
      title: "Category Four",
      component: CategoryFour,
      downloads: h4,
      sourcePath: "store-categories/CategoryFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-categories/four",
    },
    {
      id: "6800db2ee7265731a6816074",
      title: "Category Five",
      component: CategoryFive,
      downloads: h1,
      sourcePath: "store-categories/CategoryFive.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-categories/five",
    },
    {
      id: "6800fdee4f4da26adc64faf6",
      title: "Category Six",
      component: CategorySix,
      downloads: h6,
      sourcePath: "store-categories/CategorySix.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-categories/six",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Store Categories ({bannerSections.length})
      </h1>
      <div className="space-y-12">
        {bannerSections.map((header, index) => {
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
