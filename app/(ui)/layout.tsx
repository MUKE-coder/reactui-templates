import Footer from "@/components/frontend/site-footer";
import SiteHeader from "@/components/frontend/site-header";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
import DevTools from "../../components/dev-tools";
import DigitalProducts from "@/components/premium-products";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-background">
      <SiteHeader session={session} />
      <div className="pt-16">
        {children}
        {/* <DigitalProducts /> */}
        {/* <DevTools /> */}
      </div>
    </div>
  );
}
