import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "ui/Button", title: "Button", screenHeight: 320 },
  { id: "ui/Input", title: "Input", screenHeight: 340 },
  { id: "ui/CurrencyInput", title: "Currency Input", screenHeight: 200 },
  { id: "ui/SearchableSelect", title: "Searchable Select", screenHeight: 260 },
  { id: "ui/BottomSheet", title: "Bottom Sheet", screenHeight: 360 },
  { id: "ui/Badge", title: "Badge", screenHeight: 160 },
  { id: "ui/Avatar", title: "Avatar", screenHeight: 200 },
  { id: "ui/CustomRadio", title: "Custom Radio", screenHeight: 260 },
  { id: "ui/Rating", title: "Rating", screenHeight: 180 },
  { id: "ui/Card", title: "Card", screenHeight: 180 },
  { id: "ui/Divider", title: "Divider", screenHeight: 220 },
  { id: "ui/EmptyState", title: "Empty State", screenHeight: 380 },
  { id: "ui/LoadingSpinner", title: "Loading Spinner", screenHeight: 220 },
  { id: "ui/SkeletonCard", title: "Skeleton Card", screenHeight: 280 },
  { id: "ui/CountdownTimer", title: "Countdown Timer", screenHeight: 180 },
  { id: "ui/Toast", title: "Toast", screenHeight: 200 },
];

export default function ExpoUiPrimitivesPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">UI Primitives ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Core React Native (Expo) building blocks. Rendered live with
        react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="ui"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
