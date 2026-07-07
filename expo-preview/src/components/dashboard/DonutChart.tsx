import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

interface Segment {
  label: string;
  value: number;
  color: string;
}
interface DonutChartProps {
  title?: string;
  data: Segment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
}

// Donut / ring chart using stroke-dasharray on SVG circles.
export default function DonutChart({
  title,
  data,
  size = 150,
  strokeWidth = 22,
  centerLabel,
}: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

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
        <Text className="mb-4 text-[16px] font-semibold text-neutral-900">
          {title}
        </Text>
      )}
      <View className="flex-row items-center gap-5">
        <View style={{ width: size, height: size }}>
          <Svg width={size} height={size}>
            <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke="#F1F1F4"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {data.map((d, i) => {
                const frac = d.value / total;
                const dash = `${frac * c} ${c}`;
                const el = (
                  <Circle
                    key={i}
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke={d.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={dash}
                    strokeDashoffset={-offset * c}
                    strokeLinecap="round"
                    fill="none"
                  />
                );
                offset += frac;
                return el;
              })}
            </G>
          </Svg>
          {centerLabel && (
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-[20px] font-bold text-neutral-900">
                {centerLabel}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-1 gap-2.5">
          {data.map((d, i) => (
            <View key={i} className="flex-row items-center gap-2">
              <View
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <Text className="flex-1 text-[13px] text-neutral-600">
                {d.label}
              </Text>
              <Text className="text-[13px] font-semibold text-neutral-900">
                {Math.round((d.value / total) * 100)}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
