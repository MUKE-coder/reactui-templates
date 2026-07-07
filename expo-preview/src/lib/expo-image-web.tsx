"use client";
import React from "react";
import { Image as RNImage } from "react-native";

// Minimal web shim for expo-image's <Image/> so extracted Expo components
// render under react-native-web. The extracted component source keeps its
// real `import { Image } from "expo-image"`; a webpack alias points that import
// here for web rendering only.
type ExpoContentFit = "cover" | "contain" | "fill" | "none" | "scale-down";

export function Image({
  source,
  style,
  contentFit,
  // expo-image-only props that react-native Image doesn't understand:
  placeholder,
  transition,
  blurRadius,
  cachePolicy,
  priority,
  ...props
}: any) {
  const resizeMode: "cover" | "contain" | "stretch" | "center" =
    contentFit === "contain"
      ? "contain"
      : contentFit === "fill"
      ? "stretch"
      : contentFit === "none" || contentFit === "scale-down"
      ? "center"
      : "cover";

  return (
    <RNImage source={source} style={style} resizeMode={resizeMode} {...props} />
  );
}

export default { Image };
