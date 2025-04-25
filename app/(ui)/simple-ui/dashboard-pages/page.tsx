import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import DashboardOne from "@/components/simple-ui/dashboard-pages/DashboardOne";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("680b7f1c5502a95f7a680f9d");

  const dashboardPages = [
    {
      id: "680b7f1c5502a95f7a680f9d",
      title: "Dashboard Overview",
      component: DashboardOne,
      downloads: h1,
      sourcePath: "dashboard-pages/DashboardOne.tsx",
      githubUrl: "#",
      externalUrl: "#",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Pages({dashboardPages.length})
      </h1>
      <div className="space-y-12">
        {dashboardPages.map((header, index) => {
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
