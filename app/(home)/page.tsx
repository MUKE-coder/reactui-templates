import ComparisonFeatures from "@/components/ComparisonFeatures";
import Announcement from "@/components/frontend/announcement";
import { Testimonials } from "@/components/frontend/testimonials";
import { AnimatedAvatars } from "@/components/global/avatar-circles";
import { CustomLinkButton } from "@/components/global/CustomLinkButton";
import Iframe from "react-iframe";
import StarRating from "@/components/global/StarRating";
import HowItWorks from "@/components/HowItWorks";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ModeToggle } from "@/components/mode-toggle";
import { Star } from "lucide-react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import SectionHeading from "@/components/global/SectionHeading";
import Pricing from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { useSession } from "next-auth/react";
import { CustomerReviews } from "@/components/frontend/CustomerReviews";
import Showcase from "@/components/frontend/showcase";
import { getKitUsers } from "@/actions/users";
export default async function Home() {
  const count = (await getKitUsers()) ?? 0;
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl py-16 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Build it over the weekend and launch on Monday.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-4">
            This Next Js Boilerplate is a comprehensive and modern starting
            point, packed with all the features you need to quickly build your
            SaaS, AI tool, or any web app, helping you make your first earnings
            online faster.
          </p>
          <CustomLinkButton title="Go to Dashboard" href="/dashboard" />
        </div>
      </div>

      <div className="pb-16">
        <Showcase />
      </div>
    </main>
  );
}
