import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatCardProps {
  label: string;
  value: string;
  /** e.g. +12.5 or -3.2 — sign drives the up/down trend styling. */
  delta?: number;
  deltaSuffix?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  /** Accent color for the icon chip. */
  tint?: string;
}

export default function StatCard({
  label,
  value,
  delta,
  deltaSuffix = "%",
  icon = "stats-chart",
  tint = "#F04E3E",
}: StatCardProps) {
  const up = (delta ?? 0) >= 0;

  return (
    <View
      className="flex-1 rounded-2xl bg-white p-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View
          className="h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${tint}1A` }}
        >
          <Ionicons name={icon} size={18} color={tint} />
        </View>
        {delta !== undefined && (
          <View
            className="flex-row items-center gap-0.5 rounded-full px-2 py-1"
            style={{ backgroundColor: up ? "#22C55E1A" : "#EF44441A" }}
          >
            <Ionicons
              name={up ? "arrow-up" : "arrow-down"}
              size={11}
              color={up ? "#16A34A" : "#DC2626"}
            />
            <Text
              className="text-[11px] font-semibold"
              style={{ color: up ? "#16A34A" : "#DC2626" }}
            >
              {Math.abs(delta)}
              {deltaSuffix}
            </Text>
          </View>
        )}
      </View>
      <Text className="mt-3 text-[24px] font-bold text-neutral-900">
        {value}
      </Text>
      <Text className="mt-0.5 text-[13px] text-neutral-500">{label}</Text>
    </View>
  );
}
