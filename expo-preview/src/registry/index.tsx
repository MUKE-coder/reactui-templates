import type { DemoRegistry } from "./_stage";
import { uiRegistry } from "./ui";
import { uiSheinRegistry } from "./ui_shein";
import { cartRegistry } from "./cart";
import { chatRegistry } from "./chat";
import { homeRegistry } from "./home";
import { homeSheinRegistry } from "./home_shein";
import { orderRegistry } from "./order";
import { productRegistry } from "./product";
import { productSheinRegistry } from "./product_shein";
import { sharedRegistry } from "./shared";
import { rewardsRegistry } from "./rewards";
import { categoryRegistry } from "./category";
import { navigationRegistry } from "./navigation";
import { authRegistry } from "./auth";
import { shopRegistry } from "./shop";
import { checkoutRegistry } from "./checkout";
import { accountRegistry } from "./account";
import { dashboardRegistry } from "./dashboard";

// Merged id -> demo map for the whole sandbox. Keys match the copy-source JSON
// keys (e.g. "product/ProductCard").
export const registry: DemoRegistry = {
  ...uiRegistry,
  ...uiSheinRegistry,
  ...productRegistry,
  ...productSheinRegistry,
  ...homeRegistry,
  ...homeSheinRegistry,
  ...cartRegistry,
  ...orderRegistry,
  ...sharedRegistry,
  ...chatRegistry,
  ...rewardsRegistry,
  ...categoryRegistry,
  ...navigationRegistry,
  ...authRegistry,
  ...shopRegistry,
  ...checkoutRegistry,
  ...accountRegistry,
  ...dashboardRegistry,
};

export const registryIds = Object.keys(registry);
