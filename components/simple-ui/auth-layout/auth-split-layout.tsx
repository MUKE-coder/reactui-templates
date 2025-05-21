/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SVGAttributes } from "react";

import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

export default function AuthSplitLayout({
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
