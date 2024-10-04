import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import { getAllTemplates } from "@/actions/templates";
import NoProduct from "@/components/dashboard/NoProductDisplay";

export default async function page() {
  const templates = (await getAllTemplates()) || [];
  return (
    <>
      {templates.length > 0 ? (
        <div className="p-8">
          <TableHeader
            title="Templates"
            linkTitle="Add Template"
            href="/dashboard/products/new"
            data={templates}
            model="category"
          />
          <div className="py-8">
            <DataTable data={templates} columns={columns} />
          </div>
        </div>
      ) : (
        <div className="">
          <NoProduct />
        </div>
      )}
    </>
  );
}
