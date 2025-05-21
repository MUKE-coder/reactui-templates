import { getComponentViews } from "@/actions/components";
import ComponentPreview from "@/components/component-preview";
import { DefaultAuthLayout } from "@/components/simple-ui/auth-layout/AuthLayout";
import ForgotPasswordPage from "@/components/simple-ui/auth/forgot-password";
import ForgotPasswordV2 from "@/components/simple-ui/auth/ForgotPasswordV2";
import LoginPage from "@/components/simple-ui/auth/login";
import LoginV2 from "@/components/simple-ui/auth/LoginV2";
import RegisterPage from "@/components/simple-ui/auth/register";
import RegisterV1 from "@/components/simple-ui/auth/RegisterV1";
import RegisterV2 from "@/components/simple-ui/auth/RegisterV2";
import ResetPasswordPage from "@/components/simple-ui/auth/reset-password";
import VerifyEmailPage from "@/components/simple-ui/auth/verify-email";
import { extractComponentSource } from "@/lib/getComponentSource";

export default async function Headers() {
  const h1 = await getComponentViews("672c7af26df412dd93d417a5");
  const h2 = await getComponentViews("682d7defb0fd4d433617b34f");
  const h3 = await getComponentViews("682d7e30b0fd4d433617b350");
  const h4 = await getComponentViews("682d7e6fb0fd4d433617b351");
  const h5 = await getComponentViews("682d7eb4b0fd4d433617b352");
  const h6 = await getComponentViews("682d7f06b0fd4d433617b353");
  const h7 = await getComponentViews("682d8459b0fd4d433617b354");
  const h8 = await getComponentViews("682db95362d4eb46b23b28ce");
  const h9 = await getComponentViews("682db9c462d4eb46b23b28cf");
  const h10 = await getComponentViews("682dbc6162d4eb46b23b28d0");

  const siteHeaders = [
    {
      id: "672c7af26df412dd93d417a5",
      title: "Register with Carousel",
      component: RegisterV1,
      downloads: h1,
      sourcePath: "auth/RegisterV1.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/register-with-carousel",
    },
    {
      id: "682d8459b0fd4d433617b354",
      title: "Default Auth Layout",
      component: DefaultAuthLayout,
      downloads: h7,
      sourcePath: "auth-layout/AuthLayout.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/layout",
    },
    {
      id: "682d7defb0fd4d433617b34f",
      title: "Login with Layout",
      component: LoginPage,
      downloads: h2,
      sourcePath: "auth/login.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/login",
    },
    {
      id: "682d7e30b0fd4d433617b350",
      title: "Register with Layout",
      component: RegisterPage,
      downloads: h3,
      sourcePath: "auth/register.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/register",
    },
    {
      id: "682d7e6fb0fd4d433617b351",
      title: "Forgot Password with Layout",
      component: ForgotPasswordPage,
      downloads: h4,
      sourcePath: "auth/forgot-password.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/forgot",
    },
    {
      id: "682d7eb4b0fd4d433617b352",
      title: "Verify Email with Layout",
      component: VerifyEmailPage,
      downloads: h5,
      sourcePath: "auth/verify-email.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/verify",
    },
    {
      id: "682d7f06b0fd4d433617b353",
      title: "Reset Password with Layout",
      component: ResetPasswordPage,
      downloads: h6,
      sourcePath: "auth/reset-password.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/reset",
    },
    {
      id: "682db95362d4eb46b23b28ce",
      title: "Login V2",
      component: LoginV2,
      downloads: h8,
      sourcePath: "auth/LoginV2.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/login-v2",
    },
    {
      id: "682db9c462d4eb46b23b28cf",
      title: "Register V2",
      component: RegisterV2,
      downloads: h9,
      sourcePath: "auth/RegisterV2.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/register-v2",
    },
    {
      id: "682dbc6162d4eb46b23b28d0",
      title: "Forgot Password V2",
      component: ForgotPasswordV2,
      downloads: h10,
      sourcePath: "auth/ForgotPasswordV2.tsx",
      githubUrl: "#",
      externalUrl: "/pages/auth/forgot-v2",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6">Auth UI({siteHeaders.length})</h1>
      <div className="space-y-12">
        {siteHeaders.map((header, index) => {
          const sourceCode = extractComponentSource(header.sourcePath);
          return (
            <ComponentPreview
              key={index}
              title={header.title}
              component={<header.component />}
              sourceCode={sourceCode}
              githubUrl={header.githubUrl}
              externalUrl={header.externalUrl}
              id={header.id}
              downloads={header.downloads}
              route="auth"
            />
          );
        })}
      </div>
    </div>
  );
}
