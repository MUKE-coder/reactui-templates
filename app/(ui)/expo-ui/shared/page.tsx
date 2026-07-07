import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "shared/OTPInput", title: "OTP Input", screenHeight: 200 },
  { id: "shared/PriceDisplay", title: "Price Display", screenHeight: 140 },
  { id: "shared/RedHeader", title: "Red Header", screenHeight: 140 },
  { id: "shared/ScreenHeader", title: "Screen Header", screenHeight: 140 },
];

export default function ExpoSharedPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">Shared ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Shared React Native (Expo) components reused across screens. Rendered
        live with react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="shared"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
