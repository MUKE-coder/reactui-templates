"use client";
import React from "react";

// Minimal web shim for expo-router so extracted components that navigate still
// render in the preview sandbox. Navigation is a no-op here.
const noop = () => {};

export const router = {
  push: noop,
  replace: noop,
  back: noop,
  navigate: noop,
  setParams: noop,
  canGoBack: () => false,
  dismiss: noop,
  dismissAll: noop,
};

export function useRouter() {
  return router;
}

// Preview harness can set route params for [id]-style screens.
let previewParams: Record<string, string> = {};
export function __setPreviewParams(p: Record<string, string>) {
  previewParams = p;
}

export function useLocalSearchParams<T = Record<string, string>>(): T {
  return previewParams as T;
}

export function useGlobalSearchParams<T = Record<string, string>>(): T {
  return {} as T;
}

export function usePathname() {
  return "/";
}

export function useSegments() {
  return [] as string[];
}

export function useFocusEffect(_effect: React.EffectCallback) {}

export function Link({ children, ...props }: any) {
  return <>{children}</>;
}

export function Redirect(_props: any) {
  return null;
}

export const Stack: any = () => null;
Stack.Screen = () => null;

export const Tabs: any = () => null;
Tabs.Screen = () => null;

export default {
  router,
  useRouter,
  useLocalSearchParams,
  useGlobalSearchParams,
  usePathname,
  useSegments,
  useFocusEffect,
  Link,
  Redirect,
  Stack,
  Tabs,
};
