import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";

import { extractComponentSource } from "@/lib/getComponentSource";

import NavBarOne from "@/components/simple-ui/store-navigation/NavBarOne";
import NavBarTwo from "@/components/simple-ui/store-navigation/NavBarTwo";
import NavBarThree from "@/components/simple-ui/store-navigation/NavBarThree";
import NavBarFive from "@/components/simple-ui/store-navigation/NavBarFive";
import NavBarFour from "@/components/simple-ui/store-navigation/NavBarFour";
import NavBarSix from "@/components/simple-ui/store-navigation/NavBarSix";

export default async function Headers() {
  const h1 = await getComponentViews("6800a797e7265731a681606f");
  const h2 = await getComponentViews("6800a7dbe7265731a6816070");
  const h3 = await getComponentViews("6800a7e5e7265731a6816071");
  const h4 = await getComponentViews("6800a7f9e7265731a6816072");
  const h5 = await getComponentViews("6800a7ffe7265731a6816073");
  const h6 = await getComponentViews("6875e364d3d3f5ddae350781");

  const navSections = [
    {
      id: "6800a797e7265731a681606f",
      title: "Navbar One",
      component: NavBarOne,
      downloads: h1,
      sourcePath: "store-navigation/NavBarOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-navigation/one",
    },
    {
      id: "6800a7dbe7265731a6816070",
      title: "Navbar Two",
      component: NavBarTwo,
      downloads: h2,
      sourcePath: "store-navigation/NavBarTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-navigation/two",
    },
    {
      id: "6800a7e5e7265731a6816071",
      title: "Navbar Three",
      component: NavBarThree,
      downloads: h3,
      sourcePath: "store-navigation/NavBarThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-navigation/three",
    },
    {
      id: "6800a7f9e7265731a6816072",
      title: "Navbar Four - Mega Menu",
      component: NavBarFour,
      downloads: h4,
      sourcePath: "store-navigation/NavBarFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-navigation/four",
    },
    {
      id: "6800a7ffe7265731a6816073",
      title: "Navbar Five",
      component: NavBarFive,
      downloads: h5,
      sourcePath: "store-navigation/NavBarFive.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-navigation/five",
    },
    {
      id: "6875e364d3d3f5ddae350781",
      title: "Navbar Six - No mega Menu with Tabs",
      component: NavBarSix,
      downloads: h6,
      sourcePath: "store-navigation/NavBarSix.tsx",
      githubUrl: "#",
      externalUrl: "/pages/store-navigation/six",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Store Navigations ({navSections.length})
      </h1>
      <div className="space-y-12">
        {navSections.map((header, index) => {
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
