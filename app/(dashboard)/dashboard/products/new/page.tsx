import { getAllCategories } from "@/actions/categories";
import TemplateForm from "@/components/Forms/TemplateForm";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const categories = (await getAllCategories()) || [];
  const session = await getServerSession(authOptions);
  return (
    <div className="p-8">
      <TemplateForm session={session} categories={categories} />
    </div>
  );
}
