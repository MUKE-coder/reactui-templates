import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "order/OrderCard", title: "Order Card", screenHeight: 320 },
  { id: "order/OrderTimeline", title: "Order Timeline", screenHeight: 360 },
];

export default function ExpoUiOrderPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">Orders ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Order-related React Native (Expo) components. Rendered live with
        react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="order"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
