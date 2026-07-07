import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string }[] = [
  { id: "account/Profile", title: "Profile" },
  { id: "account/Orders", title: "Orders" },
  { id: "account/Wallet", title: "Wallet" },
  { id: "account/EditProfile", title: "Edit Profile" },
];

export default function ExpoUiAccountPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        Account ({components.length})
      </h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Account screens — profile, order history, wallet and profile editing.
        Rendered live; copy the real source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="account"
          />
        ))}
      </div>
    </div>
  );
}
