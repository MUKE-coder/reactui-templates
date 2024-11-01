import fs from "fs";
import path from "path";

export function extractComponentSource(componentPath: string): string {
  const fullPath = path.join(process.cwd(), componentPath);
  return fs.readFileSync(fullPath, "utf8");
}
