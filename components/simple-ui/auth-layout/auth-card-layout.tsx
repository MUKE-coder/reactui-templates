/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SVGAttributes, type PropsWithChildren } from "react";

export default function AuthCardLayout({
  children,
  title,
  description,
}: PropsWithChildren<{
  name?: string;
  title?: string;
  description?: string;
}>) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden p-6 md:p-10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - Different for light/dark mode */}
        <img
          src="/white.avif"
          alt=""
          className="block h-full w-full object-cover dark:hidden"
        />
        <img
          src="/black.jpg"
          alt=""
          className="hidden h-full w-full object-cover dark:block"
        />

        {/* Gradient Overlay - Different for light/dark mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/10 via-blue-50/10 to-blue-100/10 dark:from-gray-950/10 dark:via-indigo-950/85 dark:to-blue-950/10" />

        {/* Extra texture overlay */}
        <div className="bg-grid-pattern absolute inset-0 opacity-10 mix-blend-overlay dark:opacity-5" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-xl flex-col gap-8">
        {/* Card and Logo Container */}
        <div className="relative mx-auto w-full">
          {/* Logo - Positioned higher to ensure it's fully visible */}
          <div className="absolute top-10 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="rounded-full border-4 border-white bg-gradient-to-br from-indigo-600 to-blue-600 p-4 dark:border-gray-900 dark:from-indigo-500 dark:to-blue-500">
              <AppLogoIcon className="size-12 fill-current text-white" />
            </div>
          </div>

          {/* Card */}
          <Card className="mt-10 overflow-hidden rounded-xl border-0 bg-white/95 backdrop-blur-sm dark:bg-gray-900/95">
            <CardHeader className="px-10 pt-8 pb-4 text-center">
              <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {title}
              </CardTitle>
              <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 py-3">{children}</CardContent>
          </Card>
        </div>

        {/* Copyright or Footer */}
        <div className="mt-4 text-center text-xs text-gray-700 dark:text-gray-300">
          © {new Date().getFullYear()} Lara-Commerce. All rights reserved.
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/5 h-20 w-20 rounded-full bg-indigo-500/20 blur-xl dark:bg-indigo-500/10"></div>
      <div className="absolute bottom-1/4 left-1/5 h-32 w-32 rounded-full bg-blue-500/20 blur-xl dark:bg-blue-500/10"></div>
    </div>
  );
}

export function AppLogoIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg {...props} viewBox="0 0 40 42" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2 5.63325L8.6 0.855469L0 5.63325V32.1434L16.2 41.1434L32.4 32.1434V23.699L40 19.4767V9.85547L31.4 5.07769L22.8 9.85547V18.2999L17.2 21.411V5.63325ZM38 18.2999L32.4 21.411V15.2545L38 12.1434V18.2999ZM36.9409 10.4439L31.4 13.5221L25.8591 10.4439L31.4 7.36561L36.9409 10.4439ZM24.8 18.2999V12.1434L30.4 15.2545V21.411L24.8 18.2999ZM23.8 20.0323L29.3409 23.1105L16.2 30.411L10.6591 27.3328L23.8 20.0323ZM7.6 27.9212L15.2 32.1434V38.2999L2 30.9666V7.92116L7.6 11.0323V27.9212ZM8.6 9.29991L3.05913 6.22165L8.6 3.14339L14.1409 6.22165L8.6 9.29991ZM30.4 24.8101L17.2 32.1434V38.2999L30.4 30.9666V24.8101ZM9.6 11.0323L15.2 7.92117V22.5221L9.6 25.6333V11.0323Z"
      />
    </svg>
  );
}
