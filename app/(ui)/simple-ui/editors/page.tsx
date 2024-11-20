import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import VEditor from "@/components/simple-ui/editors/VEditor";
import FooterV2 from "@/components/simple-ui/footers/FooterV2";
import MantineHeader from "@/components/simple-ui/nav-bars/mantine";
import SimpleHeader from "@/components/simple-ui/nav-bars/mantine-simple";
import VercelHeader from "@/components/simple-ui/nav-bars/vercel";
import PricingV1 from "@/components/simple-ui/pricing/PricingV1";
import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Editors() {
  const h1 = await getComponentViews("673dbcb61504d1c7793c3bf7");

  const siteHeaders = [
    {
      id: "673dbcb61504d1c7793c3bf7",
      title: "TipTap Modern Editor",
      component: VEditor,
      downloads: h1,
      sourcePath: "editors/VEditor.tsx",
      githubUrl: "#",
      externalUrl: "/pages/editors/tiptap",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Richtext Editors ({siteHeaders.length})
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
