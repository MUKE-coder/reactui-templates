import {
  getAuthorTemplates,
  getSimilarTemplates,
  getTemplateBySlug,
} from "@/actions/templates";
import TemplateDetailPage from "@/components/frontend/TemplateDetailPage";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Page(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const template = await getTemplateBySlug(slug);
  // Templates from the Author
  const authorId = template?.userId ?? "";
  const categoryId = template?.categoryId ?? "";
  const authorTemplates =
    (await getAuthorTemplates(authorId, template?.id ?? "")) || [];
  const similarTemplates =
    (await getSimilarTemplates(categoryId, template?.id ?? "")) || [];
  if (!template) {
    return notFound();
  }
  const session = await getServerSession(authOptions);
  return (
    <div className=" py-16">
      <TemplateDetailPage
        authorTemplates={authorTemplates}
        template={template}
        similarTemplates={similarTemplates}
        session={session}
      />
    </div>
  );
}
