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
import { Badge } from "@/components/ui/badge";
import HomeCategories from "@/components/frontend/HomeCategories";
import HeroSection from "@/components/frontend/HeroSection";
import Templates from "@/components/frontend/Templates";
export default async function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <div className="">
        <Templates />
        {/* <Showcase /> */}
      </div>
    </main>
  );
}
