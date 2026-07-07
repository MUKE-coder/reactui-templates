"use client";
import React from "react";
import { View } from "react-native";
import * as Io5 from "react-icons/io5";
import * as Md from "react-icons/md";
import * as Fi from "react-icons/fi";
import * as Fa from "react-icons/fa";
import * as Ai from "react-icons/ai";

// Web shim for @expo/vector-icons. The extracted Expo components keep their real
// `import { Ionicons } from "@expo/vector-icons"`; a webpack alias points that
// import here so we render react-icons (whose io5 set mirrors Ionicons v5)
// instead of pulling in expo-font (which uses node:async_hooks and breaks the
// webpack build). The real package stays installed for TypeScript types only.

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

function toPascal(name: string): string {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function makeFamily(
  pack: Record<string, React.ComponentType<any>>,
  prefix: string
) {
  const Family = ({ name, size = 24, color = "#000", style }: IconProps) => {
    const pascal = toPascal(name);
    const Cmp =
      pack[`${prefix}${pascal}`] ||
      pack[`${prefix}${pascal}Outline`] ||
      pack[`${prefix}Outline${pascal}`];
    if (!Cmp) {
      // Unknown glyph — render a neutral square so layout is preserved.
      return (
        <View
          style={[{ width: size, height: size, borderRadius: 3 }, style]}
        />
      );
    }
    return <Cmp size={size} color={color} style={style} />;
  };
  // glyphMap exists so `keyof typeof Ionicons.glyphMap` typing has a runtime peer.
  (Family as any).glyphMap = {};
  return Family;
}

export const Ionicons = makeFamily(Io5 as any, "Io");
export const MaterialIcons = makeFamily(Md as any, "Md");
export const MaterialCommunityIcons = makeFamily(Md as any, "Md");
export const Feather = makeFamily(Fi as any, "Fi");
export const FontAwesome = makeFamily(Fa as any, "Fa");
export const FontAwesome5 = makeFamily(Fa as any, "Fa");
export const AntDesign = makeFamily(Ai as any, "Ai");
export const Entypo = makeFamily(Md as any, "Md");

export default {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
};
