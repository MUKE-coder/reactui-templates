"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

// Content configuration object
const pageContent = {
  hero: {
    title: "The Complete Guide to Mental Health Billing Automation",
    subtitle:
      "This e-book will guide you through automating your billing process with TheraNest.",
    backgroundColor: "#2563eb", // Hex color instead of Tailwind classes
    previewImage: "/images/guide-preview.png", // Added to pageContent
  },
  benefits: [
    "Optimize time management",
    "Develop practical skills",
    "Reduce errors and improve revenue cycle",
  ],
  form: {
    title: "Download your free guide now",
    buttonText: "Send the download to my email",
    disclaimer:
      "Your information is safe with us, we hate spam just as much as you!",
  },
  topicsCovered: {
    title: "Topics Covered in the Guide",
    topics: [
      "Time management techniques for BCBAs",
      "Delegating tasks to maximize efficiency",
      "Streamlining administrative work",
      "Maximizing profitability through time optimization",
      "Balancing client care and business operations",
      "Using behavioral analysis skills for time management",
      "Improving workflow efficiency",
      "Creating sustainable work-life balance",
    ],
  },
};

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function FreebieLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      setSubmitSuccess(true);
      reset(); // Reset form after successful submission

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${pageContent.hero.backgroundColor}, ${pageContent.hero.backgroundColor}dd)`,
      }}
    >
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-white space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {pageContent.hero.title}
              </h1>
              <p className="text-lg text-white/90">
                {pageContent.hero.subtitle}
              </p>
            </div>

            {/* Guide Preview Image */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform rotate-3">
                <img
                  src={pageContent.hero.previewImage || "/placeholder.svg"}
                  alt="Guide Preview"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <p className="text-lg font-medium">You can use this e-book to:</p>
              <div className="space-y-3">
                {pageContent.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-800" />
                    </div>
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 text-center">
                    {pageContent.form.title}
                  </h2>

                  {submitSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <p className="text-green-800 font-medium">
                        Thank you! Your download link has been sent to your
                        email.
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="mt-1"
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1"
                        placeholder="Enter your email address"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 text-base font-medium"
                  >
                    {isSubmitting ? "Sending..." : pageContent.form.buttonText}
                  </Button>

                  <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                    <span className="text-gray-400">🔒</span>
                    {pageContent.form.disclaimer}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Topics Covered Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {pageContent.topicsCovered.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pageContent.topicsCovered.topics.map((topic, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-green-800" />
                </div>
                <span className="text-gray-700">{topic}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium">
              Download free guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
