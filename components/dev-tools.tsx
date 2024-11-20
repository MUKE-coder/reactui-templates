"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const libraries = [
  {
    name: "UIVerse ",
    description: "The Largest Library of Open-Source UI",
    url: "https://uiverse.io/",
  },
  {
    name: "Mocky",
    description:
      "Don't wait for the backend to be ready, generate custom API responses with Mocky and start working on your application straightaway",
    url: "https://designer.mocky.io/",
  },
  {
    name: "Readme.so",
    description:
      "Our simple editor allows you to quickly add and customize all the sections you need for your project's readme",
    url: "https://readme.so/editor",
  },
  {
    name: "Ray.so",
    description: "Beautiful Code snippets",
    url: "https://ray.so/",
  },
  {
    name: "Devdocs",
    description: "All docs .",
    url: "https://devdocs.io/",
  },
  {
    name: "Mantine",
    description:
      "A fully featured React component library with 100+ customizable components and hooks.",
    url: "https://mantine.dev/",
  },
];

export default function DevTools() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLibraries = libraries.filter(
    (library) =>
      library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      library.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Cool Component Libraries Showcase
      </h1>
      <Input
        type="text"
        placeholder="Search libraries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLibraries.map((library) => (
          <Card key={library.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{library.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{library.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a
                  href={library.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
