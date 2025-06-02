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

import { Star, Package, Tag, DollarSign, Image, Sparkles } from "lucide-react";

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

export default function FormOne() {
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
    // setGeneratedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Product Creator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Create beautiful product listings with professional validation
          </p>
        </div>

        <div className="grid max-w-2xl mx-auto gap-8">
          {/* Form Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 py-3 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 ">
                <Sparkles className="h-5 w-5" />
                Product Details
              </CardTitle>
              <CardDescription className="text-blue-100">
                Fill in the information below to create your product
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Product Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Product Name
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

                  {/* Pricing Section */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            Original Price
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
                            <div className="text-sm text-green-600 font-medium">
                              {calculateDiscountPercentage(
                                watchedOriginalPrice,
                                watchedDiscountPrice
                              )}
                              % discount
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product..."
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/500 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image URL */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
                          <Image className="h-4 w-4" />
                          Image URL
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

                  {/* Category and Rating */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">
                            Category
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
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            Rating
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Stock and New Badge */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">
                            Stock Quantity
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isNew"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel className="text-gray-700 font-semibold">
                            New Product
                          </FormLabel>
                          <div className="flex items-center space-x-2 h-10">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <Label className="text-sm text-gray-600">
                              {field.value ? "Yes" : "No"}
                            </Label>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Create Product
                    </Button>

                    <Button
                      type="button"
                      onClick={onCancel}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
