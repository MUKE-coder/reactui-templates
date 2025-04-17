"use client";
import React, { useState, useEffect } from "react";
import {
  Zap,
  Shield,
  BarChart,
  Share2,
  User,
  Cpu,
  ChevronRight,
  Check,
} from "lucide-react";

interface Feature {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  benefits: string[];
}

const features: Feature[] = [
  {
    id: 1,
    name: "Lightning Performance",
    description:
      "Optimized for speed and efficiency at every layer of the stack.",
    icon: Zap,
    gradient: "from-amber-500 to-orange-600",
    benefits: [
      "Global edge network with <2ms response time",
      "Optimized database queries and caching",
      "Automatic asset compression and delivery",
    ],
  },
  {
    id: 2,
    name: "Enterprise Security",
    description:
      "Comprehensive protection for your most sensitive data and operations.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-600",
    benefits: [
      "End-to-end encryption at rest and in transit",
      "Advanced threat monitoring and prevention",
      "Compliance with SOC2, HIPAA, and GDPR",
    ],
  },
  {
    id: 3,
    name: "Advanced Analytics",
    description:
      "Deep insights that help you understand user behavior and optimize performance.",
    icon: BarChart,
    gradient: "from-blue-500 to-indigo-600",
    benefits: [
      "Real-time dashboards with customizable views",
      "Machine learning-powered anomaly detection",
      "Conversion and funnel analysis tools",
    ],
  },
  {
    id: 4,
    name: "Seamless Integration",
    description:
      "Connect with your existing tools and services without friction.",
    icon: Share2,
    gradient: "from-purple-500 to-violet-600",
    benefits: [
      "Extensive API with comprehensive documentation",
      "Webhook support for real-time event processing",
      "Native integrations with 200+ popular services",
    ],
  },
  {
    id: 5,
    name: "Developer Experience",
    description:
      "Designed by developers, for developers, to maximize productivity.",
    icon: User,
    gradient: "from-rose-500 to-pink-600",
    benefits: [
      "Intuitive CLI for rapid development workflows",
      "Comprehensive documentation and examples",
      "Local development environment that mirrors production",
    ],
  },
  {
    id: 6,
    name: "Intelligent Scaling",
    description:
      "Automatically adapts to changing demands without manual intervention.",
    icon: Cpu,
    gradient: "from-cyan-500 to-sky-600",
    benefits: [
      "Auto-scaling based on traffic patterns",
      "Load balancing across multiple regions",
      "Cost optimization without performance compromise",
    ],
  },
];

const FeatureSectionSix: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const handleFeatureClick = (featureId: number) => {
    if (featureId === activeFeature) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveFeature(featureId);
      setTimeout(() => setIsAnimating(false), 300);
    }, 200);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-12 sm:mb-16">
          <h2 className="inline-flex items-center text-base font-semibold leading-7 text-indigo-600">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
            </span>
            ENTERPRISE PLATFORM
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            Powerful infrastructure
            <span className="relative mx-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                reimagined
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-sm"></span>
            </span>
            for modern teams
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform delivers the reliability, security, and performance
            that ambitious teams need to build exceptional products without the
            typical infrastructure complexity.
          </p>
        </div>

        {/* Feature selector tabs - visible on all screen sizes */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <div className="inline-flex p-1 rounded-full bg-white shadow-sm">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFeature === feature.id
                    ? "text-white shadow"
                    : "text-gray-700 hover:text-gray-900"
                } focus:outline-none mx-0.5`}
              >
                {activeFeature === feature.id && (
                  <span
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                      feature.gradient
                    } transition-opacity duration-200 ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                )}
                <span className="relative flex items-center">
                  <feature.icon className="h-4 w-4 mr-1.5" />
                  <span className="hidden sm:inline">{feature.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main feature display */}
        <div className="relative">
          {/* Feature content */}
          <div
            className={`transition-opacity duration-300 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            {features.map(
              (feature) =>
                feature.id === activeFeature && (
                  <div
                    key={feature.id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                  >
                    <div className="order-2 lg:order-1">
                      <div className="relative rounded-2xl overflow-hidden shadow-xl">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-10`}
                        ></div>
                        <img
                          src="/api/placeholder/600/400"
                          alt={feature.name}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center space-x-2 text-white">
                            <feature.icon className="h-5 w-5" />
                            <span className="text-sm font-bold">
                              {feature.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="order-1 lg:order-2">
                      <div className="space-y-6">
                        <div
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-md`}
                        >
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {feature.name}
                          </h3>
                          <p className="mt-2 text-lg text-gray-600">
                            {feature.description}
                          </p>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                          <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                            Key Benefits
                          </h4>
                          <ul className="mt-4 space-y-3">
                            {feature.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start">
                                <div
                                  className={`flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r ${feature.gradient} mt-0.5`}
                                >
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                                <span className="ml-3 text-base text-gray-700">
                                  {benefit}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <button
                            className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r ${feature.gradient} hover:opacity-90 transition-opacity duration-200`}
                          >
                            Learn more
                            <ChevronRight className="ml-1.5 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>

          {/* Feature indicator dots - small screens only */}
          <div className="mt-8 flex justify-center space-x-2 sm:hidden">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  activeFeature === feature.id
                    ? `bg-gradient-to-r ${feature.gradient}`
                    : "bg-gray-300"
                }`}
                aria-label={`Select ${feature.name}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-24 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:items-center rounded-full bg-indigo-50 px-4 sm:px-6 py-2 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
            <span>Ready to transform your infrastructure?</span>
            <span className="hidden sm:block mx-2 h-5 w-px bg-indigo-500/20"></span>
            <button className="font-semibold text-indigo-600 hover:text-indigo-500 py-1 px-3 bg-white rounded-full shadow-sm">
              Schedule a demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSectionSix;
