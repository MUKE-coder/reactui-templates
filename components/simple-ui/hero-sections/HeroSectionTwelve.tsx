import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const features = [
  "Easy appointment scheduling",
  "Secure patient records",
  "Telemedicine capabilities",
  "Streamlined billing",
];
export default function HeroSectionTwelve() {
  return (
    <section
      className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/doctor.webp')" }}
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-2xl space-y-8">
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
            Build a thriving{" "}
            <span className="text-blue-300 font-semibold">direct-pay</span>{" "}
            practice with Medical App.
          </h2>
          <p className="text-lg text-blue-100">
            Welcome to Medical App, where connecting with patients is made
            easier than ever before. Our platform streamlines the process of
            managing appointments, providing care remotely, and keeping track of
            patient records.
          </p>
          <CustomButton
            title="List your Service"
            href="#"
            className="bg-white text-blue-900 hover:bg-blue-100 transition-colors duration-200"
          />
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <p key={i} className="flex items-center text-blue-100">
                <Check className="w-5 h-5 mr-2 flex-shrink-0 text-blue-300" />
                {feature}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CustomButtonProps = {
  title: string;
  icon?: any;
  href?: string;
  className?: string;
};

function CustomButton({ title, icon, href, className }: CustomButtonProps) {
  const Icon = icon;
  return (
    <>
      {href ? (
        <Button asChild className={className}>
          <Link href={href} className="flex items-center">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {title}
          </Link>
        </Button>
      ) : (
        <Button className={className}>
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {title}
        </Button>
      )}
    </>
  );
}
