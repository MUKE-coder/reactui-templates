"use client";
import React, { useState } from "react";
import { Camera, Shield, Zap, ArrowUpCircle, LucideIcon } from "lucide-react";

interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
}

const features: Feature[] = [
  {
    name: "Instant Deployment",
    description:
      "Deploy your changes to production in seconds with our automated CI/CD pipeline. Zero downtime and automatic rollbacks included.",
    icon: ArrowUpCircle,
    color: "from-violet-500 to-purple-600",
    hoverColor: "group-hover:from-violet-600 group-hover:to-purple-700",
  },
  {
    name: "Enterprise Security",
    description:
      "Bank-grade encryption with SOC 2 and GDPR compliance built-in. Your data is protected by the same security standards trusted by Fortune 500 companies.",
    icon: Shield,
    color: "from-emerald-500 to-teal-600",
    hoverColor: "group-hover:from-emerald-600 group-hover:to-teal-700",
  },
  {
    name: "Real-time Processing",
    description:
      "Handle millions of events per second with our distributed queue system. Engineered for reliability and performance at global scale.",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    hoverColor: "group-hover:from-amber-600 group-hover:to-orange-700",
  },
  {
    name: "Analytics Suite",
    description:
      "Gain actionable insights with our advanced analytics. Track user behavior, monitor performance metrics, and make data-driven decisions.",
    icon: Camera,
    color: "from-blue-500 to-indigo-600",
    hoverColor: "group-hover:from-blue-600 group-hover:to-indigo-700",
  },
];

export default function FeatureSectionOne() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="inline-flex items-center space-x-1 text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            <span>ENTERPRISE GRADE</span>
            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              Powerful infrastructure for ambitious products
            </span>
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Our platform delivers the reliability, security, and performance
            that growing companies need to build world-class applications
            without the operational complexity.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group relative rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md hover:border-gray-200 bg-white"
                onMouseEnter={() => setHoveredFeature(feature.name)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} ${feature.hoverColor} transition-all duration-300 ease-in-out`}
                  >
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <dt className="text-lg font-semibold text-gray-900 flex items-center">
                      {feature.name}
                      <div
                        className={`ml-2 h-1 w-1 rounded-full bg-gradient-to-r ${
                          feature.color
                        } opacity-0 transition-opacity duration-300 ${
                          hoveredFeature === feature.name ? "opacity-100" : ""
                        }`}
                      />
                    </dt>
                    <dd className="mt-2 text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </dd>
                  </div>
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${
                    feature.color
                  } transition-all duration-700 ease-in-out ${
                    hoveredFeature === feature.name ? "w-full" : ""
                  }`}
                />
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <button
            className="px-6 py-3 text-base font-medium text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-500/20 transition-all duration-300"
            onClick={() => console.log("Free trial initiated")}
          >
            Start your free trial
          </button>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. 14-day trial.
          </p>
        </div>
      </div>
    </div>
  );
}
