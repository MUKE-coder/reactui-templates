import React from "react";
import { columns } from "./columns";
import { Category } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import { getAllCategories } from "@/actions/categories";
import { getSiteComponents } from "@/actions/components";
import ComponentForm from "@/components/Forms/ComponentForm";

export default async function page() {
  const comps = (await getSiteComponents()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Components"
        linkTitle="Add Category"
        href="#"
        data={comps}
        model="category"
      />
      <div className="py-6">
        <ComponentForm />
      </div>
      <div className="py-8">
        <DataTable data={comps} columns={columns} />
      </div>
    </div>
  );
}
