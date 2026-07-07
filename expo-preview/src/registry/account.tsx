import React from "react";
import type { DemoRegistry } from "./_stage";
import Profile from "@/components/account/Profile";
import Orders from "@/components/account/Orders";
import Wallet from "@/components/account/Wallet";
import EditProfile from "@/components/account/EditProfile";

export const accountRegistry: DemoRegistry = {
  "account/Profile": () => <Profile />,
  "account/Orders": () => <Orders />,
  "account/Wallet": () => <Wallet />,
  "account/EditProfile": () => <EditProfile />,
};
