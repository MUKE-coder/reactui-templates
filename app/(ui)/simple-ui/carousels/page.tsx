import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import CardCarousel from "@/components/simple-ui/carousels/card-carousel";
import CarouselCards from "@/components/simple-ui/carousels/carousel-cards";
import CustomCarousel from "@/components/simple-ui/carousels/custom-carousel";
import HeroCarousel from "@/components/simple-ui/carousels/hero-carousel";
import ProductCarousel from "@/components/simple-ui/carousels/product-carousel";
import MantineHeader from "@/components/simple-ui/nav-bars/mantine";
import SimpleHeader from "@/components/simple-ui/nav-bars/mantine-simple";
import VercelHeader from "@/components/simple-ui/nav-bars/vercel";
import SidebarV1 from "@/components/simple-ui/sidebars/SidebarV1";
import SidebarV2 from "@/components/simple-ui/sidebars/SidebarV2";
import SidebarV3 from "@/components/simple-ui/sidebars/SidebarV3";
import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const s1 = await getComponentViews("6725abaa2c872e16e88955d4");
  const s2 = await getComponentViews("6725b5612c872e16e88955d7");
  const s3 = await getComponentViews("6725abfe2c872e16e88955d5");
  const s4 = await getComponentViews("6725b51b2c872e16e88955d6");
  const s5 = await getComponentViews("6725c0e22c872e16e88955d8");

  const sidebars = [
    {
      id: "6725abfe2c872e16e88955d5",
      title: "Card with Carousel",
      component: CardCarousel,
      sourcePath: "components/simple-ui/carousels/card-carousel.tsx",
      downloads: s3,
      githubUrl: "#",
      externalUrl: "/pages/carousels/card-carousel",
    },
    {
      id: "6725abaa2c872e16e88955d4",
      title: "Blog Cards Carousel",
      component: CarouselCards,
      downloads: s1,
      sourcePath: "components/simple-ui/carousels/carousel-cards.tsx",
      githubUrl: "#",
      externalUrl: "/pages/carousels/blog-cards",
    },
    {
      id: "6725b51b2c872e16e88955d6",
      title: "Hero Carousel",
      component: HeroCarousel,
      sourcePath: "components/simple-ui/carousels/hero-carousel.tsx",
      downloads: s4,
      githubUrl: "#",
      externalUrl: "/pages/carousels/hero-carousel",
    },
    {
      id: "6725b5612c872e16e88955d7",
      title: "Product Carousel",
      component: ProductCarousel,
      sourcePath: "components/simple-ui/carousels/product-carousel.tsx",
      downloads: s2,
      githubUrl: "#",
      externalUrl: "/pages/carousels/product-carousel",
    },
    {
      id: "6725c0e22c872e16e88955d8",
      title: "Custom Carousel",
      component: CustomCarousel,
      sourcePath: "components/simple-ui/carousels/custom-carousel.tsx",
      downloads: s5,
      githubUrl: "#",
      externalUrl: "/pages/carousels/custom-carousel",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">Carousels({sidebars.length})</h1>
      <div className="space-y-12">
        {sidebars.map((header, index) => {
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
              route="site-headers"
            />
          );
        })}
      </div>
    </div>
  );
}
