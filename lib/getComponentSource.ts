import sourceCodeJson from "@/public/component-source-code.json";

// Define a type for the source code object
type SourceCode = {
  [key: string]: string;
};

// Assert the type of the imported JSON
const sourceCode: SourceCode = sourceCodeJson as SourceCode;

export function extractComponentSource(componentPath: string): string {
  // Normalize the path to use forward slashes
  const normalizedPath = componentPath.replace(/\\/g, "/");

  // Use a type assertion to tell TypeScript that the key exists
  return (sourceCode as { [key: string]: string })[normalizedPath] || "";
}
