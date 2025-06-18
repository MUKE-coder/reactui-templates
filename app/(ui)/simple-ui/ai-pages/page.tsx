import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import ChatPageFour from "@/components/simple-ui/ai/ChatPageFour";
import ChatPageOne from "@/components/simple-ui/ai/ChatPageOne";
import ChatPageThree from "@/components/simple-ui/ai/ChatPageThree";
import ChatPageTwo from "@/components/simple-ui/ai/ChatPageTwo";
import InvoiceOne from "@/components/simple-ui/pages/InvoiceOne";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("685258260916bc9bd5b78e29");
  const h2 = await getComponentViews("685258600916bc9bd5b78e2a");
  const h3 = await getComponentViews("6852587d0916bc9bd5b78e2b");
  const h4 = await getComponentViews("685258a50916bc9bd5b78e2c");

  const dashboardPages = [
    {
      id: "683fd40bcade4c058668ca42",
      title: "ChatPage One",
      component: ChatPageOne,
      downloads: h1,
      sourcePath: "pages/ChatPageOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/ai-pages/one",
    },
    {
      id: "685258600916bc9bd5b78e2a",
      title: "ChatPage Two",
      component: ChatPageTwo,
      downloads: h2,
      sourcePath: "pages/ChatPageTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/ai-pages/two",
    },
    {
      id: "6852587d0916bc9bd5b78e2b",
      title: "ChatPage Three",
      component: ChatPageThree,
      downloads: h3,
      sourcePath: "pages/ChatPageThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/ai-pages/three",
    },
    {
      id: "685258a50916bc9bd5b78e2c",
      title: "ChatPage Four",
      component: ChatPageFour,
      downloads: h4,
      sourcePath: "pages/ChatPageThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/ai-pages/four",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        AI Pages({dashboardPages.length})
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
