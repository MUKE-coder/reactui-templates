// VerifyEmailPage.tsx
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import AuthLayout from "../auth-layout/AuthLayout";

// Empty form type since we don't need any fields
type VerifyEmailFormValues = Record<string, never>;

interface VerifyEmailProps {
  status?: string;
}

export default function VerifyEmailPage({ status }: VerifyEmailProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(
    status === "verification-link-sent"
      ? "A new verification link has been sent to the email address you provided during registration."
      : null
  );

  // Initialize an empty form
  const { handleSubmit } = useForm<VerifyEmailFormValues>();

  // Form submission handler to resend verification email
  const onSubmit: SubmitHandler<VerifyEmailFormValues> = async () => {
    setIsLoading(true);

    try {
      // Replace with your Next.js API endpoint
      const response = await fetch("/api/auth/verification/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setResendStatus(
          "A new verification link has been sent to the email address you provided during registration."
        );
      } else {
        setResendStatus(
          "There was a problem sending the verification email. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      setResendStatus("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for logout
  const handleLogout = async () => {
    try {
      // Replace with your Next.js API endpoint for logout
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to login page after logout
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthLayout
      title="Verify email"
      description="Please verify your email address by clicking on the link we just emailed to you."
    >
      {resendStatus && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {resendStatus}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-center">
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Resend verification email
        </Button>

        <TextLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
          className="mx-auto block text-sm"
        >
          Log out
        </TextLink>
      </form>
    </AuthLayout>
  );
}

// TextLink component
function TextLink({
  className = "",
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Link> & {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      className={cn(
        "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current dark:decoration-neutral-500",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}
