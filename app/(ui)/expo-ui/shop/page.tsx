import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string }[] = [
  { id: "shop/Home", title: "Home Feed" },
  { id: "shop/ProductDetail", title: "Product Detail" },
  { id: "shop/Cart", title: "Cart" },
  { id: "shop/Wishlist", title: "Wishlist" },
  { id: "shop/Search", title: "Search" },
];

export default function ExpoUiShopPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        Shop Screens ({components.length})
      </h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Complete storefront screens — home feed, product detail, cart, wishlist
        and search — wired to live data. Rendered live; copy the real source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="shop"
          />
        ))}
      </div>
    </div>
  );
}
