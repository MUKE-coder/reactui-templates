const fs = require("fs");
const path = require("path");

const componentsDir = path.join(process.cwd(), "components/simple-ui");
const outputFile = path.join(
  process.cwd(),
  "public",
  "component-source-code.json"
);

function extractComponentSource(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractAllComponentSources(dir, result = {}) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      extractAllComponentSources(filePath, result);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      const relativePath = path.relative(componentsDir, filePath);
      // Convert Windows path separators to forward slashes
      const normalizedPath = relativePath.replace(/\\/g, "/");
      result[normalizedPath] = extractComponentSource(filePath);
    }
  }

  return result;
}

const sourceCode = extractAllComponentSources(componentsDir);
fs.writeFileSync(outputFile, JSON.stringify(sourceCode, null, 2));

console.log(`Source code extracted and saved to ${outputFile}`);
