import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Rect,
  Stop,
} from "react-native-svg";

/** Brand mark used at the top of auth screens. */
export function BrandLogo({
  showName = true,
  align = "center",
}: {
  showName?: boolean;
  align?: "center" | "left";
}) {
  return (
    <View
      className={`flex-row items-center gap-2.5 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <View className="h-11 w-11 items-center justify-center rounded-2xl bg-primary">
        <Ionicons name="bag-handle" size={22} color="#fff" />
      </View>
      {showName && (
        <Text className="text-[20px] font-extrabold tracking-tight text-neutral-900">
          Shop<Text className="text-primary">Ease</Text>
        </Text>
      )}
    </View>
  );
}

/**
 * Soft brand-tinted gradient background. Absolutely fills its parent; place it
 * as the first child of a transparent screen root.
 */
export function AuthGradient() {
  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <Svg width="100%" height="100%">
        <Defs>
          {/* Full-height vertical brand tint */}
          <LinearGradient id="agv" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFDAD3" stopOpacity={0.85} />
            <Stop offset="42%" stopColor="#FFF3F0" stopOpacity={0.55} />
            <Stop offset="100%" stopColor="#FFE7DD" stopOpacity={0.8} />
          </LinearGradient>
          {/* Soft glow top-left */}
          <RadialGradient id="ag1" cx="12%" cy="4%" r="70%">
            <Stop offset="0%" stopColor="#FFC9BF" stopOpacity={0.7} />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </RadialGradient>
          {/* Soft glow bottom-right */}
          <RadialGradient id="ag2" cx="100%" cy="100%" r="65%">
            <Stop offset="0%" stopColor="#FFD9C6" stopOpacity={0.65} />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#agv)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#ag1)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#ag2)" />
      </Svg>
    </View>
  );
}
