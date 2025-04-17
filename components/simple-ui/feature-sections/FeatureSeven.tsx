"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Sliders,
  BarChart,
  Cpu,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Check,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  stats: {
    value: string;
    label: string;
  }[];
  benefits: string[];
}

const features: Feature[] = [
  {
    id: "performance",
    name: "Optimized Performance",
    description:
      "Blazing fast infrastructure designed for scale and reliability.",
    icon: Sliders,
    gradient: "from-blue-500 to-indigo-600",
    stats: [
      { value: "99.99%", label: "Uptime guarantee" },
      { value: "<50ms", label: "Global response time" },
      { value: "10x", label: "Faster than competitors" },
    ],
    benefits: [
      "Optimized Performance integrates seamlessly with your existing stack",
      "Setup takes minutes, not days or weeks",
      "No maintenance required - we handle everything for you",
    ],
  },
  {
    id: "analytics",
    name: "Intelligent Analytics",
    description:
      "Deep insights that drive better business decisions and growth.",
    icon: BarChart,
    gradient: "from-amber-500 to-orange-600",
    stats: [
      { value: "Real-time", label: "Data processing" },
      { value: "360°", label: "Customer view" },
      { value: "ML-powered", label: "Recommendations" },
    ],
    benefits: [
      "AI-driven insights that reveal hidden opportunities",
      "Customizable dashboards for every team member",
      "Automated reporting saves hours of manual work",
    ],
  },
  {
    id: "scaling",
    name: "Automatic Scaling",
    description:
      "Dynamically adjust resources based on demand without intervention.",
    icon: Cpu,
    gradient: "from-emerald-500 to-teal-600",
    stats: [
      { value: "Unlimited", label: "Scalability" },
      { value: "3s", label: "Scale-up time" },
      { value: "45%", label: "Cost savings" },
    ],
    benefits: [
      "Never worry about capacity planning again",
      "Pay only for what you use with precise resource allocation",
      "Handle traffic spikes with zero downtime",
    ],
  },
  {
    id: "security",
    name: "Enterprise Security",
    description:
      "Multi-layered protection for your most sensitive data and operations.",
    icon: Shield,
    gradient: "from-rose-500 to-pink-600",
    stats: [
      { value: "SOC2", label: "Compliance" },
      { value: "Zero", label: "Data breaches" },
      { value: "24/7", label: "Monitoring" },
    ],
    benefits: [
      "Enterprise-grade encryption at rest and in transit",
      "Compliance with global security standards out of the box",
      "Automated threat detection and prevention",
    ],
  },
  {
    id: "speed",
    name: "Developer Velocity",
    description:
      "Tools and workflows that help teams ship better software faster.",
    icon: Zap,
    gradient: "from-purple-500 to-violet-600",
    stats: [
      { value: "10x", label: "Deployment speed" },
      { value: "80%", label: "Less debugging" },
      { value: "3x", label: "Team productivity" },
    ],
    benefits: [
      "Streamlined CI/CD pipelines that just work",
      "Collaborative workflows that break down silos",
      "Comprehensive documentation and support",
    ],
  },
  {
    id: "global",
    name: "Global Infrastructure",
    description: "Deploy anywhere with our worldwide network of data centers.",
    icon: Globe,
    gradient: "from-cyan-500 to-sky-600",
    stats: [
      { value: "200+", label: "Data centers" },
      { value: "6", label: "Continents" },
      { value: "99.999%", label: "Reliability" },
    ],
    benefits: [
      "Edge computing capabilities for ultra-low latency",
      "Regional data residency for compliance requirements",
      "Automatic geo-redundancy for disaster recovery",
    ],
  },
];

export default function FeatureSectionSeven() {
  const [selectedFeature, setSelectedFeature] = useState<string>(
    features[0].id
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get the selected feature
  const currentFeature =
    features.find((f) => f.id === selectedFeature) || features[0];

  // Handle feature selection
  const handleFeatureSelect = (featureId: string) => {
    if (featureId === selectedFeature) return;

    setAutoRotate(false);
    setIsAnimating(true);

    setTimeout(() => {
      setSelectedFeature(featureId);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  // Toggle auto-rotation
  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  // Auto-rotate through features
  useEffect(() => {
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }

    if (!autoRotate || isHovering) return;

    autoRotateIntervalRef.current = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        const currentIndex = features.findIndex(
          (f) => f.id === selectedFeature
        );
        const nextIndex = (currentIndex + 1) % features.length;
        setSelectedFeature(features[nextIndex].id);

        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    }, 6000);

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [selectedFeature, autoRotate, isHovering]);

  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-24 -left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>

          <div className="mx-auto max-w-2xl text-center relative mb-16">
            <div className="inline-flex items-center rounded-full bg-indigo-50 p-1 pr-3">
              <div className="rounded-full bg-indigo-600 p-1 text-white">
                <Zap className="h-3 w-3" aria-hidden="true" />
              </div>
              <span className="ml-2 text-sm font-medium text-indigo-600">
                Enterprise Platform
              </span>
            </div>

            <h2
              id="features-heading"
              className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl"
            >
              Powerful capabilities for{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  modern enterprises
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-sm"></span>
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform combines cutting-edge technology with intuitive
              design to help you build, deploy, and scale with confidence.
            </p>
          </div>

          {/* Feature selector tabs with auto-rotate toggle */}
          <div className="flex flex-col items-center mb-16">
            <div className="inline-flex p-1 rounded-full bg-white shadow-sm mb-4 overflow-x-auto max-w-full">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureSelect(feature.id)}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
                    "mx-0.5 whitespace-nowrap",
                    selectedFeature === feature.id
                      ? "text-white shadow"
                      : "text-gray-700 hover:text-gray-900"
                  )}
                  aria-pressed={selectedFeature === feature.id}
                >
                  {selectedFeature === feature.id && (
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full bg-gradient-to-r",
                        feature.gradient,
                        "transition-opacity duration-200",
                        isAnimating ? "opacity-0" : "opacity-100"
                      )}
                      aria-hidden="true"
                    ></span>
                  )}
                  <span className="relative flex items-center">
                    <feature.icon
                      className="h-4 w-4 mr-1.5"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline">{feature.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Auto-rotate toggle */}
            <button
              onClick={toggleAutoRotate}
              className="flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
              aria-pressed={autoRotate}
            >
              {autoRotate ? (
                <>
                  <PauseCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>Pause auto-rotation</span>
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>Resume auto-rotation</span>
                </>
              )}
            </button>
          </div>

          {/* Main features display area */}
          <div
            className="relative w-full max-w-6xl mx-auto"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              {/* Active feature card - always visible */}
              <div
                className={cn(
                  "relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform",
                  isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100",
                  "h-full"
                )}
              >
                <div className="relative h-full flex flex-col">
                  {/* Feature banner */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentFeature.gradient}`}
                    aria-hidden="true"
                  ></div>

                  {/* Main content */}
                  <div className="p-6 sm:p-8 flex-grow">
                    <div className="flex justify-between items-start">
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${currentFeature.gradient} shadow-md`}
                        aria-hidden="true"
                      >
                        <currentFeature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="inline-flex items-center rounded-full bg-green-50 px-2 py-1">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-green-500"
                          aria-hidden="true"
                        ></span>
                        <span className="ml-1.5 text-xs font-medium text-green-700">
                          Active
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-gray-900">
                      {currentFeature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                      {currentFeature.description}
                    </p>

                    {/* Feature stats */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      {currentFeature.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div
                            className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${currentFeature.gradient}`}
                          >
                            {stat.value}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <button
                        type="button"
                        className={cn(
                          "w-full inline-flex justify-center items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm",
                          "bg-gradient-to-r",
                          currentFeature.gradient,
                          "hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
                          "transition-all duration-200"
                        )}
                      >
                        Explore {currentFeature.name}
                        <ChevronRight
                          className="ml-1.5 h-4 w-4"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Feature highlight corner */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
                    aria-hidden="true"
                  >
                    <div
                      className={`absolute top-0 right-0 w-[120%] h-[120%] bg-gradient-to-r ${currentFeature.gradient} shadow-md transform origin-bottom-left rotate-45 -translate-y-1/2 translate-x-1/2`}
                    ></div>
                    <Zap className="absolute top-3 right-3 h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Feature details panel */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 h-full flex flex-col">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${currentFeature.gradient} shadow-md mb-6`}
                  aria-hidden="true"
                >
                  <currentFeature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {currentFeature.name}
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  {currentFeature.description}
                </p>

                <div className="mt-8 space-y-5">
                  {currentFeature.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${currentFeature.gradient} bg-opacity-10`}
                        aria-hidden="true"
                      >
                        <span className="text-sm font-medium text-indigo-600">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="ml-4 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                        <div className="text-base font-semibold text-gray-900">
                          {stat.label}
                        </div>
                        <div
                          className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${currentFeature.gradient}`}
                        >
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key benefits */}
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Key Benefits
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {currentFeature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex">
                        <div
                          className={`flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r ${currentFeature.gradient} mt-0.5`}
                          aria-hidden="true"
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="ml-3 text-sm text-gray-600">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 mt-auto pt-4">
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm",
                      "hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
                      "transition-all duration-200"
                    )}
                  >
                    Get started with {currentFeature.name}
                    <ChevronRight
                      className="ml-1.5 h-4 w-4"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature selection indicators - small screens only */}
            <div className="mt-8 flex justify-center space-x-2 lg:hidden">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureSelect(feature.id)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    selectedFeature === feature.id
                      ? `bg-gradient-to-r ${feature.gradient}`
                      : "bg-gray-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  )}
                  aria-label={`Select ${feature.name}`}
                  aria-pressed={selectedFeature === feature.id}
                />
              ))}
            </div>

            {/* CTA section */}
            <div className="mt-16 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ready to transform your business?
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Get started with a 14-day free trial. No credit card
                    required.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm",
                      "hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
                      "transition-all duration-200"
                    )}
                  >
                    Start free trial
                    <ChevronRight
                      className="ml-1.5 h-4 w-4"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
