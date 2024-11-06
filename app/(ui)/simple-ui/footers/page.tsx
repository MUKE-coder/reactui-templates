import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import FooterV2 from "@/components/simple-ui/footers/FooterV2";
import MantineHeader from "@/components/simple-ui/nav-bars/mantine";
import SimpleHeader from "@/components/simple-ui/nav-bars/mantine-simple";
import VercelHeader from "@/components/simple-ui/nav-bars/vercel";
import PricingV1 from "@/components/simple-ui/pricing/PricingV1";
import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("672b1a27f49ededfdcdc1d19");

  const siteHeaders = [
    {
      id: "672b1a27f49ededfdcdc1d19",
      title: "Page Done Footer",
      component: FooterV2,
      downloads: h1,
      sourcePath: "footers/FooterV2.tsx",
      githubUrl: "#",
      externalUrl: "/pages/footers/page-done-footer",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Site Footers({siteHeaders.length})
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
              route="site-headers"
            />
          );
        })}
      </div>
    </div>
  );
}
