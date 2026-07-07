const fs = require("fs");
const path = require("path");

// Extracts the raw source of every extracted Expo/React Native component so the
// expo-ui gallery's Copy button can serve the real source. Keyed by the path
// relative to components/expo-ui (e.g. "ui/Button.tsx").
const componentsDir = path.join(process.cwd(), "expo-preview", "src", "components");
const outputFile = path.join(
  process.cwd(),
  "public",
  "expo-component-source-code.json"
);

// Infra/support folders that are not copyable components.
const SKIP_DIRS = new Set(["lib", "_spike", "_demos"]);

function extractAllComponentSources(dir, result = {}, depth = 0) {
  if (!fs.existsSync(dir)) return result;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(file) || file.startsWith("_")) continue;
      extractAllComponentSources(filePath, result, depth + 1);
    } else if (
      // Only category components (nested), not root infra or _-prefixed helpers.
      depth > 0 &&
      !file.startsWith("_") &&
      (file.endsWith(".tsx") || file.endsWith(".ts"))
    ) {
      const relativePath = path.relative(componentsDir, filePath);
      const normalizedPath = relativePath.replace(/\\/g, "/");
      result[normalizedPath] = fs.readFileSync(filePath, "utf8");
    }
  }

  return result;
}

const sourceCode = extractAllComponentSources(componentsDir);
fs.writeFileSync(outputFile, JSON.stringify(sourceCode, null, 2));

console.log(
  `Expo source extracted: ${Object.keys(sourceCode).length} files -> ${outputFile}`
);
