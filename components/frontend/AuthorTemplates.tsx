"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Twitter } from "lucide-react";
import TemplateList from "./TemplateList";
import { TemplateProps } from "./Templates";

interface Template {
  name: string;
  price: string;
  imageUrl: string;
}

interface ProfileProps {
  name: string;
  description: string;
  avatarUrl: string;
  twitterHandle: string;
  templateCount: number;
  templates: Template[];
}

const TemplateCard: React.FC<Template> = ({ name, price, imageUrl }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-0">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{price}</p>
      </div>
    </CardContent>
  </Card>
);

const sampleData: ProfileProps = {
  name: "Andrea Montini",
  description:
    "Digital products for innovative tech companies to fuel the vision and amplify their impact.",
  avatarUrl: "/api/placeholder/100/100", // Placeholder image
  twitterHandle: "AndreaMontini",
  templateCount: 7,
  templates: [
    { name: "Duality", price: "Free", imageUrl: "/1.png" },
    { name: "Rocketsales", price: "Free", imageUrl: "/2.png" },
    { name: "Hirevision", price: "Free", imageUrl: "/3.png" },
    // Add more sample templates as needed
  ],
};

export default function AuthorTemplates({
  templates,
}: {
  templates: TemplateProps[];
}) {
  const { name, description, avatarUrl, twitterHandle, templateCount } =
    sampleData;

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-400">{description}</p>
            <div className="flex items-center mt-2">
              <Twitter size={16} className="mr-2" />
              <span className="text-blue-400">@{twitterHandle}</span>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div> */}
        <TemplateList templates={templates} title="Templates" />
      </div>
    </div>
  );
}
