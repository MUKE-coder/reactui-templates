"use client";

import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Category, Template } from "@prisma/client";
import TitleColumn from "@/components/DataTableColumns/TitleColumn";
import Link from "next/link";
export const columns: ColumnDef<Template>[] = [
  {
    accessorKey: "thumbnail",
    header: "Template Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="thumbnail" />,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <TitleColumn template={row.original} />,
  },
  {
    accessorKey: "sales",
    header: "Sales",
    cell: ({ row }) => {
      const template = row.original;
      return (
        <Link className="font-semibold underline" href="#">
          0
        </Link>
      );
    },
  },
  {
    accessorKey: "sales",
    header: "Revenue",
    cell: ({ row }) => {
      const template = row.original;
      return <p className="font-semibold">$0</p>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const template = row.original;
      return <p className="font-semibold">{template.price}</p>;
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => {
      const template = row.original;
      return <p className="font-semibold">{template.views ?? 0}</p>;
    },
  },
  {
    accessorKey: "downloads",
    header: "Downloads",
    cell: ({ row }) => {
      const template = row.original;
      return <p className="font-semibold">{template.downloads ?? 0}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const template = row.original;
      return (
        <p className="font-semibold">
          {template.published ? "Published" : "Draft"}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const template = row.original;
      return (
        <ActionColumn
          row={row}
          model="template"
          editEndpoint={`products/update/${template.id}`}
          id={template.id}
        />
      );
    },
  },
];
