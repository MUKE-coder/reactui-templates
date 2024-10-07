import { getAuthorTemplatesByUsername } from "@/actions/templates";
import AuthorTemplates from "@/components/frontend/AuthorTemplates";
import React from "react";

export default async function page({
  params: { username },
}: {
  params: { username: string };
}) {
  const templates = (await getAuthorTemplatesByUsername(username)) || [];
  return (
    <div className="mt-16 p-8">
      <AuthorTemplates templates={templates} />
    </div>
  );
}
