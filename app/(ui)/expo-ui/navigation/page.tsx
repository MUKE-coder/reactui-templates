import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "navigation/FilterSortBar", title: "Filter Sort Bar", screenHeight: 140 },
  { id: "navigation/ProductHeader", title: "Product Header", screenHeight: 140 },
  { id: "navigation/FilterSheet", title: "Filter Sheet", screenHeight: 520 },
];

export default function ExpoUiNavigationPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">Navigation ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        React Native (Expo) navigation and browsing components. Rendered live with
        react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="navigation"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
