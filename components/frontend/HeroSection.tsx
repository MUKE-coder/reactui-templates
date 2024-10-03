import React from "react";
import HomeCategories from "./HomeCategories";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 dark:from-cyan-900 dark:via-blue-900 dark:to-purple-900">
      <div className="absolute inset-0 bg-grid-white/[0.05] dark:bg-grid-white/[0.02]" />
      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-md">
            Beautifully designed website templates
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/90 dark:text-white/80 max-w-2xl mx-auto mb-8">
            100+ beautiful templates and systems built with React, TypeScript,
            Tailwind CSS, and Framer Motion. Save thousands of hours, create a
            beautiful landing page, and convert your visitors into customers.
          </p>
          <HomeCategories />
        </div>
      </div>
    </section>
  );
}
