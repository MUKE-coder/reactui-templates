import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import MantineHeader from "@/components/simple-ui/nav-bars/mantine";
import SimpleHeader from "@/components/simple-ui/nav-bars/mantine-simple";
import VercelHeader from "@/components/simple-ui/nav-bars/vercel";
import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("6724857795d9c2c437ee7947");
  const h2 = await getComponentViews("6724856695d9c2c437ee7946");
  const h3 = await getComponentViews("6724855295d9c2c437ee7945");
  const siteHeaders = [
    {
      id: "6724857795d9c2c437ee7947",
      title: "Simple Header without Simple Menu",
      component: SimpleHeader,
      downloads: h1,
      sourcePath: "components/simple-ui/nav-bars/mantine-simple.tsx",
      githubUrl: "#",
      externalUrl: "/pages/navbars/simple-header",
    },
    {
      id: "6724856695d9c2c437ee7946",
      title: "Mantine Header with Mega Menu",
      component: MantineHeader,
      sourcePath: "components/simple-ui/nav-bars/mantine.tsx",
      downloads: h2,
      githubUrl: "#",
      externalUrl: "/pages/navbars/mantine-header",
    },
    {
      id: "6724855295d9c2c437ee7945",
      title: "Vercel Fixed Header with Mega Menu",
      component: VercelHeader,
      downloads: h3,
      sourcePath: "components/simple-ui/nav-bars/vercel.tsx",
      githubUrl: "#",
      externalUrl: "/pages/navbars/vercel-header",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Site Headers({siteHeaders.length})
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
