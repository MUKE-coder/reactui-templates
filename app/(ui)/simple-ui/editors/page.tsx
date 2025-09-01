import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import { EmailEditor } from "@/components/simple-ui/editors/EmailEditor";
import ReactEmailEditorV2 from "@/components/simple-ui/editors/ReactEmailEditorV2";
import SimpleEditor from "@/components/simple-ui/editors/SimpleEditor";
import VEditor from "@/components/simple-ui/editors/VEditor";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Editors() {
  const h1 = await getComponentViews("673dbcb61504d1c7793c3bf7");
  const h2 = await getComponentViews("685ab6b2a0fcdd059f8c9725");
  const h3 = await getComponentViews("685ab6e0a0fcdd059f8c9726");
  const h4 = await getComponentViews("68b4ffe83151ff00475614d5");

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
      id: "685ab6b2a0fcdd059f8c9725",
      title: "Better Editor",
      component: EmailEditor,
      downloads: h2,
      sourcePath: "editors/EmailEditor.tsx",
      githubUrl: "#",
      externalUrl: "/pages/editors/email",
    },
    {
      id: "68b4ffe83151ff00475614d5",
      title: "Simple Editor",
      component: SimpleEditor,
      downloads: h4,
      sourcePath: "editors/SimpleEditor.tsx",
      githubUrl: "#",
      externalUrl: "/pages/editors/simple",
    },
    {
      id: "685ab6e0a0fcdd059f8c9726",
      title: "React Email Editor",
      component: ReactEmailEditorV2,
      downloads: h3,
      sourcePath: "editors/ReactEmailEditorV2.tsx",
      githubUrl: "#",
      externalUrl: "/pages/editors/react-email",
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
