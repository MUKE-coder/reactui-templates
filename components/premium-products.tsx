"use client";
import type { JSX } from "react";

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
import { ExternalLink, ShoppingCart, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  buyLink?: string;
  detailLink?: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Enterprise Inventory Management System",
    description:
      "Complete Zoho Inventory alternative with advanced stock tracking, order management, and customizable reporting.",
    price: 100,
    image: "/products/inventory.webp",
    category: "System",
    buyLink: "https://gmukejohnbaptist.gumroad.com/l/nvbpik?wanted=true",
    detailLink: "https://gmukejohnbaptist.gumroad.com/l/nvbpik",
    featured: true,
  },
  {
    id: 2,
    title: "Next.js Enterprise Starter Kit with Role-Based Access",
    description:
      "Production-ready SaaS foundation with authentication, roles, permissions, and Stripe integration for instant deployment.",
    price: 100,
    image: "/products/starter-kit-advanced.webp",
    buyLink:
      "https://gmukejohnbaptist.gumroad.com/l/hubstack-simple-auth?wanted=true",
    detailLink: "https://gmukejohnbaptist.gumroad.com/l/hubstack-simple-auth",
    category: "Framework",
    featured: true,
  },
  {
    id: 3,
    title: "Build SaaS Products with Next.js: Complete Course",
    description:
      "Step-by-step video course covering frontend, backend, authentication, payments, and deployment for modern SaaS applications.",
    price: 100,
    image: "/products/nextjscourse.jpg",
    buyLink: "https://gmukejohnbaptist.gumroad.com/l/nextjs-course?wanted=true",
    detailLink: "https://codingschool.desishub.com/courses/next",
    category: "Course",
    featured: false,
  },
  {
    id: 4,
    title: "Advanced Multi-vendor E-commerce Platform",
    description:
      "Scalable marketplace solution with separate vendor, admin, and customer dashboards for a complete e-commerce ecosystem.",
    price: 100,
    image: "/products/multi-vendor.jpg",
    category: "Platform",
    buyLink: "https://desishub.gumroad.com/l/kartify?wanted=true",
    detailLink:
      "https://codemint-gamma.vercel.app/resources/cm92i4zur0007vpf8sxm8fzhd",
    featured: true,
  },
  {
    id: 5,
    title: "School Management System Development Course",
    description:
      "Comprehensive tutorial for building educational platforms with Next.js and Node.js including student, teacher, and admin modules.",
    price: 250,
    image: "/products/school-pro.webp",
    buyLink:
      "https://gmukejohnbaptist.gumroad.com/l/school-mgt-course?wanted=true",
    detailLink: "https://gmukejohnbaptist.gumroad.com/l/school-mgt-course",
    category: "Course",
    featured: false,
  },
  {
    id: 6,
    title: "Next.js SaaS Starter Kit with Landing Page",
    description:
      "Essential SaaS foundation with authentication, Stripe integration, and conversion-optimized landing page templates.",
    price: 69,
    image: "/products/starter-kit-simple.webp",
    buyLink:
      "https://gmukejohnbaptist.gumroad.com/l/hubstack-simple-auth?wanted=true",
    detailLink: "https://gmukejohnbaptist.gumroad.com/l/hubstack-simple-auth",
    category: "Framework",
    featured: true,
  },
];

export default function DigitalProducts(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories: string[] = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts: Product[] = products.filter((product) => {
    const matchesSearch: boolean =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory: boolean =
      categoryFilter === "All" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Premium Digital Products
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional tools and resources to accelerate your development
          workflow and build exceptional applications.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="max-w-md"
        />

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              className="cursor-pointer text-sm px-4 py-2"
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {product.featured && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1">
                  Featured
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-gray-800 line-clamp-3">
                  {product.title}
                </CardTitle>
                <span className="text-lg font-bold text-blue-600">
                  ${product.price}
                </span>
              </div>
              <Badge variant="outline" className="w-fit mt-1">
                {product.category}
              </Badge>
            </CardHeader>

            <CardContent className="flex-grow">
              <CardDescription className="text-gray-600">
                {product.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 pb-4">
              <Button
                asChild
                variant="outline"
                className="flex-1 flex items-center justify-center"
              >
                <a href={product.detailLink ?? "#"}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </a>
              </Button>
              <Button
                asChild
                className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700"
              >
                <a href={product.buyLink ?? "#"}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Now
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
