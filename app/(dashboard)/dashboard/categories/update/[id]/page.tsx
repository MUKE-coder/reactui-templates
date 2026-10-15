import { getCategoryById } from "@/actions/categories";
import CategoryForm from "@/components/Forms/CategoryForm";
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

  const category = await getCategoryById(id);
  return (
    <div className="p-8">
      <CategoryForm initialData={category} editingId={id} />
    </div>
  );
}
