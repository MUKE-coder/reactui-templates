import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import FeatureSectionOne from "@/components/simple-ui/feature-sections/FeatureOne";
import FeatureSectionTwo from "@/components/simple-ui/feature-sections/FeatureTwo";
import FeatureSectionThree from "@/components/simple-ui/feature-sections/FeatureThree";
import FeatureSectionFour from "@/components/simple-ui/feature-sections/FeatureFour";
import FeatureSectionFive from "@/components/simple-ui/feature-sections/FeatureFive";
import FeatureSectionSix from "@/components/simple-ui/feature-sections/FeatureSix";
import FeatureSectionSeven from "@/components/simple-ui/feature-sections/FeatureSeven";
import { extractComponentSource } from "@/lib/getComponentSource";
import FeatureSectionEight from "@/components/simple-ui/feature-sections/FeatureEight";
import FeatureSectionNine from "@/components/simple-ui/feature-sections/FeatureNine";

export default async function Headers() {
  const h1 = await getComponentViews("67f66720a68d770cd967f938");
  const h2 = await getComponentViews("67f7b14badf2c5b9a7753048");
  const h3 = await getComponentViews("67f7b191adf2c5b9a7753049");
  const h4 = await getComponentViews("67f7b1b0adf2c5b9a775304a");
  const h5 = await getComponentViews("67f7b1cdadf2c5b9a775304b");
  const h6 = await getComponentViews("67f7b20eadf2c5b9a775304c");
  const h7 = await getComponentViews("67f7b22badf2c5b9a775304d");
  const h8 = await getComponentViews("67f7b84badf2c5b9a775304e");
  const h9 = await getComponentViews("67f7b873adf2c5b9a775304f");

  const featureSections = [
    {
      id: "67f66720a68d770cd967f938",
      title: "Feature Section One",
      component: FeatureSectionOne,
      downloads: h1,
      sourcePath: "feature-sections/FeatureOne.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/one",
    },
    {
      id: "67f7b14badf2c5b9a7753048",
      title: "Feature Section Two",
      component: FeatureSectionTwo,
      downloads: h2,
      sourcePath: "feature-sections/FeatureTwo.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/two",
    },
    {
      id: "67f7b191adf2c5b9a7753049",
      title: "Feature Section Three",
      component: FeatureSectionThree,
      downloads: h3,
      sourcePath: "feature-sections/FeatureThree.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/three",
    },
    {
      id: "67f7b1b0adf2c5b9a775304a",
      title: "Feature Section Four",
      component: FeatureSectionFour,
      downloads: h4,
      sourcePath: "feature-sections/FeatureFour.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/four",
    },
    {
      id: "67f7b1cdadf2c5b9a775304b",
      title: "Feature Section Five",
      component: FeatureSectionFive,
      downloads: h5,
      sourcePath: "feature-sections/FeatureFive.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/five",
    },
    {
      id: "67f7b20eadf2c5b9a775304c",
      title: "Feature Section Six",
      component: FeatureSectionSix,
      downloads: h6,
      sourcePath: "feature-sections/FeatureSix.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/six",
    },
    {
      id: "67f7b22badf2c5b9a775304d",
      title: "Feature Section Seven",
      component: FeatureSectionSeven,
      downloads: h7,
      sourcePath: "feature-sections/FeatureSeven.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/seven",
    },
    {
      id: "67f7b84badf2c5b9a775304e",
      title: "Feature Section Eight",
      component: FeatureSectionEight,
      downloads: h8,
      sourcePath: "feature-sections/FeatureEight.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/eight",
    },
    {
      id: "67f7b873adf2c5b9a775304f",
      title: "Feature Section Nine",
      component: FeatureSectionNine,
      downloads: h9,
      sourcePath: "feature-sections/FeatureNine.tsx",
      githubUrl: "#",
      externalUrl: "/pages/feature-sections/nine",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Feature Sections({featureSections.length})
      </h1>
      <div className="space-y-12">
        {featureSections.map((header, index) => {
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
