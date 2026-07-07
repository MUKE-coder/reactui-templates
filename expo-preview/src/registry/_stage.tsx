import React from "react";
import { View } from "react-native";

// A comfortable padded stage for a component demo inside the phone screen.
export function Stage({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <View
      className={`p-5 gap-4 bg-neutral-50 flex-1${
        center ? " items-center justify-center" : ""
      }`}
    >
      {children}
    </View>
  );
}

export type DemoRegistry = Record<string, () => React.ReactNode>;
