import PerformingProductsTable from "@/components/simple-ui/data-tables/PerformingProductsTable";
import ProductsTable from "@/components/simple-ui/data-tables/ProductsTable";
import ProjectTable from "@/components/simple-ui/data-tables/ProjectTable";
import TeamProjectsTable from "@/components/simple-ui/data-tables/TeamProjectsTable";
import UserManagementTable from "@/components/simple-ui/data-tables/UserManagementTable";

const sections = [
  {
    id: "projects",
    title: "Project table",
    description: "Teams, budgets, leaders, and activity trends.",
    component: <ProjectTable />,
  },
  {
    id: "products",
    title: "Products table",
    description: "Compact commerce rows with payment progress and status.",
    component: <ProductsTable />,
  },
  {
    id: "performing",
    title: "Top performing products",
    description: "Rank products by sales, earnings, category, and technology.",
    component: <PerformingProductsTable />,
  },
  {
    id: "team-projects",
    title: "Team projects table",
    description: "Project ownership, team avatars, status, and budget.",
    component: <TeamProjectsTable />,
  },
  {
    id: "users",
    title: "User management table",
    description:
      "Searchable and filterable administration table with row actions.",
    component: <UserManagementTable />,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-muted/30 px-4 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Shadcn table collection
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Independent table components.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Five production-ready table patterns inspired by the provided
            references. Each component accepts typed data and can be imported
            independently.
          </p>
        </header>
        <div className="flex flex-col gap-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {section.title}
                </h2>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
              <div className="overflow-x-auto">{section.component}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
