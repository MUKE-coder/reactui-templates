import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import RegisterV1 from "@/components/simple-ui/auth/RegisterV1";
import FooterV2 from "@/components/simple-ui/footers/FooterV2";
import MantineHeader from "@/components/simple-ui/nav-bars/mantine";
import SimpleHeader from "@/components/simple-ui/nav-bars/mantine-simple";
import VercelHeader from "@/components/simple-ui/nav-bars/vercel";
import PricingV1 from "@/components/simple-ui/pricing/PricingV1";
import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("672c7af26df412dd93d417a5");

  const siteHeaders = [
    {
      id: "672c7af26df412dd93d417a5",
      title: "Register with Carousel",
      component: RegisterV1,
      downloads: h1,
      sourcePath: "auth/RegisterV1.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/register-with-carousel",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">Auth UI({siteHeaders.length})</h1>
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
              route="auth"
            />
          );
        })}
      </div>
    </div>
  );
}
