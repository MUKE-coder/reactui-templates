import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import DashboardOne from "@/components/simple-ui/dashboard-pages/DashboardOne";
import DashboardThree from "@/components/simple-ui/dashboard-pages/DashboardThree";
import DashboardTwo from "@/components/simple-ui/dashboard-pages/DashboardTwo";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("680b7f1c5502a95f7a680f9d");
  const h2 = await getComponentViews("680b88af2bb5d8addf8677fd");
  const h3 = await getComponentViews("6823f93e1ab65b5ca345c841");

  const dashboardPages = [
    {
      id: "680b7f1c5502a95f7a680f9d",
      title: "Dashboard Overview",
      component: DashboardOne,
      downloads: h1,
      sourcePath: "dashboard-pages/DashboardOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/dashboard-pages/one",
    },
    {
      id: "680b88af2bb5d8addf8677fd",
      title: "Product Data Table",
      component: DashboardTwo,
      downloads: h2,
      sourcePath: "dashboard-pages/DashboardTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/dashboard-pages/two",
    },
    {
      id: "6823f93e1ab65b5ca345c841",
      title: "LMS Dashboard Overview",
      component: DashboardThree,
      downloads: h3,
      sourcePath: "dashboard-pages/DashboardThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/dashboard-pages/three",
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
