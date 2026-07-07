import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import StatCard from "./StatCard";
import LineChart from "./LineChart";
import DonutChart from "./DonutChart";
import DataTable from "./DataTable";

// Full analytics dashboard screen composing the dashboard building blocks.
export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-100" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}
      >
        {/* header */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[13px] text-neutral-500">Welcome back,</Text>
            <Text className="text-[20px] font-bold text-neutral-900">
              Kwame Asante
            </Text>
          </View>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white">
            <Ionicons name="notifications-outline" size={20} color="#1A1A1A" />
            <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
          </Pressable>
        </View>

        {/* stat cards */}
        <View className="flex-row gap-3">
          <StatCard
            label="Revenue"
            value="$48.2k"
            delta={12.5}
            icon="cash-outline"
            tint="#F04E3E"
          />
          <StatCard
            label="Orders"
            value="1,284"
            delta={8.1}
            icon="cart-outline"
            tint="#3B82F6"
          />
        </View>
        <View className="flex-row gap-3">
          <StatCard
            label="Customers"
            value="9,431"
            delta={-2.4}
            icon="people-outline"
            tint="#22C55E"
          />
          <StatCard
            label="Refunds"
            value="$1.9k"
            delta={-0.8}
            icon="arrow-undo-outline"
            tint="#F59E0B"
          />
        </View>

        {/* line chart */}
        <LineChart
          title="Revenue"
          subtitle="Last 7 days"
          data={[12, 18, 14, 22, 19, 28, 34]}
        />

        {/* donut */}
        <DonutChart
          title="Traffic sources"
          centerLabel="18k"
          data={[
            { label: "Organic", value: 48, color: "#F04E3E" },
            { label: "Direct", value: 27, color: "#3B82F6" },
            { label: "Social", value: 25, color: "#22C55E" },
          ]}
        />

        {/* table */}
        <DataTable
          title="Recent orders"
          columns={[
            { key: "id", label: "Order", width: 70 },
            { key: "customer", label: "Customer", width: 110 },
            { key: "status", label: "Status", width: 90 },
            { key: "total", label: "Total", width: 70, align: "right" },
          ]}
          rows={[
            { id: "#1024", customer: "Ama Serwaa", status: { text: "Paid", badge: "success" }, total: "$129" },
            { id: "#1025", customer: "John Doe", status: { text: "Pending", badge: "warning" }, total: "$89" },
            { id: "#1026", customer: "Kojo M.", status: { text: "Failed", badge: "error" }, total: "$240" },
            { id: "#1027", customer: "Efua B.", status: { text: "Paid", badge: "success" }, total: "$59" },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
