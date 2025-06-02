"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Star,
  Package,
  Tag,
  DollarSign,
  Image,
  Sparkles,
  FileText,
  Info,
  ShoppingBag,
  BarChart3,
} from "lucide-react";

// Zod schema for product validation
const productSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(100, "Name must be less than 100 characters"),
    originalPrice: z
      .number()
      .min(0.01, "Original price must be greater than 0"),
    discountPrice: z
      .number()
      .min(0, "Discount price must be 0 or greater")
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be less than 500 characters"),
    image: z.string().url("Please enter a valid image URL"),
    category: z.string().min(1, "Please select a category"),
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    isNew: z.boolean(),
    stock: z
      .number()
      .min(0, "Stock must be 0 or greater")
      .int("Stock must be a whole number"),
  })
  .refine(
    (data) => {
      if (data.discountPrice && data.discountPrice >= data.originalPrice) {
        return false;
      }
      return true;
    },
    {
      message: "Discount price must be less than original price",
      path: ["discountPrice"],
    }
  );

type ProductFormData = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  isNew: boolean;
  stock: number;
}

const categories: string[] = [
  "Accessories",
  "Clothing",
  "Electronics",
  "Home & Garden",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Books & Media",
  "Toys & Games",
];

export default function FormThree() {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      originalPrice: 0,
      discountPrice: undefined,
      description: "",
      image: "",
      category: "",
      rating: 5,
      isNew: false,
      stock: 0,
    },
  });

  const watchedOriginalPrice: number = form.watch("originalPrice");
  const watchedDiscountPrice: number | undefined = form.watch("discountPrice");

  const calculateDiscountPercentage = (
    original: number,
    discount: number | undefined
  ): number => {
    if (!discount || discount >= original) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  const onSubmit: SubmitHandler<ProductFormData> = (data: ProductFormData) => {
    const discountPercentage = data.discountPrice
      ? calculateDiscountPercentage(data.originalPrice, data.discountPrice)
      : 0;

    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      originalPrice: data.originalPrice,
      discountPrice: data.discountPrice || data.originalPrice,
      discountPercentage,
      description: data.description,
      image: data.image,
      category: data.category,
      rating: data.rating,
      isNew: data.isNew,
      stock: data.stock,
    };

    console.log(product);
    alert("Product created successfully! Check the console for details.");
  };

  const onCancel = (): void => {
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Create New Product
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Build your product listing by filling out the organized sections
            below. Each card focuses on a specific aspect of your product.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Info className="h-5 w-5 text-gray-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Essential details about your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Product Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product name..."
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Category *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
                          <Image className="h-4 w-4" />
                          Image URL *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Pricing Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                    Pricing & Discounts
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Set your product pricing strategy
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Original Price *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discountPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          Discount Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00 (optional)"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        {watchedDiscountPrice && watchedOriginalPrice && (
                          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="text-sm text-green-700 font-medium flex items-center gap-2">
                              <Tag className="h-4 w-4" />
                              {calculateDiscountPercentage(
                                watchedOriginalPrice,
                                watchedDiscountPrice
                              )}
                              % discount applied
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              Savings: $
                              {(
                                watchedOriginalPrice - watchedDiscountPrice
                              ).toFixed(2)}
                            </div>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Description Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white lg:col-span-2">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <FileText className="h-5 w-5 text-gray-600" />
                    Product Description
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Describe your product in detail to attract customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Description *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product features, benefits, and what makes it special..."
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="flex justify-between items-center">
                          <span className="text-gray-500">
                            Write a compelling description that highlights your
                            product's key features
                          </span>
                          <span className="font-medium text-blue-600">
                            {field.value?.length || 0}/500 characters
                          </span>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Rating & Quality Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Star className="h-5 w-5 text-gray-600" />
                    Rating & Quality
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Set quality indicators for your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Product Rating *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 5)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Rate from 1.0 to 5.0 stars
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isNew"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Product Status
                        </FormLabel>
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="flex-1">
                            <Label className="text-sm font-medium text-gray-700">
                              {field.value ? "New Product" : "Regular Product"}
                            </Label>
                            <p className="text-xs text-gray-500">
                              {field.value
                                ? "This product will be marked as 'NEW'"
                                : "This product will appear as regular inventory"}
                            </p>
                          </div>
                          {field.value && (
                            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              NEW
                            </div>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Inventory & Stock Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <ShoppingBag className="h-5 w-5 text-gray-600" />
                    Inventory Management
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage your product stock levels
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Stock Quantity *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the number of units available
                        </FormDescription>
                        <FormMessage />

                        {/* Stock Status Indicator */}
                        {field.value !== undefined && field.value >= 0 && (
                          <div className="mt-3 p-3 rounded-lg border">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              <span className="font-medium text-sm">
                                Stock Status:
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  field.value === 0
                                    ? "bg-red-100 text-red-700"
                                    : field.value < 10
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {field.value === 0
                                  ? "Out of Stock"
                                  : field.value < 10
                                  ? "Low Stock"
                                  : "In Stock"}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {field.value === 0
                                ? "Product is currently unavailable"
                                : field.value < 10
                                ? "Consider restocking soon"
                                : `${field.value} units available`}
                            </p>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons Card */}
            <Card className="shadow-lg border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Create Product
                  </Button>

                  <Button
                    type="button"
                    onClick={onCancel}
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Cancel & Reset
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    All fields marked with * are required
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
