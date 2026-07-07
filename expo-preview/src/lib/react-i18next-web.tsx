import React from "react";
import en from "@/i18n/en.json";

// Web shim for react-i18next. Resolves the real translation from the app's
// en.json (dot-path keys like "onboarding.slide1_title"); falls back to a
// humanized last segment for any missing key so screens never show raw keys.
function resolve(key: string): string | undefined {
  const val = key
    .split(".")
    .reduce<any>((o, k) => (o == null ? undefined : o[k]), en as any);
  return typeof val === "string" ? val : undefined;
}

function humanize(key: string): string {
  const seg = String(key).split(".").pop() || key;
  return seg.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function useTranslation() {
  const t = (key: string, opts?: any) => {
    const hit = resolve(key);
    if (hit !== undefined) {
      // very light {{var}} interpolation support
      if (opts && typeof opts === "object") {
        return hit.replace(/\{\{(\w+)\}\}/g, (_, k) =>
          opts[k] != null ? String(opts[k]) : ""
        );
      }
      return hit;
    }
    if (opts && typeof opts.defaultValue === "string") return opts.defaultValue;
    return humanize(key);
  };
  return {
    t,
    i18n: { language: "en", changeLanguage: async () => {} },
  };
}

export function Trans({ children }: any) {
  return <>{children ?? null}</>;
}

export const initReactI18next = { type: "3rdParty", init: () => {} };

export default { useTranslation, Trans, initReactI18next };
