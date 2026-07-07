"use client";
import dynamic from "next/dynamic";
import React from "react";
import LoaderAnimation from "../public/loader.json";

// lottie-react pulls in lottie-web which references `document` at import, so it
// must not be evaluated during SSR.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[200px] ">
          <Lottie animationData={LoaderAnimation} />
        </div>
        <div className="pt-4">
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    </div>
  );
}
