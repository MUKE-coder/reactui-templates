import Link from "next/link";
import { SVGAttributes, type PropsWithChildren } from "react";

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

export default function AuthSimpleLayout({
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
