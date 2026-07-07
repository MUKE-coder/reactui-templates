import React from "react";
import { createRoot } from "react-dom/client";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useAuthStore } from "@/stores/authStore";
import { registry, registryIds } from "./registry";
import "./global.css";

// Seed a demo user + cart/wishlist so populated screens (profile, wallet, cart,
// checkout, wishlist) render with real content instead of empty/placeholder.
try {
  const auth = useAuthStore.getState() as any;
  auth.setUser?.({
    id: "u1",
    name: "Esther Howard",
    email: "esther.howard@gmail.com",
    phone: "+1 (555) 123-4567",
    gender: "Female",
    avatar: "https://i.pravatar.cc/240?img=5",
    location: "New York, USA",
  });
  const cart = useCartStore.getState();
  cart.clearCart();
  cart.addItem({
    productId: "p1",
    name: "Nike Pegasus 39",
    category: "Shoes",
    price: 90,
    qty: 1,
    image: "https://picsum.photos/seed/p1a/400/400",
  });
  cart.addItem({
    productId: "p2",
    name: "Light Brown Coat",
    category: "Clothes",
    price: 120,
    qty: 2,
    image: "https://picsum.photos/seed/p2a/400/400",
  });
  const wl = useWishlistStore.getState();
  wl.clearWishlist();
  ["p3", "p4", "p5"].forEach((id) => wl.toggleItem(id));
} catch {
  // stores optional
}

function Preview() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("c") || "";
  const demo = registry[id];

  if (!demo) {
    return (
      <View className="flex-1 items-center justify-center p-6 bg-white">
        <Text className="text-[15px] font-semibold text-neutral-900 mb-2">
          {id ? `Unknown component: ${id}` : "Component gallery"}
        </Text>
        <Text className="text-[12px] text-neutral-500 text-center">
          Available: {registryIds.join(", ")}
        </Text>
      </View>
    );
  }

  // A flex-1 container so full-screen demos (SafeAreaView flex-1) stretch to
  // the full device height; screens manage their own internal scrolling.
  return <View style={{ flex: 1, backgroundColor: "#fff" }}>{demo()}</View>;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Preview />
      </QueryClientProvider>
    </SafeAreaProvider>
  </React.StrictMode>
);
