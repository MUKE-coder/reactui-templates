import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "cart/CartItem", title: "Cart Item", screenHeight: 200 },
  { id: "cart/RemoveCartModal", title: "Remove Cart Modal", screenHeight: 420 },
];

export default function ExpoUiCartPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">Cart ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Shopping cart React Native (Expo) components. Rendered live with
        react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="cart"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
