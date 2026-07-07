import React from "react";
import type { DemoRegistry } from "./_stage";
import Onboarding from "@/components/auth/Onboarding";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import VerifyOtp from "@/components/auth/VerifyOtp";
import ForgotPassword from "@/components/auth/ForgotPassword";
import NewPassword from "@/components/auth/NewPassword";

// Full-screen auth flows render themselves (SafeAreaView flex-1) — no Stage.
export const authRegistry: DemoRegistry = {
  "auth/Onboarding": () => <Onboarding />,
  "auth/Login": () => <Login />,
  "auth/Register": () => <Register />,
  "auth/VerifyOtp": () => <VerifyOtp />,
  "auth/ForgotPassword": () => <ForgotPassword />,
  "auth/NewPassword": () => <NewPassword />,
};
