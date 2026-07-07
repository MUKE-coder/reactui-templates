import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string; screenHeight: number }[] = [
  { id: "rewards/PointsCard", title: "Points Card", screenHeight: 220 },
  { id: "rewards/TierProgress", title: "Tier Progress", screenHeight: 240 },
  { id: "rewards/ReferralCodeCard", title: "Referral Code Card", screenHeight: 300 },
];

export default function ExpoRewardsPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">Rewards ({components.length})</h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Loyalty and referral components for React Native (Expo). Rendered live
        with react-native-web + NativeWind; copy the real RN source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="rewards"
            screenHeight={c.screenHeight}
          />
        ))}
      </div>
    </div>
  );
}
