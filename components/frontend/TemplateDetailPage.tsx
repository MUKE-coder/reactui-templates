"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import parse from "html-react-parser";
import {
  PackageIcon,
  LayersIcon,
  BookOpenIcon,
  HistoryIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RiReactjsLine } from "react-icons/ri";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RiNextjsFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import Autoplay from "embla-carousel-autoplay";
import { SiShadcnui } from "react-icons/si";
import { ChevronRight, ExternalLink } from "lucide-react";
import TemplateList from "./TemplateList";
import { Book, Calendar, Eye, User } from "lucide-react";
import Link from "next/link";
import { Template } from "@prisma/client";
import { timeAgo } from "@/lib/timeAgo";
import { TemplateProps } from "./Templates";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { createCustomer } from "@/actions/customers";
import { updateTemplateDownloads } from "@/actions/templates";
export default function TemplateDetailPage({
  template,
  authorTemplates,
  similarTemplates,
  session,
}: {
  template: Template;
  authorTemplates: TemplateProps[];
  similarTemplates: TemplateProps[];
  session: Session | null;
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  interface Logo {
    title: string;
    icon: React.ElementType;
  }

  const logos: Logo[] = [
    { title: "Next.js", icon: RiNextjsFill },
    { title: "React", icon: RiReactjsLine },
    { title: "shadcn/ui", icon: SiShadcnui },
    { title: "Framer Motion", icon: TbBrandFramerMotion },
    { title: "Tailwind CSS", icon: RiTailwindCssFill },
    { title: "TypeScript", icon: SiTypescript },
  ];
  const updatedAt = template?.updatedAt ? template?.updatedAt?.toString() : "";

  const stats = [
    {
      title: "Creator",
      icon: User,
      value: template.userName,
      href: `/creator/${template.author}`,
    },
    {
      title: "last Updated",
      icon: Calendar,
      value: timeAgo(updatedAt),
      href: "",
    },
    {
      title: "pages",
      icon: Book,
      value: template.pages,
      href: "",
    },
    {
      title: "Views",
      icon: Eye,
      value: template.views,
      href: "",
    },
  ];
  const pathname = usePathname();
  // console.log(pathname);
  const router = useRouter();
  async function handleDownload(id: string) {
    console.log("Download clicked");
    if (!session) {
      router.push(`/login?returnUrl=${pathname}`);
      return;
    }

    const user = session.user;
    const data = {
      email: user.email,
      name: user.name,
      productIds: [template.id],
      authorIds: [template.userId],
    };
    // Create the Customer
    try {
      await updateTemplateDownloads(id);
      await createCustomer(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <div className="flex flex-col lg:flex-row items-center justify-between ">
        <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {template.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{template?.description}</p>
          <div className="flex items-center space-x-3 mb-8">
            {logos.map((logo) => (
              <div
                key={logo.title}
                className="w-10 h-10 bg-slate-50 border rounded-xl flex items-center justify-center cursor-pointer"
                title={logo.title}
              >
                <logo.icon className="w-6 h-6" />
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            {template.isPaid ? (
              <Button
                variant="default"
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                Get Access - $40 USD
                <ChevronRight className="w-4 h-4 ml-3" />
              </Button>
            ) : (
              <>
                {session ? (
                  <Button
                    asChild
                    variant="default"
                    className="bg-gray-900 text-white hover:bg-gray-800"
                  >
                    <Link
                      onClick={() => handleDownload(template.id)}
                      target="_blank"
                      href={template.zippedFileUrl ?? "#"}
                    >
                      Download for Free
                      <ChevronRight className="w-4 h-4 ml-3" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleDownload(template.id)}
                    variant="default"
                    className="bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Download for Free
                    <ChevronRight className="w-4 h-4 ml-3" />
                  </Button>
                )}
              </>
            )}
            <Button asChild variant="outline">
              <Link target="_blank" href={template.previewLink ?? "#"}>
                {" "}
                Live Preview
                <ExternalLink className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="shadow rounded-lg flex items-center justify-between gap-6 py-4 px-8 mt-8">
            {stats.map((item, i) => {
              const Icon = item.icon;

              if (item.href) {
                return (
                  <Link key={i} href={item.href} className="">
                    <Icon className="w-5 h-5 " />
                    <h2 className="font-bold text-sm py-2">{item.value}</h2>
                    <p className="text-muted-foreground text-xs">
                      {item.title}
                    </p>
                  </Link>
                );
              }

              return (
                <div key={i} className="cursor-pointer">
                  <Icon className="w-5 h-5 " />
                  <h2 className="font-bold text-sm py-2">{item.value}</h2>
                  <p className="text-muted-foreground text-xs">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
        {template.screenShots && template.screenShots.length > 0 && (
          <div className="lg:w-1/2 relative">
            <div className="bg-gray-900 rounded-lg p-4 shadow-xl">
              <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xl mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {template.screenShots.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Image
                          src={src}
                          alt={`${template.name} ${index + 1}`}
                          width={800}
                          height={600}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        )}
      </div>
      <div className="py-6 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
        <Tabs defaultValue="included" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-6 rounded-lg bg-muted p-1">
            <TabsTrigger
              value="included"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
            >
              <PackageIcon className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">What is Included</span>
              <span className="md:hidden">Included</span>
            </TabsTrigger>
            <TabsTrigger
              value="stack"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
            >
              <LayersIcon className="w-4 h-4 mr-2" />
              <span>Tech Stack</span>
            </TabsTrigger>
            <TabsTrigger
              value="documentation"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
            >
              <BookOpenIcon className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Documentation</span>
              <span className="md:hidden">Docs</span>
            </TabsTrigger>
            <TabsTrigger
              value="log"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
            >
              <HistoryIcon className="w-4 h-4 mr-2" />
              <span>Change Log</span>
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="included">
              <Card>
                <CardContent className="p-6">
                  <div className="prose">
                    {parse(template?.whatsIncluded ?? "")}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="stack">
              <Card>
                <CardContent className="p-6">
                  {/* <h3 className="text-lg font-semibold mb-2">Tech Stack</h3> */}
                  <div className="prose">
                    {parse(template?.techStack ?? "")}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documentation">
              <Card>
                <CardContent className="p-6">
                  {/* <h3 className="text-lg font-semibold mb-2">Documentation</h3> */}
                  <div className="prose">
                    {parse(template?.documentation ?? "")}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="log">
              <Card>
                <CardContent className="p-6">
                  {/* <h3 className="text-lg font-semibold mb-2">Change Log</h3> */}
                  <div className="prose">
                    {parse(template?.changeLog ?? "")}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      {/* More from the Author */}
      {authorTemplates.length > 0 && (
        <TemplateList
          templates={authorTemplates}
          title={`More from ${template.userName}`}
        />
      )}
      {/* Related Templates */}
      {similarTemplates.length > 0 && (
        <TemplateList templates={similarTemplates} title="Related Templates" />
      )}
    </div>
  );
}
