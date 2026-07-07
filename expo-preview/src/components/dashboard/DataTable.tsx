import React from "react";
import { View, Text, ScrollView } from "react-native";

type Cell = string | { text: string; badge: "success" | "warning" | "error" | "neutral" };

interface DataTableProps {
  title?: string;
  columns: { key: string; label: string; width?: number; align?: "left" | "right" }[];
  rows: Record<string, Cell>[];
}

const badgeStyles: Record<string, { bg: string; fg: string }> = {
  success: { bg: "#22C55E1A", fg: "#16A34A" },
  warning: { bg: "#F59E0B1A", fg: "#B45309" },
  error: { bg: "#EF44441A", fg: "#DC2626" },
  neutral: { bg: "#8888881A", fg: "#4A4A4A" },
};

// Premium data table: sticky-styled header + zebra rows + status badges.
export default function DataTable({ title, columns, rows }: DataTableProps) {
  return (
    <View
      className="overflow-hidden rounded-2xl bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 2,
      }}
    >
      {title && (
        <Text className="px-5 pb-1 pt-5 text-[16px] font-semibold text-neutral-900">
          {title}
        </Text>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* header */}
          <View className="flex-row border-b border-neutral-100 bg-neutral-50 px-5 py-3">
            {columns.map((col) => (
              <Text
                key={col.key}
                style={{ width: col.width ?? 90, textAlign: col.align ?? "left" }}
                className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400"
              >
                {col.label}
              </Text>
            ))}
          </View>
          {/* rows */}
          {rows.map((row, ri) => (
            <View
              key={ri}
              className={`flex-row items-center px-5 py-3.5 ${
                ri % 2 ? "bg-neutral-50/40" : "bg-white"
              }`}
            >
              {columns.map((col) => {
                const cell = row[col.key];
                if (cell && typeof cell === "object") {
                  const s = badgeStyles[cell.badge];
                  return (
                    <View
                      key={col.key}
                      style={{ width: col.width ?? 90, alignItems: col.align === "right" ? "flex-end" : "flex-start" }}
                    >
                      <View
                        className="rounded-full px-2.5 py-1"
                        style={{ backgroundColor: s.bg }}
                      >
                        <Text className="text-[11px] font-semibold" style={{ color: s.fg }}>
                          {cell.text}
                        </Text>
                      </View>
                    </View>
                  );
                }
                return (
                  <Text
                    key={col.key}
                    style={{ width: col.width ?? 90, textAlign: col.align ?? "left" }}
                    className="text-[13px] text-neutral-700"
                    numberOfLines={1}
                  >
                    {cell as string}
                  </Text>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
