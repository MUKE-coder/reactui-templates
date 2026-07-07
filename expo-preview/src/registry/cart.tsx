import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import CartItem from "@/components/cart/CartItem";
import RemoveCartModal from "@/components/cart/RemoveCartModal";

const sampleItem = {
  productId: "p-001",
  name: "Leather Weekender Bag",
  category: "Accessories",
  price: 189.99,
  qty: 1,
  image: "https://picsum.photos/seed/bag1/400/400",
};

function CartItemDemo() {
  const [item, setItem] = useState(sampleItem);
  return (
    <Stage>
      <CartItem
        item={item}
        onUpdateQty={(productId, qty) => setItem((prev) => ({ ...prev, qty }))}
        onRemove={() => {}}
      />
    </Stage>
  );
}

function RemoveCartModalDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <Stage center>
      <RemoveCartModal
        visible={visible}
        item={sampleItem}
        onClose={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
      />
    </Stage>
  );
}

export const cartRegistry: DemoRegistry = {
  "cart/CartItem": () => <CartItemDemo />,
  "cart/RemoveCartModal": () => <RemoveCartModalDemo />,
};
