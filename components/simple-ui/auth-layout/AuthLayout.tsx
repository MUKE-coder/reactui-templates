/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SVGAttributes } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type PropsWithChildren } from "react";
import { Skeleton } from "@/components/ui/skeleton";
interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}
export default function AuthLayout({
  children,
  title,
  description,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <AuthSplitLayout title={title} description={description} {...props}>
      {children}
    </AuthSplitLayout>
  );
}
export function DefaultAuthLayout() {
  return (
    <AuthLayout
      title="Default Layout Page"
      description="Default page description"
    >
      <div className="space-y-6">
        {/* Header area skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Main content area skeletons */}
        <div className="grid gap-6">
          {/* First content section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
            </div>
          </div>

          {/* Divider */}
          <Skeleton className="h-0.5 w-full" />

          {/* Second content section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-2/5" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>

          {/* Action button skeleton */}
          <Skeleton className="h-11 w-full rounded-md" />
        </div>

        {/* Footer section skeleton */}
        <div className="flex justify-center pt-4">
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </AuthLayout>
  );
}
interface AuthLayoutProps {
  title?: string;
  description?: string;
}

export function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  // const { name, quote } = usePage<SharedData>().props;

  return (
    <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthBackground />
      <div className="mx-auto w-full max-w-xl px-8 lg:py-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <Link
            href="/"
            className="relative z-20 flex items-center justify-center lg:hidden"
          >
            <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
          </Link>
          <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm text-balance">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
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
export function AuthBackground() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-indigo-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/auth-bg.jpg"
          alt="Background"
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="opacity-5"
        />
      </div>

      {/* Logo and Content Container */}
      <div className="relative z-10 flex h-full flex-col p-8">
        <div className="mb-6">
          <Link className="text-sm font-bold text-white uppercase" href="/">
            Lara-Commerce
          </Link>
        </div>

        <div className="flex h-full flex-col justify-center">
          <div className="max-w-md text-white">
            <h1 className="mb-6 text-4xl font-bold">
              Multivendor Ecommerce Platform
            </h1>
            <p className="mb-8 text-lg">
              Launch your online marketplace with Lara-Commerce. Our powerful
              Laravel-React starter kit gives you everything you need to create,
              manage, and scale a multivendor ecommerce platform with minimal
              setup.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-3 rounded-lg bg-white/20 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm opacity-70">Email Support:</div>
                  <div>desishub.info@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-3 rounded-lg bg-white/20 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm opacity-70">Phone Support:</div>
                  <div>+256 762 063 160</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} LARA-COMMERCE. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthSimpleLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="relative min-h-svh overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-indigo-950 dark:to-blue-950" />

      {/* Floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circle */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-300/30 blur-xl dark:from-indigo-800/20 dark:to-blue-700/20" />

        {/* Small circles */}
        <div className="animate-float-slow absolute top-1/4 left-10 h-16 w-16 rounded-full bg-blue-300/40 blur-md dark:bg-blue-700/20" />
        <div className="animate-float absolute right-1/4 bottom-20 h-24 w-24 rounded-full bg-blue-200/30 blur-md dark:bg-blue-800/20" />

        {/* Blob shapes */}
        <div className="animate-spin-very-slow absolute -bottom-32 -left-32 h-96 w-96 rotate-12 rounded-[40%] bg-indigo-200/20 blur-2xl dark:bg-indigo-800/10" />
        <div className="animate-spin-slow absolute top-1/3 -right-16 h-64 w-64 rotate-45 rounded-[60%] bg-blue-300/20 blur-xl dark:bg-blue-700/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-xl">
          <div className="rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-4">
                <Link
                  href="/"
                  className="group relative flex flex-col items-center gap-2 font-medium"
                >
                  <div className="absolute inset-0 scale-0 rounded-full bg-indigo-500/10 blur-xl filter transition-all duration-300 group-hover:scale-150 group-hover:bg-indigo-500/20 dark:bg-indigo-500/20 dark:group-hover:bg-indigo-500/30"></div>
                  <div className="relative mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-700 to-blue-800 shadow-md dark:from-indigo-400 dark:to-blue-500">
                    <AppLogoIcon className="size-7 fill-current text-white" />
                  </div>
                  <span className="sr-only">{title}</span>
                </Link>

                <div className="space-y-3 text-center">
                  <h1 className="bg-gradient-to-r from-indigo-800 to-blue-800 bg-clip-text text-2xl font-semibold text-transparent dark:from-indigo-400 dark:to-blue-400">
                    {title}
                  </h1>
                  <p className="text-muted-foreground text-center text-sm">
                    {description}
                  </p>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>

        {/* Decorative bottom elements */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 transform gap-2 opacity-70">
          <div className="h-1 w-1 rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
          <div className="h-1 w-1 rounded-full bg-blue-500 dark:bg-blue-400"></div>
          <div className="h-1 w-1 rounded-full bg-blue-500 dark:bg-blue-400"></div>
        </div>
      </div>
    </div>
  );
}

export function AuthCardLayout({
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
