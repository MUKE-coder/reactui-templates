"use client";
import React from "react";
import { View } from "react-native";
import * as Io5 from "react-icons/io5";

// Web shim for @expo/vector-icons. The extracted Expo components keep their real
// `import { Ionicons } from "@expo/vector-icons"`; a vite alias points that
// import here so we render react-icons (whose io5 set mirrors Ionicons v5)
// instead of pulling in expo-font (which breaks the web build). Only Ionicons is
// used across the components, so we import just that set to keep the bundle lean.

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
      return (
        <View style={[{ width: size, height: size, borderRadius: 3 }, style]} />
      );
    }
    return <Cmp size={size} color={color} style={style} />;
  };
  (Family as any).glyphMap = {};
  return Family;
}

export const Ionicons = makeFamily(Io5 as any, "Io");
// No component uses these other families; alias them to Ionicons so imports
// still resolve without pulling extra react-icons sets into the bundle.
export const MaterialIcons = Ionicons;
export const MaterialCommunityIcons = Ionicons;
export const Feather = Ionicons;
export const FontAwesome = Ionicons;
export const FontAwesome5 = Ionicons;
export const AntDesign = Ionicons;
export const Entypo = Ionicons;

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
