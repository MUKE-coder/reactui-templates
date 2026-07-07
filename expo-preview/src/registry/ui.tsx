import React, { useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stage, type DemoRegistry } from "./_stage";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Divider from "@/components/ui/Divider";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Card from "@/components/ui/Card";
import Rating from "@/components/ui/Rating";
import Input from "@/components/ui/Input";
import EmptyState from "@/components/ui/EmptyState";
import SkeletonCard from "@/components/ui/SkeletonCard";
import CustomRadio from "@/components/ui/CustomRadio";
import CurrencyInput from "@/components/ui/CurrencyInput";
import SearchableSelect from "@/components/ui/SearchableSelect";
import BottomSheet from "@/components/ui/BottomSheet";

function RadioDemo() {
  const [value, setValue] = useState("card");
  return (
    <Stage>
      <CustomRadio
        label="Payment method"
        value={value}
        onChange={setValue}
        options={[
          { label: "Credit card", value: "card", subtitle: "Visa •••• 4242", icon: "card" },
          { label: "Cash on delivery", value: "cash", subtitle: "Pay when it arrives", icon: "cash" },
        ]}
      />
    </Stage>
  );
}

function CurrencyDemo() {
  const [v, setV] = useState("2499");
  return (
    <Stage>
      <CurrencyInput
        label="Amount"
        value={v}
        onChangeValue={(raw) => setV(raw)}
      />
    </Stage>
  );
}

function SearchableSelectDemo() {
  const [v, setV] = useState("");
  return (
    <Stage>
      <SearchableSelect
        label="Country"
        placeholder="Select a country"
        value={v}
        onChange={setV}
        options={[
          { label: "Ghana", value: "gh" },
          { label: "Nigeria", value: "ng" },
          { label: "Kenya", value: "ke" },
          { label: "South Africa", value: "za" },
        ]}
      />
    </Stage>
  );
}

function BottomSheetDemo() {
  const [open, setOpen] = useState(true);
  return (
    <Stage center>
      <Button title="Open sheet" fullWidth={false} onPress={() => setOpen(true)} />
      <BottomSheet visible={open} onClose={() => setOpen(false)}>
        <View className="p-4 gap-2">
          <Text className="text-[16px] font-semibold text-neutral-900">Filters</Text>
          <Text className="text-[14px] text-neutral-700">Sheet content goes here.</Text>
        </View>
      </BottomSheet>
    </Stage>
  );
}

export const uiRegistry: DemoRegistry = {
  "ui/Button": () => (
    <Stage>
      <Button title="Add to cart" variant="primary" />
      <Button title="Secondary" variant="secondary" />
      <Button title="Destructive" variant="destructive" />
      <Button title="Loading" variant="primary" loading />
    </Stage>
  ),
  "ui/Badge": () => (
    <Stage>
      <View className="flex-row flex-wrap gap-2">
        <Badge label="Sale" variant="red" />
        <Badge label="In stock" variant="green" />
        <Badge label="New" variant="light" />
        <Badge label="Draft" variant="gray" />
      </View>
    </Stage>
  ),
  "ui/Avatar": () => (
    <Stage>
      <View className="flex-row items-center gap-3">
        <Avatar name="Jane Doe" size="sm" />
        <Avatar name="Kwame A" size="md" />
        <Avatar source="https://i.pravatar.cc/150?img=12" name="Photo" size="lg" />
      </View>
    </Stage>
  ),
  "ui/Input": () => (
    <Stage>
      <Input label="Email" placeholder="you@example.com" leftIcon="mail" />
      <Input label="Password" placeholder="••••••••" isPassword />
      <Input label="Error state" placeholder="Invalid" error="Required field" />
    </Stage>
  ),
  "ui/CustomRadio": () => <RadioDemo />,
  "ui/CurrencyInput": () => <CurrencyDemo />,
  "ui/SearchableSelect": () => <SearchableSelectDemo />,
  "ui/BottomSheet": () => <BottomSheetDemo />,
  "ui/Rating": () => (
    <Stage>
      <View className="rounded-2xl bg-white p-4 gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-[15px] font-semibold text-neutral-900">
            Customer reviews
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Rating value={5} size={16} />
            <Text className="text-[13px] font-semibold text-neutral-900">4.8</Text>
          </View>
        </View>
        <View className="h-[1px] bg-neutral-100" />
        <View className="flex-row items-center gap-3">
          <Avatar name="Ama S" size="sm" />
          <View className="flex-1">
            <Text className="text-[13px] font-semibold text-neutral-900">Ama Serwaa</Text>
            <Rating value={4} size={13} />
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <Avatar name="Kojo M" size="sm" />
          <View className="flex-1">
            <Text className="text-[13px] font-semibold text-neutral-900">Kojo Mensah</Text>
            <Rating value={5} size={13} />
          </View>
        </View>
      </View>
    </Stage>
  ),
  "ui/Card": () => (
    <View className="flex-1 gap-3 bg-neutral-100 p-5">
      <Card style={{ padding: 16 }}>
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary-light">
            <Ionicons name="cube-outline" size={20} color="#F04E3E" />
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-semibold text-neutral-900">Order #1024</Text>
            <Text className="text-[13px] text-neutral-500 mt-0.5">Delivered • 3 items</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#B0B0B0" />
        </View>
      </Card>
      <Card style={{ padding: 16 }}>
        <Text className="text-[13px] text-neutral-500">Total balance</Text>
        <Text className="text-[26px] font-bold text-neutral-900 mt-1">$12,480.50</Text>
        <View className="flex-row items-center gap-1 mt-1">
          <Ionicons name="arrow-up" size={13} color="#16A34A" />
          <Text className="text-[12px] font-semibold text-success">+2.4% this month</Text>
        </View>
      </Card>
    </View>
  ),
  "ui/Divider": () => (
    <Stage>
      <View className="rounded-2xl bg-white px-4 py-1">
        {[
          { label: "Account", icon: "person-outline" as const },
          { label: "Notifications", icon: "notifications-outline" as const },
          { label: "Privacy & security", icon: "lock-closed-outline" as const },
        ].map((r, i, arr) => (
          <View key={r.label}>
            <View className="flex-row items-center gap-3 py-3.5">
              <Ionicons name={r.icon} size={18} color="#4A4A4A" />
              <Text className="flex-1 text-[14px] text-neutral-900">{r.label}</Text>
              <Ionicons name="chevron-forward" size={16} color="#B0B0B0" />
            </View>
            {i < arr.length - 1 && <View className="h-[1px] bg-neutral-100" />}
          </View>
        ))}
      </View>
      <Divider label="OR" />
    </Stage>
  ),
  "ui/EmptyState": () => (
    <EmptyState
      icon="cart-outline"
      title="Your cart is empty"
      subtitle="Browse products and add your favourites to the cart."
      ctaTitle="Start shopping"
      onCtaPress={() => {}}
    />
  ),
  "ui/LoadingSpinner": () => <LoadingSpinner />,
  "ui/SkeletonCard": () => (
    <View className="flex-1 gap-3 bg-white p-5">
      <View className="flex-row gap-3">
        <View className="flex-1">
          <SkeletonCard height={150} />
        </View>
        <View className="flex-1">
          <SkeletonCard height={150} />
        </View>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <SkeletonCard height={150} />
        </View>
        <View className="flex-1">
          <SkeletonCard height={150} />
        </View>
      </View>
    </View>
  ),
};
