import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import MomoBannerCarousel from "@/components/simple-ui/momo-market/MomoBannerCarousel";
import MomoCartItems from "@/components/simple-ui/momo-market/MomoCartItems";
import MomoFooter from "@/components/simple-ui/momo-market/MomoFooter";
import MomoNavbar from "@/components/simple-ui/momo-market/MomoNavbar";
import MomoProductDetail from "@/components/simple-ui/momo-market/MomoProductDetail";
import MomoProductListing from "@/components/simple-ui/momo-market/MomoProductListing";

import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("6868ba0e8876ebce2db962c5");
  const h2 = await getComponentViews("6868ba768876ebce2db962c6");
  const h3 = await getComponentViews("6868baac8876ebce2db962c7");
  const h4 = await getComponentViews("6868bb228876ebce2db962c8");
  const h5 = await getComponentViews("6868bbd18876ebce2db962c9");
  const h6 = await getComponentViews("6868bc788876ebce2db962ca");

  const dashboardPages = [
    {
      id: "6868ba0e8876ebce2db962c5",
      title: "Momo Navbar",
      component: MomoNavbar,
      downloads: h1,
      sourcePath: "momo-market/MomoNavbar.tsx",
      githubUrl: "#",
      externalUrl: "/pages/momo-market/one",
    },
    {
      id: "6868ba768876ebce2db962c6",
      title: "Momo Banner",
      component: MomoBannerCarousel,
      downloads: h2,
      sourcePath: "momo-market/MomoBannerCarousel.tsx",
      githubUrl: "#",
      externalUrl: "/pages/momo-market/two",
    },
    {
      id: "6868baac8876ebce2db962c7",
      title: "Momo Product Listing",
      component: MomoProductListing,
      downloads: h3,
      sourcePath: "momo-market/MomoProductListing.tsx",
      githubUrl: "#",
      externalUrl: "/pages/momo-market/three",
    },
    {
      id: "6868bb228876ebce2db962c8",
      title: "Momo Footer",
      component: MomoFooter,
      downloads: h4,
      sourcePath: "momo-market/MomoFooter.tsx",
      githubUrl: "#",
      externalUrl: "/pages/momo-market/four",
    },
    {
      id: "6868bbd18876ebce2db962c9",
      title: "Momo Product detail",
      component: MomoProductDetail,
      downloads: h5,
      sourcePath: "momo-market/MomoProductDetail.tsx",
      githubUrl: "#",
      externalUrl: "/pages/momo-market/five",
    },
    {
      id: "6868bc788876ebce2db962ca",
      title: "Momo Cart Page",
      component: MomoCartItems,
      downloads: h6,
      sourcePath: "momo-market/MomoCartItems.tsx",
      githubUrl: "#",
      externalUrl: "/pages/momo-market/six",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">
        Momo Market Project Components({dashboardPages.length})
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
