import React from "react";
import type { DemoRegistry } from "./_stage";
import Checkout from "@/components/checkout/Checkout";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import ReviewSummary from "@/components/checkout/ReviewSummary";
import PaymentSuccess from "@/components/checkout/PaymentSuccess";

export const checkoutRegistry: DemoRegistry = {
  "checkout/Checkout": () => <Checkout />,
  "checkout/ShippingAddress": () => <ShippingAddress />,
  "checkout/PaymentMethods": () => <PaymentMethods />,
  "checkout/ReviewSummary": () => <ReviewSummary />,
  "checkout/PaymentSuccess": () => <PaymentSuccess />,
};
