import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";

import PricingV1 from "@/components/simple-ui/pricing/PricingV1";
import PricingV2 from "@/components/simple-ui/pricing/PricingV2";
import PricingV3 from "@/components/simple-ui/pricing/PricingV3";
import PricingV4 from "@/components/simple-ui/pricing/PricingV4";
import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("672b117ae82799cdcd533cd7");
  const h2 = await getComponentViews("672b19d7f49ededfdcdc1d18");
  const h3 = await getComponentViews("67aa0497393216fb1898b978");
  const h4 = await getComponentViews("685a29ddfdfbe61e378383b2");

  const siteHeaders = [
    {
      id: "672b117ae82799cdcd533cd7",
      title: "Simple Single Tier Pricing",
      component: PricingV1,
      downloads: h1,
      sourcePath: "pricing/PricingV1.tsx",
      githubUrl: "#",
      externalUrl: "/pages/pricing/one",
    },
    {
      id: "672b19d7f49ededfdcdc1d18",
      title: "Double tier Pricing",
      component: PricingV2,
      downloads: h2,
      sourcePath: "pricing/PricingV2.tsx",
      githubUrl: "#",
      externalUrl: "/pages/pricing/two",
    },
    {
      id: "67aa0497393216fb1898b978",
      title: "My New Pricing Component",
      component: PricingV3,
      downloads: h3,
      sourcePath: "pricing/PricingV3.tsx",
      githubUrl: "#",
      externalUrl: "/pages/pricing/three",
    },
    {
      id: "685a29ddfdfbe61e378383b2",
      title: "Pricing V4",
      component: PricingV4,
      downloads: h4,
      sourcePath: "pricing/PricingV4.tsx",
      githubUrl: "#",
      externalUrl: "/pages/pricing/four",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Pricing Sections({siteHeaders.length})
      </h1>
      <div className="space-y-12">
        {siteHeaders.map((header, index) => {
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
