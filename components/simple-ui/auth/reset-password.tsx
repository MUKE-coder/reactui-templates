// ResetPasswordPage.tsx
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthLayout from "../auth-layout/AuthLayout";

// Define validation schema with Zod
const resetPasswordSchema = z
  .object({
    token: z.string(),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

// Infer type from schema
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordProps {
  token?: string;
  email?: string;
}

export default function ResetPasswordPage({
  token,
  email,
}: ResetPasswordProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
      email: email,
      password: "",
      password_confirmation: "",
    },
  });

  // Form submission handler
  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    setIsLoading(true);

    try {
      // Replace with your Next.js API endpoint
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Redirect to login page after successful password reset
        router.push("/login?reset=1");
      } else {
        // Handle error response
        const errorData = await response.json();

        // Set form errors based on server response
        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([key, value]) => {
            if (key in form.formState.errors) {
              // @ts-ignore - dynamic key access
              form.setError(key as keyof ResetPasswordFormValues, {
                message: Array.isArray(value) ? value[0] : (value as string),
              });
            }
          });
        }
      }
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset password"
      description="Please enter your new password below"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* Email Field - Read Only */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    readOnly
                    className="mt-1 block w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    autoFocus
                    placeholder="Password"
                    className="mt-1 block w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password_confirmation">
                  Confirm password
                </FormLabel>
                <FormControl>
                  <Input
                    id="password_confirmation"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    className="mt-1 block w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hidden token field */}
          <input type="hidden" {...form.register("token")} />

          {/* Submit Button */}
          <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset password
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
