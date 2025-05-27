import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";

import { extractComponentSource } from "@/lib/getComponentSource";

import BannerOne from "@/components/simple-ui/store-banners/BannerOne";
import BannerTwo from "@/components/simple-ui/store-banners/BannerTwo";
import BannerThree from "@/components/simple-ui/store-banners/BannerThree";
import BannerFour from "@/components/simple-ui/store-banners/BannerFour";
import BannerFive from "@/components/simple-ui/store-banners/BannerFive";
import BannerSix from "@/components/simple-ui/store-banners/BannerSix";
import BannerSeven from "@/components/simple-ui/store-banners/BannerSeven";
import BannerEight from "@/components/simple-ui/store-banners/BannerEight";

export default async function Headers() {
  const h1 = await getComponentViews("6800db2ee7265731a6816074");
  const h2 = await getComponentViews("6800db36e7265731a6816075");
  const h3 = await getComponentViews("6800db3ee7265731a6816076");
  const h4 = await getComponentViews("6800db46e7265731a6816077");
  const h5 = await getComponentViews("6800db4ce7265731a6816078");
  const h6 = await getComponentViews("6800db55e7265731a6816079");
  const h7 = await getComponentViews("6800db5ce7265731a681607a");
  const h8 = await getComponentViews("68350fec0b00025651f6c3db");

  const bannerSections = [
    {
      id: "6800db2ee7265731a6816074",
      title: "Banner One",
      component: BannerOne,
      downloads: h1,
      sourcePath: "store-banners/BannerOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-banners/one",
    },
    {
      id: "6800db36e7265731a6816075",
      title: "Banner Two",
      component: BannerTwo,
      downloads: h2,
      sourcePath: "store-banners/BannerTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-banners/two",
    },
    {
      id: "6800db3ee7265731a6816076",
      title: "Banner Three",
      component: BannerThree,
      downloads: h3,
      sourcePath: "store-banners/BannerThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-banners/three",
    },
    {
      id: "6800db46e7265731a6816077",
      title: "Banner Four",
      component: BannerFour,
      downloads: h4,
      sourcePath: "store-banners/BannerFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-banners/four",
    },
    {
      id: "6800db4ce7265731a6816078",
      title: "Banner Five",
      component: BannerFive,
      downloads: h5,
      sourcePath: "store-banners/BannerFive.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-banners/five",
    },
    {
      id: "6800db55e7265731a6816079",
      title: "Banner Six",
      component: BannerSix,
      downloads: h6,
      sourcePath: "store-banners/BannerSix.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-banners/six",
    },
    {
      id: "6800db5ce7265731a681607a",
      title: "Banner Seven",
      component: BannerSeven,
      downloads: h7,
      sourcePath: "store-banners/BannerSeven.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-banners/seven",
    },
    {
      id: "68350fec0b00025651f6c3db",
      title: "Banner Eight",
      component: BannerEight,
      downloads: h8,
      sourcePath: "store-banners/BannerEight.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-banners/eight",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Store Navigations ({bannerSections.length})
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
