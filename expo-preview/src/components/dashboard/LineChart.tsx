import React from "react";
import { View, Text } from "react-native";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface LineChartProps {
  title?: string;
  subtitle?: string;
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

// Smooth-ish area line chart using react-native-svg.
export default function LineChart({
  title,
  subtitle,
  data,
  color = "#F04E3E",
  width = 280,
  height = 120,
}: LineChartProps) {
  const pad = 8;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * w,
    y: pad + (1 - (v - min) / range) * h,
  }));

  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)} ${height - pad} L ${pts[0].x.toFixed(1)} ${height - pad} Z`;
  const last = pts[pts.length - 1];

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
      <View className="mt-4 items-center">
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="lc" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color} stopOpacity={0.22} />
              <Stop offset="1" stopColor={color} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Path d={area} fill="url(#lc)" />
          <Path
            d={line}
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Circle cx={last.x} cy={last.y} r={4.5} fill={color} />
          <Circle cx={last.x} cy={last.y} r={8} fill={color} fillOpacity={0.18} />
        </Svg>
      </View>
    </View>
  );
}
