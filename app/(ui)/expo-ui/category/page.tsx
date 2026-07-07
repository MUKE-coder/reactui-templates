import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "category/SubcategoryGrid", title: "Subcategory Grid", screenHeight: 420 },
  { id: "category/SidebarMenu", title: "Sidebar Menu", screenHeight: 460 },
];

export default function ExpoUiCategoryPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">Category ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Category browsing patterns for React Native (Expo). Rendered live with
        react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="category"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
