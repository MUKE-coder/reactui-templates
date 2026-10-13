import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";

import { extractComponentSource } from "@/lib/getComponentSource";

import PerformingProductsTable from "@/components/simple-ui/data-tables/PerformingProductsTable";
import ProductsTable from "@/components/simple-ui/data-tables/ProductsTable";
import ProjectTable from "@/components/simple-ui/data-tables/ProjectTable";
import TeamProjectsTable from "@/components/simple-ui/data-tables/TeamProjectsTable";
import UserManagementTable from "@/components/simple-ui/data-tables/UserManagementTable";

export default async function Tables() {
  const h1 = await getComponentViews("6801c05b5dd74c4d75d5b252");
  const h2 = await getComponentViews("6801c0635dd74c4d75d5b253");
  const h3 = await getComponentViews("6801c0695dd74c4d75d5b254");
  const h4 = await getComponentViews("6801c0705dd74c4d75d5b255");
  const h5 = await getComponentViews("6801c0765dd74c4d75d5b256");
  const h6 = await getComponentViews("6801c0805dd74c4d75d5b257");

  const productSections = [
    {
      id: "6801c05b5dd74c4d75d5b252",
      title: "Performing Product Table",
      component: PerformingProductsTable,
      downloads: h1,
      sourcePath: "data-tables/PerformingProductsTable.tsx",
      githubUrl: "#",
      externalUrl: "/pages/tables/one",
    },
    {
      id: "6801c05b5dd74c4d75d5b252",
      title: "Products Table",
      component: ProductsTable,
      downloads: h2,
      sourcePath: "data-tables/ProductsTable.tsx",
      githubUrl: "#",
      externalUrl: "/pages/tables/one",
    },
    {
      id: "6801c05b5dd74c4d75d5b252",
      title: "Projects Table",
      component: ProjectTable,
      downloads: h3,
      sourcePath: "data-tables/ProjectTable.tsx",
      githubUrl: "#",
      externalUrl: "/pages/tables/one",
    },
    {
      id: "6801c05b5dd74c4d75d5b252",
      title: "Team Projects Table",
      component: TeamProjectsTable,
      downloads: h4,
      sourcePath: "data-tables/TeamProjectsTable.tsx",
      githubUrl: "#",
      externalUrl: "/pages/tables/one",
    },
    {
      id: "6801c05b5dd74c4d75d5b252",
      title: "User Management Table",
      component: UserManagementTable,
      downloads: h5,
      sourcePath: "data-tables/UserManagementTable.tsx",
      githubUrl: "#",
      externalUrl: "/pages/tables/one",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Store Products ({productSections.length})
      </h1>
      <div className="space-y-12">
        {productSections.map((header, index) => {
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
