"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingV2() {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-green-50/50 to-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 mb-8">
          <div className="inline-flex">
            <Button variant="outline" className="rounded-full text-sm">
              <span className="mr-2">✏️</span> How it works?
            </Button>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Budget-friendly pricing alternatives
          </h2>
          <p className="text-gray-500 md:text-lg">
            Affordability is a core value at AlignUI Design System.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <Card className="relative border-2">
            <div className="absolute -top-3 left-4">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-emerald-500 rounded-full">
                MOST POPULAR
              </span>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-500 mb-4">
                    STANDARD
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$119</span>
                    <span className="text-4xl font-bold text-gray-400">
                      .99
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    For individual designers.
                  </p>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white w-fit">
                  Buy now
                </Button>
                <ul className="grid gap-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>One-user only license</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Sector-specific Products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Unique Widgets & Dashboards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>5900+ Components</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>1200+ Asset Collection</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-500 mb-4">
                    TEAM
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$349</span>
                    <span className="text-4xl font-bold text-gray-400">
                      .99
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    For team of 5 designers.
                  </p>
                </div>
                <Button variant="outline" className="w-fit">
                  Buy now
                </Button>
                <ul className="grid gap-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>From 2 to 5 users license</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Sector-specific Products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Unique Widgets & Dashboards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>5900+ Components</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>1200+ Asset Collection</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-full">
                Contact Us →
              </Button>
              <span className="text-gray-500">
                For enterprise-level purchases
              </span>
            </div>
            <div className="text-gray-500">
              <span className="text-sm">Top-tier design quality ✓</span>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-500 text-center">
            We value Purchasing Power Parity (PPP) and offer discount codes. To
            prove your eligibility, please send your student ID, driver's
            license, or similar documentation. You can contact us on our Contact
            page.
          </p>
        </div>
      </div>
    </section>
  );
}
