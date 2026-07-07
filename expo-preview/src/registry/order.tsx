import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import OrderCard from "@/components/order/OrderCard";
import OrderTimeline from "@/components/order/OrderTimeline";

export const orderRegistry: DemoRegistry = {
  "order/OrderCard": () => (
    <Stage>
      <OrderCard
        productName="Wireless Noise-Cancelling Headphones"
        productImage="https://picsum.photos/seed/ord1/200/200"
        category="Audio"
        qty={1}
        price={249.99}
        badgeLabel="Delivered"
        badgeVariant="green"
      />
      <OrderCard
        productName="Ergonomic Office Chair"
        productImage="https://picsum.photos/seed/ord2/200/200"
        category="Furniture"
        qty={2}
        price={189.0}
        badgeLabel="In Progress"
        badgeVariant="light"
      />
      <OrderCard
        productName="Stainless Steel Water Bottle"
        productImage="https://picsum.photos/seed/ord3/200/200"
        category="Kitchen"
        qty={3}
        price={24.5}
        badgeLabel="Cancelled"
        badgeVariant="red"
      />
    </Stage>
  ),
  "order/OrderTimeline": () => (
    <Stage>
      <OrderTimeline
        steps={[
          {
            status: "Order Placed",
            date: "2026-06-30T09:15:00",
            completed: true,
          },
          {
            status: "In Progress",
            date: "2026-07-01T14:30:00",
            completed: true,
          },
          {
            status: "Shipped",
            date: "2026-07-03T08:00:00",
            completed: true,
          },
          {
            status: "Delivered",
            date: "2026-07-05T17:45:00",
            completed: false,
          },
        ]}
      />
    </Stage>
  ),
};
