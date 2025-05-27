import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import FooterV1 from "@/components/simple-ui/footers/FooterV1";
import FooterV2 from "@/components/simple-ui/footers/FooterV2";
import FooterV3 from "@/components/simple-ui/footers/FooterV3";
import FooterV4 from "@/components/simple-ui/footers/FooterV4";
import FooterV5 from "@/components/simple-ui/footers/FooterV5";
import FooterV6 from "@/components/simple-ui/footers/FooterV6";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("672b1a27f49ededfdcdc1d19");
  const h2 = await getComponentViews("683531a52c135f8a84ee6cd3");
  const h3 = await getComponentViews("683531de2c135f8a84ee6cd4");
  const h4 = await getComponentViews("683532072c135f8a84ee6cd5");
  const h5 = await getComponentViews("6835323b2c135f8a84ee6cd6");
  const h6 = await getComponentViews("6835326c2c135f8a84ee6cd7");

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
    {
      id: "683531a52c135f8a84ee6cd3",
      title: "Ecommerce Footer One",
      component: FooterV1,
      downloads: h2,
      sourcePath: "footers/FooterV1.tsx",
      githubUrl: "#",
      externalUrl: "/pages/footers/footer-1",
    },
    {
      id: "683531de2c135f8a84ee6cd4",
      title: "Ecommerce Footer Two",
      component: FooterV3,
      downloads: h3,
      sourcePath: "footers/FooterV3.tsx",
      githubUrl: "#",
      externalUrl: "/pages/footers/footer-3",
    },
    {
      id: "683532072c135f8a84ee6cd5",
      title: "Ecommerce Footer Three",
      component: FooterV4,
      downloads: h4,
      sourcePath: "footers/FooterV4.tsx",
      githubUrl: "#",
      externalUrl: "/pages/footers/footer-4",
    },
    {
      id: "6835323b2c135f8a84ee6cd6",
      title: "Ecommerce Footer Four",
      component: FooterV5,
      downloads: h5,
      sourcePath: "footers/FooterV5.tsx",
      githubUrl: "#",
      externalUrl: "/pages/footers/footer-5",
    },
    {
      id: "6835326c2c135f8a84ee6cd7",
      title: "Ecommerce Footer Five",
      component: FooterV6,
      downloads: h6,
      sourcePath: "footers/FooterV6.tsx",
      githubUrl: "#",
      externalUrl: "/pages/footers/footer-6",
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
              route="footers"
            />
          );
        })}
      </div>
    </div>
  );
}
