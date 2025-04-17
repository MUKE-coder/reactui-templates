"use client";
import React, { useState } from "react";
import {
  ServerIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
} from "lucide-react";
import { CubeIcon } from "@heroicons/react/20/solid";
import { LightningBoltIcon } from "@radix-ui/react-icons";

interface FeatureTab {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  details: {
    title: string;
    description: string;
  }[];
  image: string;
  gradient: string;
}

const featureTabs: FeatureTab[] = [
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Cloud-native infrastructure that scales with your needs.",
    icon: ServerIcon,
    details: [
      {
        title: "Global Distribution",
        description:
          "Deploy across our network of 200+ data centers worldwide.",
      },
      {
        title: "Auto-Scaling",
        description:
          "Automatically adjust resources based on real-time demand.",
      },
      {
        title: "Zero Downtime",
        description: "Updates and maintenance with no service interruption.",
      },
    ],
    image:
      "https://img.freepik.com/free-vector/network-servers-set_1284-12642.jpg?t=st=1744110481~exp=1744114081~hmac=61354939c9ec0d0640c0beeb4f07804c3fe8bf28bd40bcf570431359aace5fa5&w=900",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: "security",
    name: "Security",
    description: "Enterprise-grade security for mission-critical applications.",
    icon: ShieldCheckIcon,
    details: [
      {
        title: "End-to-End Encryption",
        description: "Data encrypted in transit and at rest with AES-256.",
      },
      {
        title: "Access Controls",
        description: "Role-based permissions with multi-factor authentication.",
      },
      {
        title: "Compliance",
        description: "SOC2, GDPR, HIPAA, and ISO 27001 compliant systems.",
      },
    ],
    image:
      "https://img.freepik.com/free-photo/technician-doing-checkup-server-farm_482257-90825.jpg?t=st=1744110560~exp=1744114160~hmac=e29f2785bc6181aff11482926d782cb501b9839085de5cf2e292525e7ebd74be&w=1380",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "integration",
    name: "Integration",
    description: "Connect with your existing tools and services seamlessly.",
    icon: CubeIcon,
    details: [
      {
        title: "API-First Design",
        description: "Comprehensive APIs with excellent documentation.",
      },
      {
        title: "Webhooks",
        description: "Real-time event notifications to trigger your workflows.",
      },
      {
        title: "Marketplace",
        description:
          "Hundreds of pre-built integrations with popular services.",
      },
    ],
    image:
      "https://img.freepik.com/free-vector/server-room-cloud-storage-icon-datacenter-database-concept-data-exchange-process_39422-556.jpg?t=st=1744110575~exp=1744114175~hmac=dc7160a546f224c9c8d1923938af6e54217e9ba183d5cefacb3a613eb194f24f&w=1380",
    gradient: "from-amber-400 to-orange-600",
  },
  {
    id: "performance",
    name: "Performance",
    description: "Blazing fast speeds that keep your users engaged.",
    icon: LightningBoltIcon,
    details: [
      {
        title: "Edge Computing",
        description:
          "Compute resources closer to your users for faster responses.",
      },
      {
        title: "Query Optimization",
        description:
          "Intelligent caching and query planning for minimal latency.",
      },
      {
        title: "Content Delivery",
        description: "Global CDN with automatic asset optimization.",
      },
    ],
    image:
      "https://img.freepik.com/free-vector/ultraviolet-banner-server-room-abstract-technology-objects-cloud-storage_39422-562.jpg?t=st=1744110619~exp=1744114219~hmac=be662d9e8e5d034102beb57e09d6f5aba49956f43ca0adec07c57b87e2681310&w=1380",
    gradient: "from-violet-400 to-purple-600",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Deep insights into your application and user behavior.",
    icon: ChartBarIcon,
    details: [
      {
        title: "Real-time Dashboards",
        description: "Customizable dashboards with live data streams.",
      },
      {
        title: "Custom Reports",
        description: "Build and schedule reports tailored to your needs.",
      },
      {
        title: "Machine Learning",
        description:
          "Predictive analytics to identify trends and opportunities.",
      },
    ],
    image:
      "https://img.freepik.com/free-vector/cloud-computing-concept_1284-4091.jpg?t=st=1744110722~exp=1744114322~hmac=a33a3a39650af5fe5275f98e65de01ef32bc99092b393e5e5cb933bc83fa23b9&w=900",
    gradient: "from-rose-400 to-pink-600",
  },
  {
    id: "automation",
    name: "Automation",
    description: "Streamline workflows and eliminate repetitive tasks.",
    icon: CogIcon,
    details: [
      {
        title: "Workflow Builder",
        description: "Visual editor to create complex automation workflows.",
      },
      {
        title: "Scheduling",
        description:
          "Trigger actions based on time or events with fine-grained control.",
      },
      {
        title: "Error Handling",
        description: "Sophisticated retry logic and failure recovery systems.",
      },
    ],
    image:
      "https://img.freepik.com/free-vector/data-network-illustration_24908-57783.jpg?t=st=1744110778~exp=1744114378~hmac=6638f1b1c648dcd0fa938ca9580d463e312c879806e9de17775242f25eb0389b&w=900",
    gradient: "from-indigo-400 to-blue-600",
  },
];

export default function FeatureSectionFour() {
  const [activeTab, setActiveTab] = useState(featureTabs[0].id);

  const currentFeature =
    featureTabs.find((tab) => tab.id === activeTab) || featureTabs[0];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
            <svg
              className="mr-1.5 h-2 w-2 fill-indigo-600"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx="3" cy="3" r="3" />
            </svg>
            Enterprise Platform
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Everything you need
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-sm"></span>
            </span>{" "}
            to scale your business
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive platform provides all the tools modern businesses
            need to build, deploy, and scale applications with confidence.
          </p>
        </div>

        <div className="mt-16">
          <div className="flex overflow-x-auto pb-4 sm:justify-center">
            <div className="inline-flex items-center space-x-2 rounded-full bg-gray-50 p-1.5">
              {featureTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? `bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/10`
                      : `text-gray-600 hover:text-gray-900`
                  }`}
                >
                  <tab.icon
                    className={`mr-1.5 h-4 w-4 ${
                      activeTab === tab.id ? "text-indigo-600" : "text-gray-400"
                    }`}
                  />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative">
                <div
                  className={`absolute -inset-4 bg-gradient-to-r ${currentFeature.gradient} opacity-10 blur-xl rounded-3xl`}
                ></div>
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={currentFeature.image}
                    alt={`${currentFeature.name} feature`}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className={`inline-flex items-center rounded-full bg-gradient-to-r ${currentFeature.gradient} px-3 py-1 text-sm font-medium text-white mb-2`}
                    >
                      {currentFeature.name}
                    </div>
                    <p className="text-base font-medium text-white">
                      {currentFeature.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${currentFeature.gradient} shadow-md mb-6`}
                >
                  <currentFeature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {currentFeature.name}
                </h3>

                <p className="mt-3 text-lg text-gray-600">
                  {currentFeature.description}
                </p>

                <div className="mt-8 space-y-6">
                  {currentFeature.details.map((detail, index) => (
                    <div key={index} className="flex">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${currentFeature.gradient} bg-opacity-10`}
                      >
                        <span className="text-sm font-medium text-indigo-600">
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-semibold text-gray-900">
                          {detail.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {detail.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <button
                    className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r ${currentFeature.gradient} hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    Learn more about {currentFeature.name.toLowerCase()}
                    <svg
                      className="ml-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
