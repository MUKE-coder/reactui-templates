import { Template } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default function TitleColumn({ template }: { template: Template }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div className="flex flex-col">
      <Link
        className="font-s text-xl hover:underline"
        href={`/dashboard/products/update/${template.id}`}
      >
        {template.name}
      </Link>
      <Link
        className="text-sm text-muted-foreground mt-2 hover:underline"
        href={`${baseUrl}/web-templates/${template.slug}`}
      >{`${baseUrl}/web-templates/${template.slug}`}</Link>
    </div>
  );
}
