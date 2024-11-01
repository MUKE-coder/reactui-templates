"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Github, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Highlight, themes } from "prism-react-renderer";
import { updateSiteComponentViews } from "@/actions/components";
import Link from "next/link";

interface ComponentPreviewProps {
  id?: string;
  title: string;
  component: React.ReactNode;
  sourceCode: string;
  isResponsive?: boolean;
  githubUrl?: string;
  externalUrl?: string;
  route: string;
  downloads?: number;
}

export default function ComponentPreview({
  id,
  title = "Component Preview",
  component,
  sourceCode,
  isResponsive = true,
  githubUrl = "#",
  externalUrl = "#",
  downloads,
  route,
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    navigator.clipboard.writeText(sourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    try {
      await updateSiteComponentViews(id ?? "", route);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {isResponsive && (
            <Badge
              variant="secondary"
              className="bg-blue-500/15 text-blue-500 hover:bg-blue-500/20"
            >
              RESPONSIVE
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">{downloads} downloads</Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              <span className="sr-only">Open in new tab</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              <span className="sr-only">View on GitHub</span>
            </a>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-end px-4 py-2 border-b border-border bg-background">
          <TabsList className="h-9">
            <TabsTrigger value="preview" className="text-sm">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-sm">
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="p-6 bg-background">
          {component}
        </TabsContent>
        <TabsContent value="code" className="border-none p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-4 top-4 z-20",
                copied && "text-green-500"
              )}
              onClick={onCopy}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
            <Highlight theme={themes.github} code={sourceCode} language="tsx">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className="rounded-lg p-4 overflow-x-auto" style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
