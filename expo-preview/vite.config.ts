import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

// Isolated preview sandbox: react-native-web + NativeWind. Builds to
// ../public/expo-preview so the Next app can embed it via <iframe> at
// /expo-preview/index.html?c=<component>. Kept fully separate from Next so the
// main app stays on SWC.
export default defineConfig({
  base: "/expo-preview/",
  plugins: [
    react({
      // Route JSX through NativeWind so className works on rn-web components.
      jsxImportSource: "nativewind",
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(dir, "src") },
      // Exact match only, so deep imports (react-native/Libraries/...) are left
      // for packages' own .web.js variants to resolve.
      { find: /^react-native$/, replacement: "react-native-web" },
      // Faithful source keeps `expo-image` / `@expo/vector-icons`; render via shims.
      { find: /^expo-image$/, replacement: path.resolve(dir, "src/lib/expo-image-web.tsx") },
      { find: /^@expo\/vector-icons$/, replacement: path.resolve(dir, "src/lib/expo-vector-icons-web.tsx") },
      { find: /^expo-router$/, replacement: path.resolve(dir, "src/lib/expo-router-web.tsx") },
      {
        find: /^@react-native-async-storage\/async-storage$/,
        replacement: path.resolve(dir, "src/lib/async-storage-web.ts"),
      },
      {
        find: /^react-i18next$/,
        replacement: path.resolve(dir, "src/lib/react-i18next-web.tsx"),
      },
      {
        find: /^@react-native\/assets-registry\/registry$/,
        replacement: path.resolve(dir, "src/lib/assets-registry-stub.ts"),
      },
    ],
    // Prefer .web.* variants (react-native-web ecosystem convention).
    extensions: [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".web.js",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".json",
    ],
  },
  define: {
    // react-native-web checks this.
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
    __DEV__: JSON.stringify(false),
    global: "globalThis",
  },
  build: {
    outDir: path.resolve(dir, "../public/expo-preview"),
    emptyOutDir: true,
  },
});
