import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string }[] = [
  { id: "checkout/Checkout", title: "Checkout" },
  { id: "checkout/ShippingAddress", title: "Shipping Address" },
  { id: "checkout/PaymentMethods", title: "Payment Methods" },
  { id: "checkout/ReviewSummary", title: "Review Summary" },
  { id: "checkout/PaymentSuccess", title: "Payment Success" },
];

export default function ExpoUiCheckoutPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        Checkout ({components.length})
      </h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        The full checkout flow — shipping address, payment methods, order review
        and success. Rendered live; copy the real source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="checkout"
          />
        ))}
      </div>
    </div>
  );
}
