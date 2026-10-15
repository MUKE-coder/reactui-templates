import React from "react";

import PerformingProductsTable from "@/components/simple-ui/data-tables/PerformingProductsTable";
import ProductsTable from "@/components/simple-ui/data-tables/ProductsTable";
import ProjectTable from "@/components/simple-ui/data-tables/ProjectTable";
import TeamProjectsTable from "@/components/simple-ui/data-tables/TeamProjectsTable";
import UserManagementTable from "@/components/simple-ui/data-tables/UserManagementTable";

export default async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  // const key = slug.split("-")[2];

  if (slug === "one") {
    return <PerformingProductsTable />;
  } else if (slug === "two") {
    return <ProductsTable />;
  } else if (slug === "three") {
    return <ProjectTable />;
  } else if (slug === "four") {
    return <TeamProjectsTable />;
  } else if (slug === "five") {
    return <UserManagementTable />;
  }

  // Default fallback
  return (
    <div>
      <PerformingProductsTable />
    </div>
  );
}
