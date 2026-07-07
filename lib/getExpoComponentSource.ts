import sourceCodeJson from "@/public/expo-component-source-code.json";

type SourceCode = {
  [key: string]: string;
};

const sourceCode: SourceCode = sourceCodeJson as SourceCode;

// Returns the raw source of an extracted Expo component, keyed by its path
// relative to components/expo-ui (e.g. "ui/Button.tsx").
export function extractExpoComponentSource(componentPath: string): string {
  const normalizedPath = componentPath.replace(/\\/g, "/");
  return (sourceCode as { [key: string]: string })[normalizedPath] || "";
}
