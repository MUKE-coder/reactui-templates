import { getAllCategories, getCategoryById } from "@/actions/categories";
import { getCaTemplateById } from "@/actions/templates";
import CategoryForm from "@/components/Forms/CategoryForm";
import TemplateEditForm from "@/components/Forms/TemplateEditForm";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function page(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const template = await getCaTemplateById(id);
  const categories = (await getAllCategories()) || [];
  const session = await getServerSession(authOptions);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div className="p-8">
      <div className="flex justify-between pb-2 mb-2 items-center border-b">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          {template?.name}
        </h1>
        <div className="flex gap-4">
          <Button variant={"outline"}>
            <Link href={`${baseUrl}/web-templates/${template?.slug}`}>
              {" "}
              Preview
            </Link>
          </Button>
          {template?.previewLink && (
            <Button>
              <Link href={template?.previewLink ?? ""}> View Live</Link>
            </Button>
          )}
        </div>
      </div>
      <TemplateEditForm
        session={session}
        categories={categories}
        initialData={template}
        editingId={id}
      />
    </div>
  );
}
