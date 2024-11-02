"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselCards() {
  const articles = [
    {
      category: "NATURE",
      title: "Mountains at night: 12 best locations to enjoy the view",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Starry night over mountain peaks",
    },
    {
      category: "NATURE",
      title: "Aurora in Norway: when to visit for best experience",
      image:
        "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Northern lights over Norwegian landscape",
    },
    {
      category: "NATURE",
      title: "Hidden waterfalls: Nature's best kept secrets",
      image:
        "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Majestic waterfall in a lush forest",
    },
    {
      category: "NATURE",
      title: "Desert stargazing: Top spots for astronomy",
      image:
        "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Milky way over desert landscape",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {articles.map((article, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2"
            >
              <Card className="relative overflow-hidden h-[500px] border-0">
                <div className="absolute inset-0">
                  <img
                    src={article.image}
                    alt={article.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                </div>
                <CardContent className="relative h-full flex flex-col justify-between p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white/90">
                      {article.category}
                    </p>
                    <h2 className="text-3xl font-bold leading-tight text-white">
                      {article.title}
                    </h2>
                  </div>
                  <Button className="w-fit bg-white text-black hover:bg-white/90">
                    Read article
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/30 border-0" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/30 border-0" />
      </Carousel>
    </div>
  );
}
