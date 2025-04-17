import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import HeroSectionOne from "@/components/simple-ui/hero-sections/HeroSectionOne";
import HeroSectionTwo from "@/components/simple-ui/hero-sections/HeroSectionTwo";
import HeroSectionThree from "@/components/simple-ui/hero-sections/HeroSectionThree";
import HeroSectionFour from "@/components/simple-ui/hero-sections/HeroSectionFour";
import HeroSectionFive from "@/components/simple-ui/hero-sections/HeroSectionFive";
import HeroSectionSix from "@/components/simple-ui/hero-sections/HeroSectionSix";
import HeroSectionSeven from "@/components/simple-ui/hero-sections/HeroSectionSeven";
import HeroSectionEight from "@/components/simple-ui/hero-sections/HeroSectionEight";
import HeroSectionNine from "@/components/simple-ui/hero-sections/HeroSectionNine";
import HeroSectionTen from "@/components/simple-ui/hero-sections/HeroSectionTen";
import HeroSectionEleven from "@/components/simple-ui/hero-sections/HeroSectionEleven";
import HeroSectionTwelve from "@/components/simple-ui/hero-sections/HeroSectionTwelve";
import HeroSectionThirteen from "@/components/simple-ui/hero-sections/HeroSectionThirteen";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("67f66561a68d770cd967f92c");
  const h2 = await getComponentViews("67f6658da68d770cd967f92d");
  const h3 = await getComponentViews("67f665b4a68d770cd967f92e");
  const h4 = await getComponentViews("67f665d7a68d770cd967f92f");
  const h5 = await getComponentViews("67f66601a68d770cd967f930");
  const h6 = await getComponentViews("67f66629a68d770cd967f931");
  const h7 = await getComponentViews("67f6664aa68d770cd967f932");
  const h8 = await getComponentViews("67f6666da68d770cd967f933");
  const h9 = await getComponentViews("67f66690a68d770cd967f934");
  const h10 = await getComponentViews("67f666b2a68d770cd967f935");
  const h11 = await getComponentViews("67f666d9a68d770cd967f936");
  const h12 = await getComponentViews("67f66700a68d770cd967f937");
  const h13 = await getComponentViews("67f66720a68d770cd967f938");

  const heroSections = [
    {
      id: "67f66561a68d770cd967f92c",
      title: "Hero Section One",
      component: HeroSectionOne,
      downloads: h1,
      sourcePath: "hero-sections/HeroSectionOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-one",
    },
    {
      id: "67f6658da68d770cd967f92d",
      title: "Hero Section Two",
      component: HeroSectionTwo,
      downloads: h2,
      sourcePath: "hero-sections/HeroSectionTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-two",
    },
    {
      id: "67f665b4a68d770cd967f92e",
      title: "Hero Section Three",
      component: HeroSectionThree,
      downloads: h3,
      sourcePath: "hero-sections/HeroSectionThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-three",
    },
    {
      id: "67f665d7a68d770cd967f92f",
      title: "Hero Section Four",
      component: HeroSectionFour,
      downloads: h4,
      sourcePath: "hero-sections/HeroSectionFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-four",
    },
    {
      id: "67f66601a68d770cd967f930",
      title: "Hero Section Five",
      component: HeroSectionFive,
      downloads: h5,
      sourcePath: "hero-sections/HeroSectionFive.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-five",
    },
    {
      id: "67f66629a68d770cd967f931",
      title: "Hero Section Six",
      component: HeroSectionSix,
      downloads: h6,
      sourcePath: "hero-sections/HeroSectionSix.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-six",
    },
    {
      id: "67f6664aa68d770cd967f932",
      title: "Hero Section Seven",
      component: HeroSectionSeven,
      downloads: h7,
      sourcePath: "hero-sections/HeroSectionSeven.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-seven",
    },
    {
      id: "67f6666da68d770cd967f933",
      title: "Hero Section Eight",
      component: HeroSectionEight,
      downloads: h8,
      sourcePath: "hero-sections/HeroSectionEight.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-eight",
    },
    {
      id: "67f66690a68d770cd967f934",
      title: "Hero Section Nine",
      component: HeroSectionNine,
      downloads: h9,
      sourcePath: "hero-sections/HeroSectionNine.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-nine",
    },
    {
      id: "67f666b2a68d770cd967f935",
      title: "Hero Section Ten",
      component: HeroSectionTen,
      downloads: h10,
      sourcePath: "hero-sections/HeroSectionTen.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-ten",
    },
    {
      id: "67f666d9a68d770cd967f936",
      title: "Hero Section Eleven",
      component: HeroSectionEleven,
      downloads: h11,
      sourcePath: "hero-sections/HeroSectionEleven.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-eleven",
    },
    {
      id: "67f66700a68d770cd967f937",
      title: "Hero Section Twelve",
      component: HeroSectionTwelve,
      downloads: h12,
      sourcePath: "hero-sections/HeroSectionTwelve.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-twelve",
    },
    {
      id: "67f66720a68d770cd967f938",
      title: "Hero Section Thirteen",
      component: HeroSectionThirteen,
      downloads: h13,
      sourcePath: "hero-sections/HeroSectionThirteen.tsx",
      githubUrl: "#",
      externalUrl: "/pages/hero-sections/hero-section-thirteen",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Hero Sections({heroSections.length})
      </h1>
      <div className="space-y-12">
        {heroSections.map((header, index) => {
          const sourceCode = extractComponentSource(header.sourcePath);
          console.log(sourceCode);
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
              route="hero-sections"
            />
          );
        })}
      </div>
    </div>
  );
}
