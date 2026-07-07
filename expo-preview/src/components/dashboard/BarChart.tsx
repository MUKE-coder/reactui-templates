import React from "react";
import { View, Text } from "react-native";

interface BarChartProps {
  title?: string;
  subtitle?: string;
  data: { label: string; value: number }[];
  /** Bar color. */
  color?: string;
  height?: number;
}

// Lightweight bar chart built with Views (no chart lib). Bars are height-scaled
// to the max value; the tallest bar is highlighted.
export default function BarChart({
  title,
  subtitle,
  data,
  color = "#F04E3E",
  height = 160,
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const peak = Math.max(...data.map((d) => d.value));

  return (
    <View
      className="rounded-2xl bg-white p-5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 2,
      }}
    >
      {title && (
        <Text className="text-[16px] font-semibold text-neutral-900">
          {title}
        </Text>
      )}
      {subtitle && (
        <Text className="mt-0.5 text-[13px] text-neutral-500">{subtitle}</Text>
      )}

      <View
        className="mt-5 flex-row items-end justify-between"
        style={{ height }}
      >
        {data.map((d, i) => {
          const isPeak = d.value === peak;
          return (
            <View key={i} className="flex-1 items-center justify-end gap-2">
              <View
                className="w-[60%] rounded-t-lg"
                style={{
                  height: Math.max((d.value / max) * (height - 24), 4),
                  backgroundColor: isPeak ? color : `${color}33`,
                }}
              />
              <Text className="text-[11px] text-neutral-400">{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
