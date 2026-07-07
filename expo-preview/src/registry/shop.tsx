import React from "react";
import type { DemoRegistry } from "./_stage";
import { __setPreviewParams } from "@/lib/expo-router-web";
import Home from "@/components/shop/Home";
import ProductDetail from "@/components/shop/ProductDetail";
import Cart from "@/components/shop/Cart";
import Wishlist from "@/components/shop/Wishlist";
import Search from "@/components/shop/Search";

export const shopRegistry: DemoRegistry = {
  "shop/Home": () => <Home />,
  "shop/ProductDetail": () => {
    __setPreviewParams({ id: "p1" });
    return <ProductDetail />;
  },
  "shop/Cart": () => <Cart />,
  "shop/Wishlist": () => <Wishlist />,
  "shop/Search": () => <Search />,
};
