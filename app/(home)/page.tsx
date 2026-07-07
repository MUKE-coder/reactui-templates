import { getFrontendTemplates } from "@/actions/templates";
import CleanHero from "@/components/frontend/CleanHero";
import Templates from "@/components/frontend/Templates";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { query = "all" } = searchParams;
  const templates = (await getFrontendTemplates(query as string)) || [];
  return (
    <main className="min-h-screen">
      <CleanHero />
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Templates</h2>
        <p className="mt-1.5 mb-8 text-[15px] text-muted-foreground">
          Full, production-ready website templates.
        </p>
        <Templates templates={templates} />
      </div>
    </main>
  );
}
