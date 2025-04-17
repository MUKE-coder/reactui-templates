"use client";
import React, { useState } from "react";
import {
  Zap,
  Shield,
  ChartBar,
  Database,
  Clock,
  Globe,
  Lock,
  Server,
} from "lucide-react";
import FeatureSectionFour from "./FeatureFour";

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  spanColumns?: boolean;
  spanRows?: boolean;
}

const features: Feature[] = [
  {
    id: "realtime",
    name: "Real-time Processing",
    description:
      "Process millions of events per second with distributed architecture.",
    icon: Zap,
    gradient: "from-amber-400 to-orange-600",
    spanColumns: true,
  },
  {
    id: "security",
    name: "Enterprise Security",
    description: "Bank-grade encryption with SOC 2 and HIPAA compliance.",
    icon: Shield,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "analytics",
    name: "Advanced Analytics",
    description: "Gain actionable insights with real-time dashboards.",
    icon: ChartBar,
    gradient: "from-blue-400 to-indigo-600",
    spanRows: true,
  },
  {
    id: "storage",
    name: "Scalable Storage",
    description: "Petabyte-scale storage with automatic distribution.",
    icon: Database,
    gradient: "from-purple-400 to-violet-600",
  },
  {
    id: "scheduling",
    name: "Smart Scheduling",
    description: "Intelligent task scheduling with priority queuing.",
    icon: Clock,
    gradient: "from-rose-400 to-pink-600",
  },
  {
    id: "global",
    name: "Global Infrastructure",
    description: "Deploy to 200+ data centers worldwide with a single click.",
    icon: Globe,
    gradient: "from-cyan-400 to-sky-600",
    spanColumns: true,
  },
  {
    id: "compliance",
    name: "Regulatory Compliance",
    description: "Stay compliant with automated governance controls.",
    icon: Lock,
    gradient: "from-fuchsia-400 to-pink-600",
  },
  {
    id: "serverless",
    name: "Serverless Computing",
    description: "Run code without provisioning or managing servers.",
    icon: Server,
    gradient: "from-lime-400 to-green-600",
  },
];

export default function FeatureSectionFive() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-indigo-100 mb-4">
            <span className="text-sm font-medium text-indigo-700">
              Enterprise Platform
            </span>
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Powerful capabilities
            </span>{" "}
            engineered for scale
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive platform is built from the ground up to help
            ambitious teams build and scale their products with confidence and
            speed.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`group relative overflow-hidden rounded-3xl p-6 md:p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 ${
                  feature.spanColumns ? "md:col-span-2" : ""
                } ${feature.spanRows ? "md:row-span-2" : ""}`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  className={`absolute top-0 right-0 h-32 w-32 opacity-10 blur-2xl bg-gradient-to-bl ${feature.gradient} -mr-16 -mt-16 rounded-full`}
                ></div>

                <div className="relative">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-sm`}
                  >
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.name}
                  </h3>

                  <p className="mt-3 text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div
                    className={`mt-4 flex items-center text-sm font-medium text-indigo-600`}
                  >
                    <span>Learn more</span>
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                        hoveredFeature === feature.id ? "translate-x-1" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${
                      feature.gradient
                    } transition-all duration-500 ease-out ${
                      hoveredFeature === feature.id ? "w-full" : "w-0"
                    }`}
                    style={{ bottom: "-8px", left: "-8px", right: "-8px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="flex space-x-4">
            <button className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Explore documentation
            </button>
            <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700">
              Start free trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
