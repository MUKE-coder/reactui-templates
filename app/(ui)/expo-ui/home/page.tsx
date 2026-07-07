import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "home/PromoBanner", title: "Promo Banner", screenHeight: 220 },
  { id: "home/FlashSaleTimer", title: "Flash Sale Timer", screenHeight: 160 },
  { id: "home/CategoryIcon", title: "Category Icon", screenHeight: 160 },
  { id: "home/SectionHeader", title: "Section Header", screenHeight: 140 },
  { id: "home/CouponCard", title: "Coupon Card", screenHeight: 180 },
  { id: "home/HeroBanner", title: "Hero Banner", screenHeight: 240 },
  { id: "home/CategoryCircles", title: "Category Circles", screenHeight: 180 },
  { id: "home/GenderToggle", title: "Gender Toggle", screenHeight: 140 },
  { id: "home/ServiceBadgesRow", title: "Service Badges Row", screenHeight: 140 },
  { id: "home/ProfileHeader", title: "Profile Header", screenHeight: 160 },
  { id: "home/FlashSaleTeaser", title: "Flash Sale Teaser", screenHeight: 200 },
];

export default function ExpoUiHomePage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">Home ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Home screen React Native (Expo) components. Rendered live with
        react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="home"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
