"use client";

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

export default function CardCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Modern house with large windows and a pool",
    },
    {
      src: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Cozy cabin in the woods",
    },
    {
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Luxurious beachfront property",
    },
    {
      src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Charming countryside cottage",
    },
  ];

  return (
    <Card className="w-full max-w-xl bg-zinc-900 text-zinc-100">
      <CardContent className="p-0">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[4/3]">
                  <img
                    alt={image.alt}
                    className="object-cover w-full h-full rounded-t-lg"
                    src={image.src}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 text-slate-900" />
          <CarouselNext className="right-2 text-slate-900" />
        </Carousel>
        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-4 pb-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index + 1 === current ? "bg-blue-600 w-6" : "bg-zinc-600"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
      <div className="p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Forde, Norway</h2>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span>4.78</span>
            </div>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <p className="text-zinc-400">
            Relax, rejuvenate and unplug in this unique contemporary Birdbox.
            Feel close to nature in ultimate comfort. Enjoy the view of the epic
            mountain range of Blegja and the Førdefjord.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">397$</span>
              <span className="text-zinc-400">/ night</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Book now</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
