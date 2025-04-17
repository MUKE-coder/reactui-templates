"use client";

import type React from "react";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Code,
  Smartphone,
  Mail,
  Globe,
  BarChart,
  Stethoscope,
  Landmark,
  GraduationCap,
  ShoppingBag,
  Bitcoin,
  Brain,
  Wifi,
  Glasses,
  ClipboardList,
  Clock,
  Users,
  UserPlus,
  Lightbulb,
  Tag,
  Handshake,
  History,
  UserCircle,
  Building,
  Briefcase,
  FileText,
  MessageSquare,
  Download,
  HelpCircle,
  PhoneCall,
  Lock,
  LogIn,
  UserCheck,
} from "lucide-react";

const navigation = [
  {
    name: "Services",
    href: "#",
    hasSubmenu: true,
    submenu: [
      {
        title: "Development Services",
        items: [
          {
            name: "Web Development",
            href: "#",
            description: "Custom websites and web applications",
            icon: <Globe className="h-5 w-5" />,
          },
          {
            name: "Mobile App Development",
            href: "#",
            description: "iOS and Android applications",
            icon: <Smartphone className="h-5 w-5" />,
          },
          {
            name: "E-commerce Solutions",
            href: "#",
            description: "Online stores and marketplaces",
            icon: <ShoppingBag className="h-5 w-5" />,
          },
          {
            name: "API Integration",
            href: "#",
            description: "Connect your systems seamlessly",
            icon: <Code className="h-5 w-5" />,
          },
        ],
      },
      {
        title: "Design Services",
        items: [
          {
            name: "UI/UX Design",
            href: "#",
            description: "User-centered interface design",
            icon: <Lightbulb className="h-5 w-5" />,
          },
          {
            name: "Brand Identity",
            href: "#",
            description: "Logo and visual identity systems",
            icon: <Tag className="h-5 w-5" />,
          },
          {
            name: "Motion Graphics",
            href: "#",
            description: "Animated visuals and interactions",
            icon: <Glasses className="h-5 w-5" />,
          },
          {
            name: "Prototyping",
            href: "#",
            description: "Interactive mockups and wireframes",
            icon: <ClipboardList className="h-5 w-5" />,
          },
        ],
      },
      {
        title: "Marketing Services",
        items: [
          {
            name: "SEO Optimization",
            href: "#",
            description: "Improve search engine rankings",
            icon: <BarChart className="h-5 w-5" />,
          },
          {
            name: "Content Marketing",
            href: "#",
            description: "Strategic content creation",
            icon: <FileText className="h-5 w-5" />,
          },
          {
            name: "Social Media Management",
            href: "#",
            description: "Platform-specific strategies",
            icon: <MessageSquare className="h-5 w-5" />,
          },
          {
            name: "Email Marketing",
            href: "#",
            description: "Targeted email campaigns",
            icon: <Mail className="h-5 w-5" />,
          },
        ],
      },
    ],
  },
  {
    name: "Industries",
    href: "#",
    hasSubmenu: true,
    submenu: [
      {
        title: "Key Industries",
        items: [
          {
            name: "Healthcare",
            href: "#",
            description: "Digital solutions for medical providers",
            icon: <Stethoscope className="h-5 w-5" />,
          },
          {
            name: "Finance",
            href: "#",
            description: "Fintech and banking applications",
            icon: <Landmark className="h-5 w-5" />,
          },
          {
            name: "Education",
            href: "#",
            description: "E-learning and educational platforms",
            icon: <GraduationCap className="h-5 w-5" />,
          },
          {
            name: "Retail",
            href: "#",
            description: "E-commerce and retail solutions",
            icon: <ShoppingBag className="h-5 w-5" />,
          },
        ],
      },
      {
        title: "Emerging Markets",
        items: [
          {
            name: "Blockchain",
            href: "#",
            description: "Decentralized applications",
            icon: <Bitcoin className="h-5 w-5" />,
          },
          {
            name: "AI & Machine Learning",
            href: "#",
            description: "Intelligent automation solutions",
            icon: <Brain className="h-5 w-5" />,
          },
          {
            name: "IoT",
            href: "#",
            description: "Connected device ecosystems",
            icon: <Wifi className="h-5 w-5" />,
          },
          {
            name: "AR/VR",
            href: "#",
            description: "Immersive digital experiences",
            icon: <Glasses className="h-5 w-5" />,
          },
        ],
      },
    ],
  },
  {
    name: "Business Models",
    href: "#",
    hasSubmenu: true,
    submenu: [
      {
        title: "Engagement Models",
        items: [
          {
            name: "Fixed Price Projects",
            href: "#",
            description: "Defined scope and deliverables",
            icon: <ClipboardList className="h-5 w-5" />,
          },
          {
            name: "Time & Materials",
            href: "#",
            description: "Flexible development approach",
            icon: <Clock className="h-5 w-5" />,
          },
          {
            name: "Dedicated Teams",
            href: "#",
            description: "Extended development resources",
            icon: <Users className="h-5 w-5" />,
          },
          {
            name: "Staff Augmentation",
            href: "#",
            description: "On-demand talent solutions",
            icon: <UserPlus className="h-5 w-5" />,
          },
        ],
      },
      {
        title: "Partnership Options",
        items: [
          {
            name: "Strategic Consulting",
            href: "#",
            description: "Technology roadmap planning",
            icon: <Lightbulb className="h-5 w-5" />,
          },
          {
            name: "White Label Services",
            href: "#",
            description: "Resellable development services",
            icon: <Tag className="h-5 w-5" />,
          },
          {
            name: "Joint Ventures",
            href: "#",
            description: "Collaborative business initiatives",
            icon: <Handshake className="h-5 w-5" />,
          },
        ],
      },
    ],
  },
  {
    name: "Company",
    href: "#",
    hasSubmenu: true,
    submenu: [
      {
        title: "About Us",
        items: [
          {
            name: "Our Story",
            href: "#",
            description: "How we started and evolved",
            icon: <History className="h-5 w-5" />,
          },
          {
            name: "Team",
            href: "#",
            description: "Meet our talented professionals",
            icon: <UserCircle className="h-5 w-5" />,
          },
          {
            name: "Careers",
            href: "#",
            description: "Join our growing team",
            icon: <Briefcase className="h-5 w-5" />,
          },
          {
            name: "Values",
            href: "#",
            description: "What drives our organization",
            icon: <Building className="h-5 w-5" />,
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            name: "Blog",
            href: "#",
            description: "Insights and industry trends",
            icon: <FileText className="h-5 w-5" />,
          },
          {
            name: "Case Studies",
            href: "#",
            description: "Success stories and outcomes",
            icon: <ClipboardList className="h-5 w-5" />,
          },
          {
            name: "Testimonials",
            href: "#",
            description: "What our clients say",
            icon: <MessageSquare className="h-5 w-5" />,
          },
          {
            name: "Press Kit",
            href: "#",
            description: "Media resources and brand assets",
            icon: <Download className="h-5 w-5" />,
          },
        ],
      },
    ],
  },
  {
    name: "More",
    href: "#",
    hasSubmenu: true,
    submenu: [
      {
        title: "Resources",
        items: [
          {
            name: "Documentation",
            href: "#",
            description: "Guides and technical resources",
            icon: <FileText className="h-5 w-5" />,
          },
          {
            name: "Support",
            href: "#",
            description: "Get help with our services",
            icon: <HelpCircle className="h-5 w-5" />,
          },
          {
            name: "FAQ",
            href: "#",
            description: "Frequently asked questions",
            icon: <HelpCircle className="h-5 w-5" />,
          },
          {
            name: "Contact",
            href: "#",
            description: "Get in touch with our team",
            icon: <PhoneCall className="h-5 w-5" />,
          },
        ],
      },
    ],
  },
];

const serviceCards = [
  {
    title: "Premium Custom Solutions",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 3L8 6.5M5 3L2 6.5M5 3L5 21M19 3L16 6.5M19 3L22 6.5M19 3L19 21M5 21L8 17.5M5 21L2 17.5M19 21L16 17.5M19 21L22 17.5M2 12L22 12"
          stroke="#80ABFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    href: "#premium-solutions",
  },
  {
    title: "Mobile App Solutions",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 1.5H8.25C7.65326 1.5 7.08097 1.73705 6.65901 2.15901C6.23705 2.58097 6 3.15326 6 3.75V20.25C6 20.8467 6.23705 21.419 6.65901 21.841C7.08097 22.2629 7.65326 22.5 8.25 22.5H15.75C16.3467 22.5 16.919 22.2629 17.341 21.841C17.7629 21.419 18 20.8467 18 20.25V3.75C18 3.15326 17.7629 2.58097 17.341 2.15901C16.919 1.73705 16.3467 1.5 15.75 1.5H13.5M10.5 1.5V3H13.5V1.5M10.5 1.5H13.5M12 18.75H12.008V18.758H12V18.75Z"
          stroke="#80ABFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    href: "#mobile-solutions",
  },
  {
    title: "Social Media Management",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
          stroke="#80ABFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    href: "#social-media",
  },
  {
    title: "Web Development",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12H3.01M7.5 12H7.51M12 12H12.01M16.5 12H16.51M21 12H21.01M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
          stroke="#80ABFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    href: "#web-development",
  },
  {
    title: "Digital Marketing",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 13.125C3 18.0975 7.02944 22.125 12 22.125C14.3051 22.125 16.4078 21.3712 18.0283 20.0879C18.3641 19.8124 18.4533 19.3289 18.2203 18.9782L16.9677 17.0835C16.7649 16.7782 16.3711 16.6488 16.0239 16.7962C14.9305 17.2159 13.7031 17.4541 12.4092 17.4541C9.5242 17.4541 7.01096 15.8731 5.75807 13.5502M10.9823 3.11514C17.8171 3.15912 21 8.41698 21 13.125C21 14.4083 20.7396 15.6344 20.2689 16.7571M4.71281 8.66724C5.36937 7.14016 6.38984 5.80704 7.67764 4.79258M16.7781 4.75105L12.5125 9.01974C12.0442 8.55129 11.4405 8.25 10.7812 8.25C9.39553 8.25 8.27345 9.37208 8.27345 10.7578C8.27345 12.1436 9.39553 13.2656 10.7812 13.2656C12.167 13.2656 13.2891 12.1436 13.2891 10.7578C13.2891 10.0878 12.9799 9.47578 12.5 9.00547L16.7781 4.75105Z"
          stroke="#80ABFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    href: "#digital-marketing",
  },
];

// Custom component for the navigation menu content
const ListItem = ({
  title,
  href,
  children,
  icon,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-900/30 hover:text-white focus:bg-blue-900/30 focus:text-white group"
        >
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors">
              {icon}
            </div>
            <div className="text-sm font-medium leading-none text-white">
              {title}
            </div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400 mt-1 pl-7 group-hover:text-gray-300 transition-colors">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default function HeroSectionNine() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-[#070b25] bg-[linear-gradient(0deg,rgba(7,11,37,1)0%,rgba(23,26,60,1)100%)]">
      {/* Fixed navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0c112e]/95 backdrop-blur-sm shadow-lg shadow-blue-900/20"
            : "bg-transparent"
        }`}
      >
        <nav
          className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">DESISHUB</span>
              <span className="text-2xl font-bold text-blue-400">
                DESI<span className="text-white">SHUB</span>
              </span>
              <span className="hidden sm:block ml-2 text-xs text-gray-400">
                Leveraging Technology
              </span>
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-300 hover:bg-blue-900/50"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* shadcn Navigation Menu */}
          <div className="hidden lg:flex lg:gap-x-2">
            <NavigationMenu className="bg-transparent">
              <NavigationMenuList className="flex gap-2">
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.hasSubmenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-blue-900/30 focus:bg-blue-900/30">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[400px] lg:w-[500px] p-4 md:grid md:grid-cols-2 lg:w-[600px] bg-[#0c112e] border border-blue-900/50 backdrop-blur-xl rounded-xl shadow-2xl shadow-blue-800/20">
                            {item.submenu.map((section, idx) => (
                              <div key={idx} className="p-3">
                                <h3 className="mb-3 text-sm font-semibold text-blue-400">
                                  {section.title}
                                </h3>
                                <ul className="space-y-2">
                                  {section.items.map((subItem, subIdx) => (
                                    <ListItem
                                      key={subIdx}
                                      title={subItem.name}
                                      href={subItem.href}
                                      icon={subItem.icon}
                                    >
                                      {subItem.description}
                                    </ListItem>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Login and Sign Up CTAs */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <LogIn className="h-4 w-4" />
              Log in
            </a>
            <a
              href="#"
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-md hover:shadow-xl hover:shadow-blue-700/20 transition-all transform hover:-translate-y-0.5 border border-blue-500/20"
            >
              Sign up
              <ArrowUpRightIcon className="inline-block ml-1.5 -mt-0.5 h-3.5 w-3.5" />
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        <Transition show={mobileMenuOpen} as={Fragment}>
          <Dialog onClose={setMobileMenuOpen} className="lg:hidden">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in duration-150"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0c112e] px-6 py-6 sm:max-w-sm sm:border-l sm:border-blue-900/50">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5 flex items-center">
                    <span className="text-2xl font-bold text-blue-400">
                      DESI<span className="text-white">SHUB</span>
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-full p-2.5 text-gray-300 hover:bg-blue-900/50"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-700/50">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <div key={item.name} className="space-y-2">
                          <a
                            href={item.href}
                            className="-mx-3 flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-blue-900/50 hover:text-white"
                          >
                            <span>{item.name}</span>
                            {item.hasSubmenu && (
                              <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </a>

                          {/* Mobile submenu items - simplified version of mega menu */}
                          {item.hasSubmenu &&
                            item.submenu.map((section, idx) => (
                              <div key={idx} className="pl-4 space-y-1">
                                <h4 className="text-xs font-semibold text-blue-400 px-3 py-1">
                                  {section.title}
                                </h4>
                                {section.items.map((subItem, subIdx) => (
                                  <a
                                    key={subIdx}
                                    href={subItem.href}
                                    className="block rounded-md py-1.5 px-3 text-sm text-gray-400 hover:bg-blue-900/30 hover:text-white flex items-center gap-2"
                                  >
                                    <span className="text-blue-400">
                                      {subItem.icon}
                                    </span>
                                    <span>{subItem.name}</span>
                                  </a>
                                ))}
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                    <div className="py-6 space-y-4">
                      <a
                        href="#"
                        className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-blue-900/30 hover:text-white"
                      >
                        <LogIn className="h-5 w-5" />
                        Log in
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center gap-2 rounded-full py-2.5 text-base font-medium text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-700/20"
                      >
                        <UserCheck className="h-5 w-5" />
                        Sign up
                      </a>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </header>

      <main>
        <div className="relative isolate pt-24 md:pt-32">
          {/* Grid lines background */}
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,20,45,0.1)0%,rgba(17,20,45,0.1)100%)]"
            style={{
              backgroundSize: "30px 30px",
              backgroundImage:
                "linear-gradient(to right, #172052 1px, transparent 1px), linear-gradient(to bottom, #172052 1px, transparent 1px)",
              zIndex: -1,
            }}
          />

          {/* Floating code element with subtle animation */}
          <div className="absolute top-48 left-10 hidden lg:block">
            <div className="w-16 h-16 bg-blue-900/50 rounded-lg backdrop-blur-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 animate-pulse"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 8L3 12L7 16M17 8L21 12L17 16"
                  stroke="#80ABFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Floating screen element with subtle animation */}
          <div className="absolute top-60 right-10 hidden lg:block">
            <div className="w-16 h-16 bg-blue-900/50 rounded-lg backdrop-blur-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10 animate-pulse"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 17H15M9 17C7.89543 17 7 16.1046 7 15V9C7 7.89543 7.89543 7 9 7H15C16.1046 7 17 7.89543 17 9V15C17 16.1046 16.1046 17 15 17M9 17L5 21M15 17L19 21M12 12H12.01M18.5 4L21 6.5M18.5 4L16 6.5M18.5 4L18.5 9M6 3L3 6M6 3L9 6M6 3L6 8.5"
                  stroke="#80ABFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Hero content */}
            <div className="py-12 md:py-20 text-center">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-800/50 text-blue-300 text-sm mb-6">
                <Lock className="h-3.5 w-3.5 mr-2" />
                Enterprise-grade security and scalability
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/90 mb-6 bg-gradient-to-r from-blue-400 via-violet-400 to-blue-300 bg-clip-text text-transparent">
                Creating Digital Solutions To
                <br className="hidden md:block" /> Transform Businesses
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Modern Web & Mobile Solutions, Tailored for Your Business.
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-base font-medium text-white shadow-lg hover:shadow-xl hover:shadow-blue-700/20 transition-all duration-200 flex items-center justify-center w-full sm:w-auto group border border-blue-500/20"
                >
                  Book a Free Consultation
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 px-6 py-3.5 text-base font-medium text-white shadow-md hover:bg-blue-800/30 transition-all duration-200 w-full sm:w-auto text-center"
                >
                  Chat with an expert
                </a>
              </div>

              {/* Trusted by section */}
              <div className="mt-16 hidden md:block">
                <p className="text-sm text-gray-500 mb-4">
                  Trusted by innovative companies worldwide
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-24 bg-white/5 rounded-md"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 md:mt-12 pb-16">
              {serviceCards.map((card, index) => (
                <Link key={index} href={card.href} className="group">
                  <div className="relative h-full bg-[#111633]/60 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6 flex flex-col items-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/10 group-hover:-translate-y-1 group-hover:bg-[#131a3d]/80 overflow-hidden cursor-pointer">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                    <div className="bg-blue-900/50 rounded-xl p-3 mb-4 group-hover:bg-blue-800/70 transition-colors z-10">
                      {card.icon}
                    </div>
                    <h3 className="text-white text-center font-medium mb-2 z-10">
                      {card.title}
                    </h3>

                    {/* Arrow indicator */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <ArrowRightIcon className="h-4 w-4 text-blue-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom gradient glow effect */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-700/10 to-transparent -z-10"></div>
        </div>
      </main>
    </div>
  );
}
