import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "product/ProductCard", title: "Product Card", screenHeight: 320 },
  { id: "product/ProductCardList", title: "Product Card List", screenHeight: 180 },
  { id: "product/ProductGallery", title: "Product Gallery", screenHeight: 420 },
  { id: "product/AddToCartButton", title: "Add To Cart Button", screenHeight: 160 },
  { id: "product/ColorVariantSelector", title: "Color Variant Selector", screenHeight: 200 },
  { id: "product/ProductCardHorizontal", title: "Product Card Horizontal", screenHeight: 200 },
  { id: "product/SizeSelector", title: "Size Selector", screenHeight: 200 },
];

export default function ExpoProductPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">Product ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Product-focused React Native (Expo) components. Rendered live with
        react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="product"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
