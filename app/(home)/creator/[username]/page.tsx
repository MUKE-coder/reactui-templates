import { getAuthorTemplatesByUsername } from "@/actions/templates";
import getUserByUsername from "@/actions/users";
import AuthorTemplates from "@/components/frontend/AuthorTemplates";
import { notFound } from "next/navigation";
import React from "react";

export default async function page(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;

  const {
    username
  } = params;

  const templates = (await getAuthorTemplatesByUsername(username)) || [];
  const author = await getUserByUsername(username);
  if (!author) {
    return notFound();
  }
  return (
    <div className="mt-16 p-8">
      <AuthorTemplates author={author} templates={templates} />
    </div>
  );
}
