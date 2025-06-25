"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Copy, Eye, Check } from "lucide-react";

// Zod schema for form validation
const freebieSchema = z.object({
  hero: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .min(5, "Title must be at least 5 characters"),
    subtitle: z
      .string()
      .min(1, "Subtitle is required")
      .min(10, "Subtitle must be at least 10 characters"),
    backgroundColor: z.string().min(1, "Background color is required"),
    backgroundType: z.enum(["solid", "gradient", "custom"]),
  }),
  benefits: z
    .array(z.object({ value: z.string() }))
    .min(1, "At least one benefit is required"),
  form: z.object({
    title: z.string().min(1, "Form title is required"),
    buttonText: z.string().min(1, "Button text is required"),
    disclaimer: z.string().optional(),
  }),
  topicsCovered: z.object({
    title: z.string().min(1, "Section title is required"),
    topics: z
      .array(z.object({ value: z.string() }))
      .min(1, "At least one topic is required"),
  }),
});

type FreebieFormData = z.infer<typeof freebieSchema>;

const SOLID_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
];

const GRADIENT_COLORS = [
  {
    name: "Blue Gradient",
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "Purple Gradient",
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    name: "Green Gradient",
    value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    name: "Orange Gradient",
    value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

export default function FormFive() {
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FreebieFormData>({
    resolver: zodResolver(freebieSchema),
    defaultValues: {
      hero: {
        title: "",
        subtitle: "",
        backgroundColor: "#3B82F6",
        backgroundType: "solid",
      },
      benefits: [{ value: "" }],
      form: {
        title: "",
        buttonText: "",
        disclaimer: "",
      },
      topicsCovered: {
        title: "",
        topics: [{ value: "" }],
      },
    },
  });

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  const {
    fields: topicFields,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({
    control,
    name: "topicsCovered.topics",
  });

  const watchedValues = watch();

  const handleColorSelect = (color: string, type: "solid" | "gradient") => {
    setValue("hero.backgroundColor", color);
    setValue("hero.backgroundType", type);
  };

  const generateCode = () => {
    const currentValues = watchedValues;
    const cleanedData = {
      hero: {
        title: currentValues.hero?.title || "",
        subtitle: currentValues.hero?.subtitle || "",
        backgroundColor: currentValues.hero?.backgroundColor || "#3B82F6",
      },
      benefits:
        currentValues.benefits?.map((b) => b.value).filter(Boolean) || [],
      form: currentValues.form || { title: "", buttonText: "", disclaimer: "" },
      topicsCovered: {
        title: currentValues.topicsCovered?.title || "",
        topics:
          currentValues.topicsCovered?.topics
            ?.map((t) => t.value)
            .filter(Boolean) || [],
      },
    };
    return `const freeBie = ${JSON.stringify(cleanedData, null, 2)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    alert("Code copied to clipboard!");
  };

  const onSubmit = (data: FreebieFormData) => {
    console.log("Form submitted:", data);
    alert("Form is valid! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Digital Download Creator
          </h1>
          <p className="text-gray-600">
            Create and configure your freebie content
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Hero Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Hero Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hero-title">Title *</Label>
                    <Input
                      id="hero-title"
                      {...register("hero.title")}
                      placeholder="The Complete Guide to..."
                    />
                    {errors.hero?.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.hero.title.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Subtitle *</Label>
                    <Textarea
                      id="hero-subtitle"
                      {...register("hero.subtitle")}
                      placeholder="This e-book will guide you through..."
                      rows={3}
                    />
                    {errors.hero?.subtitle && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.hero.subtitle.message}
                      </p>
                    )}
                  </div>

                  {/* Background Color Selector */}
                  <div>
                    <Label>Background Color</Label>

                    {/* Solid Colors */}
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">Solid Colors</p>
                      <div className="grid grid-cols-4 gap-2">
                        {SOLID_COLORS.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            onClick={() =>
                              handleColorSelect(color.value, "solid")
                            }
                            className="relative w-full h-12 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          >
                            {watchedValues.hero?.backgroundColor ===
                              color.value && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="w-5 h-5 text-white drop-shadow-lg" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Gradient Colors */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Gradient Colors
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {GRADIENT_COLORS.map((gradient) => (
                          <button
                            key={gradient.value}
                            type="button"
                            onClick={() =>
                              handleColorSelect(gradient.value, "gradient")
                            }
                            className="relative w-full h-12 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                            style={{ background: gradient.value }}
                            title={gradient.name}
                          >
                            {watchedValues.hero?.backgroundColor ===
                              gradient.value && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="w-5 h-5 text-white drop-shadow-lg" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Hex Input */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Custom Hex Color
                      </p>
                      <div className="flex gap-2">
                        <Input
                          {...register("hero.backgroundColor")}
                          placeholder="#3B82F6"
                          className="flex-1"
                          onChange={(e) => {
                            setValue("hero.backgroundColor", e.target.value);
                            setValue("hero.backgroundType", "custom");
                          }}
                        />
                        <div
                          className="w-12 h-10 rounded border-2 border-gray-200"
                          style={{
                            backgroundColor:
                              watchedValues.hero?.backgroundColor?.startsWith(
                                "#"
                              )
                                ? watchedValues.hero.backgroundColor
                                : "#3B82F6",
                          }}
                        />
                      </div>
                    </div>
                    {errors.hero?.backgroundColor && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.hero.backgroundColor.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benefitFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input
                        {...register(`benefits.${index}.value` as const)}
                        placeholder="Enter benefit..."
                        className="flex-1"
                      />
                      {benefitFields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeBenefit(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendBenefit({ value: "" })}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Benefit
                  </Button>
                  {errors.benefits && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.benefits.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Form Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Form Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="form-title">Form Title *</Label>
                    <Input
                      id="form-title"
                      {...register("form.title")}
                      placeholder="Download your free guide now"
                    />
                    {errors.form?.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.form.title.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="form-button">Button Text *</Label>
                    <Input
                      id="form-button"
                      {...register("form.buttonText")}
                      placeholder="Send the download to my email"
                    />
                    {errors.form?.buttonText && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.form.buttonText.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="form-disclaimer">Disclaimer</Label>
                    <Textarea
                      id="form-disclaimer"
                      {...register("form.disclaimer")}
                      placeholder="Your information is safe with us..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Topics Covered */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Topics Covered
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="topics-title">Section Title *</Label>
                    <Input
                      id="topics-title"
                      {...register("topicsCovered.title")}
                      placeholder="Topics Covered in the Guide"
                    />
                    {errors.topicsCovered?.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.topicsCovered.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Topics</Label>
                    {topicFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <Input
                          {...register(
                            `topicsCovered.topics.${index}.value` as const
                          )}
                          placeholder="Enter topic..."
                          className="flex-1"
                        />
                        {topicFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeTopic(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendTopic({ value: "" })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Topic
                    </Button>
                    {errors.topicsCovered?.topics && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.topicsCovered.topics.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Validate Form
              </Button>
            </div>

            {/* Preview/Output Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Generated Code</span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {showPreview ? "Hide" : "Show"} Preview
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-auto max-h-96">
                    <code>{generateCode()}</code>
                  </pre>
                </CardContent>
              </Card>

              {showPreview && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className="p-4 rounded-lg text-white"
                      style={{
                        background:
                          watchedValues.hero?.backgroundColor || "#3B82F6",
                      }}
                    >
                      <h3 className="font-bold text-lg">
                        {watchedValues.hero?.title || "Hero Title"}
                      </h3>
                      <p className="text-white/90 mt-2">
                        {watchedValues.hero?.subtitle || "Hero subtitle"}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {watchedValues.benefits
                          ?.map((b) => b.value)
                          .filter((b) => b?.trim())
                          .map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              {benefit}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Form:</h4>
                      <p>
                        <strong>Title:</strong> {watchedValues.form?.title}
                      </p>
                      <p>
                        <strong>Button:</strong>{" "}
                        {watchedValues.form?.buttonText}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">
                        {watchedValues.topicsCovered?.title || "Topics"}:
                      </h4>
                      <ul className="space-y-1">
                        {watchedValues.topicsCovered?.topics
                          ?.map((t) => t.value)
                          .filter((t) => t?.trim())
                          .map((topic, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              {topic}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
