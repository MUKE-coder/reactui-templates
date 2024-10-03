import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TemplateProps } from "./Templates";

export default function TemplateHorizontalCard({
  data,
}: {
  data: TemplateProps;
}) {
  // const price =data.price >0 ?
  return (
    <Link href="#" className="bg-white p-6 rounded-lg  pb-6 border block">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
          <p className="text-gray-600">{data.description}</p>
          <Button
            variant="default"
            className="bg-black text-white hover:bg-gray-800"
          >
            {data.price > 0 ? `Buy now $ ${data.price}` : "Free"}
          </Button>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.screenShots.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={image}
                alt={`Template preview ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
