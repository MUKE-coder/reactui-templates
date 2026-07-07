import ExpoComponentPreview from "@/components/expo-ui/ExpoComponentPreview";
import { extractExpoComponentSource } from "@/lib/getExpoComponentSource";

const components: { id: string; title: string }[] = [
  { id: "auth/Onboarding", title: "Onboarding" },
  { id: "auth/Login", title: "Login" },
  { id: "auth/Register", title: "Register" },
  { id: "auth/VerifyOtp", title: "Verify OTP" },
  { id: "auth/ForgotPassword", title: "Forgot Password" },
  { id: "auth/NewPassword", title: "New Password" },
];

export default function ExpoUiAuthPage() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        Auth &amp; Onboarding ({components.length})
      </h1>
      <p className="mt-1.5 mb-8 max-w-2xl text-[15px] text-muted-foreground">
        Complete, production-ready React Native (Expo) auth screens — onboarding,
        login, register, OTP and password flows with form validation. Rendered
        live; copy the real source.
      </p>
      <div className="space-y-10">
        {components.map((c) => (
          <ExpoComponentPreview
            key={c.id}
            componentId={c.id}
            title={c.title}
            source={extractExpoComponentSource(c.id + ".tsx")}
            route="auth"
          />
        ))}
      </div>
    </div>
  );
}
