import React from "react";
import { View } from "react-native";
import type { DemoRegistry } from "./_stage";
import StatCard from "@/components/dashboard/StatCard";
import BarChart from "@/components/dashboard/BarChart";
import LineChart from "@/components/dashboard/LineChart";
import DonutChart from "@/components/dashboard/DonutChart";
import DataTable from "@/components/dashboard/DataTable";
import Dashboard from "@/components/dashboard/Dashboard";

// Gray stage so the white cards read as cards.
function Gray({ children }: { children: React.ReactNode }) {
  return <View className="flex-1 gap-3 bg-neutral-100 p-4">{children}</View>;
}

export const dashboardRegistry: DemoRegistry = {
  "dashboard/StatCard": () => (
    <Gray>
      <View className="flex-row gap-3">
        <StatCard label="Revenue" value="$48.2k" delta={12.5} icon="cash-outline" tint="#F04E3E" />
        <StatCard label="Orders" value="1,284" delta={8.1} icon="cart-outline" tint="#3B82F6" />
      </View>
      <View className="flex-row gap-3">
        <StatCard label="Customers" value="9,431" delta={-2.4} icon="people-outline" tint="#22C55E" />
        <StatCard label="Refunds" value="$1.9k" delta={-0.8} icon="arrow-undo-outline" tint="#F59E0B" />
      </View>
    </Gray>
  ),
  "dashboard/BarChart": () => (
    <Gray>
      <BarChart
        title="Weekly sales"
        subtitle="Units sold per day"
        data={[
          { label: "M", value: 12 },
          { label: "T", value: 19 },
          { label: "W", value: 8 },
          { label: "T", value: 24 },
          { label: "F", value: 31 },
          { label: "S", value: 22 },
          { label: "S", value: 15 },
        ]}
      />
    </Gray>
  ),
  "dashboard/LineChart": () => (
    <Gray>
      <LineChart title="Revenue" subtitle="Last 7 days" data={[12, 18, 14, 22, 19, 28, 34]} />
    </Gray>
  ),
  "dashboard/DonutChart": () => (
    <Gray>
      <DonutChart
        title="Traffic sources"
        centerLabel="18k"
        data={[
          { label: "Organic", value: 48, color: "#F04E3E" },
          { label: "Direct", value: 27, color: "#3B82F6" },
          { label: "Social", value: 25, color: "#22C55E" },
        ]}
      />
    </Gray>
  ),
  "dashboard/DataTable": () => (
    <Gray>
      <DataTable
        title="Recent orders"
        columns={[
          { key: "id", label: "Order", width: 66 },
          { key: "customer", label: "Customer", width: 104 },
          { key: "status", label: "Status", width: 86 },
          { key: "total", label: "Total", width: 60, align: "right" },
        ]}
        rows={[
          { id: "#1024", customer: "Ama Serwaa", status: { text: "Paid", badge: "success" }, total: "$129" },
          { id: "#1025", customer: "John Doe", status: { text: "Pending", badge: "warning" }, total: "$89" },
          { id: "#1026", customer: "Kojo M.", status: { text: "Failed", badge: "error" }, total: "$240" },
        ]}
      />
    </Gray>
  ),
  "dashboard/Dashboard": () => <Dashboard />,
};
