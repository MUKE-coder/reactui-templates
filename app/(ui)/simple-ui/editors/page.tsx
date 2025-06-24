import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import { EmailEditor } from "@/components/simple-ui/editors/EmailEditor";
import VEditor from "@/components/simple-ui/editors/VEditor";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Editors() {
  const h1 = await getComponentViews("673dbcb61504d1c7793c3bf7");

  const siteHeaders = [
    {
      id: "673dbcb61504d1c7793c3bf7",
      title: "TipTap Modern Editor",
      component: VEditor,
      downloads: h1,
      sourcePath: "editors/VEditor.tsx",
      githubUrl: "#",
      externalUrl: "/pages/editors/tiptap",
    },
    {
      id: "673dbcb61504d1c7793c3bf7",
      title: "Better Editor",
      component: EmailEditor,
      downloads: h1,
      sourcePath: "editors/EmailEditor.tsx",
      githubUrl: "#",
      externalUrl: "/pages/editors/email",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Richtext Editors ({siteHeaders.length})
      </h1>
      <div className="space-y-12">
        {siteHeaders.map((header, index) => {
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
              route="footers"
            />
          );
        })}
      </div>
    </div>
  );
}
