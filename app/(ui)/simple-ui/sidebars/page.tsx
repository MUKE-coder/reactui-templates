import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import SidebarV1 from "@/components/simple-ui/sidebars/SidebarV1";
import SidebarV2 from "@/components/simple-ui/sidebars/SidebarV2";
import SidebarV3 from "@/components/simple-ui/sidebars/SidebarV3";
import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Sidebars() {
  const s1 = await getComponentViews("672583422c872e16e88955d1");
  const s2 = await getComponentViews("6725835a2c872e16e88955d2");
  const s3 = await getComponentViews("6725a0102c872e16e88955d3");

  const sidebars = [
    {
      id: "6725a0102c872e16e88955d3",
      title: "Fixed Modern Sidebar",
      component: SidebarV3,
      sourcePath: "sidebars/SidebarV3.tsx",
      downloads: s3,
      githubUrl: "#",
      externalUrl: "/pages/sidebars/modern-sidebar",
    },
    {
      id: "672583422c872e16e88955d1",
      title: "Simple Sidebar",
      component: SidebarV1,
      downloads: s1,
      sourcePath: "sidebars/SidebarV1.tsx",
      githubUrl: "#",
      externalUrl: "/pages/sidebars/simple-sidebar",
    },
    {
      id: "6725835a2c872e16e88955d2",
      title: "Sidebar with Menu",
      component: SidebarV2,
      sourcePath: "sidebars/SidebarV2.tsx",
      downloads: s2,
      githubUrl: "#",
      externalUrl: "/pages/sidebars/menu-sidebar",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">Sidebars({sidebars.length})</h1>
      <div className="space-y-12">
        {sidebars.map((sidebar, index) => {
          const sourceCode = extractComponentSource(sidebar.sourcePath);
          return (
            <ComponentPreview
              key={index}
              title={sidebar.title}
              component={<sidebar.component />}
              sourceCode={sourceCode}
              githubUrl={sidebar.githubUrl}
              externalUrl={sidebar.externalUrl}
              id={sidebar.id}
              downloads={sidebar.downloads}
              route="site-headers"
            />
          );
        })}
      </div>
    </div>
  );
}
