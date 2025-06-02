"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Star,
  Package,
  Tag,
  DollarSign,
  Image,
  Info,
  FileText,
  ShoppingBag,
  ChevronDown,
  X,
  Check,
} from "lucide-react";

// Types
interface ProductFormData {
  name: string;
  originalPrice: string;
  discountPrice: string;
  description: string;
  image: string;
  category: string;
  rating: string;
  isNew: boolean;
  stock: string;
}

interface FormattedProductData {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number | null;
  description: string;
  image: string;
  category: string;
  rating: number;
  isNew: boolean;
  stock: number;
  discountPercentage: number;
}

// Constants
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

const FormFour: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      originalPrice: "",
      discountPrice: "",
      description: "",
      image: "",
      category: "",
      rating: "5",
      isNew: false,
      stock: "",
    },
  });

  const watchedOriginalPrice: string = watch("originalPrice");
  const watchedDiscountPrice: string = watch("discountPrice");
  const watchedDescription: string = watch("description");

  const calculateDiscountPercentage = (): number => {
    const original = parseFloat(watchedOriginalPrice);
    const discount = parseFloat(watchedDiscountPrice);

    if (!discount || !original || discount >= original) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  const onSubmit: SubmitHandler<ProductFormData> = (
    data: ProductFormData
  ): void => {
    const formattedData: FormattedProductData = {
      ...data,
      originalPrice: parseFloat(data.originalPrice),
      discountPrice: data.discountPrice ? parseFloat(data.discountPrice) : null,
      rating: parseFloat(data.rating),
      stock: parseInt(data.stock),
      discountPercentage: calculateDiscountPercentage(),
      id: Math.random().toString(36).substr(2, 9),
    };

    console.log("Product Data:", formattedData);
    alert("Product created successfully! Check the console for details.");
  };

  const onDiscard = (): void => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Single Card Container */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-indigo-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Create New Product
                  </h1>
                  <p className="text-sm text-gray-600">
                    Add a new product to your inventory
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onDiscard}
                  className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  <X className="h-4 w-4" />
                  Discard
                </button>
                <button
                  type="submit"
                  form="product-form"
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Check className="h-4 w-4" />
                  Create
                </button>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <form
              id="product-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* Basic Information Section */}
              <div className="border-b border-gray-100 pb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-gray-600" />
                  <h2 className="text-base font-semibold text-gray-900">
                    Basic Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  {/* Product Name */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Product Name *
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("name", {
                          required: "Product name is required",
                          minLength: {
                            value: 1,
                            message: "Name must be at least 1 character",
                          },
                          maxLength: {
                            value: 100,
                            message: "Name must be less than 100 characters",
                          },
                        })}
                        type="text"
                        className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        placeholder="Enter product name..."
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Category *
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        {...register("category", {
                          required: "Please select a category",
                        })}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      >
                        <option value="">Select category</option>
                        {categories.map((category: string) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        aria-hidden="true"
                      />
                    </div>
                    {errors.category && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  {/* Image URL */}
                  <div className="col-span-full">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-1">
                        <Image className="h-4 w-4" />
                        Image URL *
                      </div>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("image", {
                          required: "Image URL is required",
                          pattern: {
                            value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                            message: "Please enter a valid image URL",
                          },
                        })}
                        type="url"
                        className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        placeholder="https://example.com/image.jpg"
                      />
                      {errors.image && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.image.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="border-b border-gray-100 pb-8">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <h2 className="text-base font-semibold text-gray-900">
                    Pricing & Discounts
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  {/* Original Price */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="originalPrice"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Original Price * ($)
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("originalPrice", {
                          required: "Original price is required",
                          min: {
                            value: 0.01,
                            message: "Price must be greater than 0",
                          },
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Please enter a valid price",
                          },
                        })}
                        type="number"
                        step="0.01"
                        className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        placeholder="0.00"
                      />
                      {errors.originalPrice && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.originalPrice.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Discount Price */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="discountPrice"
                      className="block text-sm font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        Discount Price ($)
                      </div>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("discountPrice", {
                          min: {
                            value: 0,
                            message: "Discount price must be 0 or greater",
                          },
                          validate: (value: string) => {
                            if (
                              value &&
                              parseFloat(value) >=
                                parseFloat(watchedOriginalPrice)
                            ) {
                              return "Discount price must be less than original price";
                            }
                            return true;
                          },
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Please enter a valid price",
                          },
                        })}
                        type="number"
                        step="0.01"
                        className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        placeholder="0.00 (optional)"
                      />
                      {errors.discountPrice && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.discountPrice.message}
                        </p>
                      )}
                      {watchedDiscountPrice &&
                        watchedOriginalPrice &&
                        calculateDiscountPercentage() > 0 && (
                          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                            <div className="text-sm text-green-700 font-medium flex items-center gap-2">
                              <Tag className="h-4 w-4" />
                              {calculateDiscountPercentage()}% discount applied
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              Savings: $
                              {(
                                parseFloat(watchedOriginalPrice) -
                                parseFloat(watchedDiscountPrice)
                              ).toFixed(2)}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <h2 className="text-base font-semibold text-gray-900">
                    Product Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  {/* Description */}
                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Product Description *
                    </label>
                    <div className="mt-2">
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                          minLength: {
                            value: 10,
                            message:
                              "Description must be at least 10 characters",
                          },
                          maxLength: {
                            value: 500,
                            message:
                              "Description must be less than 500 characters",
                          },
                        })}
                        rows={4}
                        className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 resize-none"
                        placeholder="Describe your product features, benefits, and what makes it special..."
                      />
                      {errors.description && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.description.message}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-600">
                        {watchedDescription?.length || 0}/500 characters
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        Rating *
                      </div>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("rating", {
                          required: "Rating is required",
                          min: {
                            value: 1,
                            message: "Rating must be at least 1",
                          },
                          max: {
                            value: 5,
                            message: "Rating must be at most 5",
                          },
                        })}
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                      {errors.rating && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.rating.message}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-600">
                        Rate from 1.0 to 5.0 stars
                      </p>
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="h-4 w-4" />
                        Stock Quantity *
                      </div>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("stock", {
                          required: "Stock quantity is required",
                          min: {
                            value: 0,
                            message: "Stock must be 0 or greater",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "Stock must be a whole number",
                          },
                        })}
                        type="number"
                        min="0"
                        className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                      {errors.stock && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.stock.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* New Product Toggle */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="isNew"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Product Status
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                        <input
                          {...register("isNew")}
                          type="checkbox"
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-0"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900">
                            Mark as New
                          </span>
                          <p className="text-xs text-gray-500">
                            Add "NEW" badge
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFour;
