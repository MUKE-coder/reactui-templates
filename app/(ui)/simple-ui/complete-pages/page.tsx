import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import DashboardFour from "@/components/simple-ui/dashboard-pages/DashboardFour";
import DashboardOne from "@/components/simple-ui/dashboard-pages/DashboardOne";
import DashboardThree from "@/components/simple-ui/dashboard-pages/DashboardThree";
import DashboardTwo from "@/components/simple-ui/dashboard-pages/DashboardTwo";
import ContactApp from "@/components/simple-ui/pages/ContactApp";
import FreebieLanding from "@/components/simple-ui/pages/FreebieLanding";
import InvoiceFour from "@/components/simple-ui/pages/InvoiceFour";
import InvoiceOne from "@/components/simple-ui/pages/InvoiceOne";
import InvoiceThree from "@/components/simple-ui/pages/InvoiceThree";
import InvoiceTwo from "@/components/simple-ui/pages/InvoiceTwo";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h0 = await getComponentViews("68f882caae84de9986abaec4");
  const h1 = await getComponentViews("683fd40bcade4c058668ca42");
  const h2 = await getComponentViews("683fd43ecade4c058668ca43");
  const h3 = await getComponentViews("683fd468cade4c058668ca44");
  const h4 = await getComponentViews("683fd498cade4c058668ca45");
  const h5 = await getComponentViews("685ab41ca0fcdd059f8c9723");

  const dashboardPages = [
    {
      id: "68f882caae84de9986abaec4",
      title: "Contact App",
      component: ContactApp,
      downloads: h0,
      sourcePath: "pages/ContactApp.tsx",
      githubUrl: "#",
      externalUrl: "/pages/complete-pages/zero",
    },
    {
      id: "683fd40bcade4c058668ca42",
      title: "Invoice One",
      component: InvoiceOne,
      downloads: h1,
      sourcePath: "pages/InvoiceOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/complete-pages/one",
    },
    {
      id: "683fd43ecade4c058668ca43",
      title: "Invoice Two",
      component: InvoiceTwo,
      downloads: h2,
      sourcePath: "pages/InvoiceTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/complete-pages/two",
    },
    {
      id: "683fd468cade4c058668ca44",
      title: "Invoice Three",
      component: InvoiceThree,
      downloads: h3,
      sourcePath: "pages/InvoiceThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/complete-pages/three",
    },
    {
      id: "683fd498cade4c058668ca45",
      title: "Invoice Four",
      component: InvoiceFour,
      downloads: h4,
      sourcePath: "pages/InvoiceFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/complete-pages/four",
    },
    {
      id: "685ab41ca0fcdd059f8c9723",
      title: "Freebie Landing Page",
      component: FreebieLanding,
      downloads: h5,
      sourcePath: "pages/FreebieLanding.tsx",
      githubUrl: "#",
      externalUrl: "/pages/complete-pages/five",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Pages({dashboardPages.length})
      </h1>
      <div className="space-y-12">
        {dashboardPages.map((header, index) => {
          const sourceCode = extractComponentSource(header.sourcePath);
          return (
            <ComponentPreview
              key={index}
              title={header.title}
              component={<header.component />}
              sourceCode={sourceCode}
              githubUrl={header.githubUrl}
              externalUrl={header.externalUrl}
              id={header.id}
              downloads={header.downloads}
              route="pricing"
            />
          );
        })}
      </div>
    </div>
  );
}
