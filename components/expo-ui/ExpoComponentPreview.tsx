"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Smartphone, Wifi, SignalHigh, BatteryFull } from "lucide-react";
import { cn } from "@/lib/utils";
import { Highlight, themes } from "prism-react-renderer";
import { incrementComponentByName } from "@/actions/components";

interface ExpoComponentPreviewProps {
  /** Registry id in the sandbox, e.g. "ui/Button" — also the source-code key. */
  componentId: string;
  title: string;
  source: string;
  /** Copy count to display (from the SiteComponents counter). */
  downloads?: number;
  /** Phone screen height in px. */
  screenHeight?: number;
  /** Deprecated/ignored — kept so existing category pages compile. */
  route?: string;
}

export default function ExpoComponentPreview({
  componentId,
  title,
  source,
  downloads,
  screenHeight = 520,
}: ExpoComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    try {
      // Counter row name matches the seeded key: "expo:<id>.tsx".
      await incrementComponentByName(`expo:${componentId}.tsx`);
    } catch (error) {
      console.log(error);
    }
  };

  const iframeSrc = `/expo-preview/index.html?c=${encodeURIComponent(
    componentId
  )}`;

  return (
    <div className="w-full border border-border rounded-xl overflow-hidden bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <Badge
            variant="secondary"
            className="gap-1 bg-primary/10 text-primary hover:bg-primary/15"
          >
            <Smartphone className="w-3 h-3" />
            EXPO
          </Badge>
        </div>
        {typeof downloads === "number" && (
          <span className="text-xs text-muted-foreground tabular-nums">
            {downloads.toLocaleString()} copies
          </span>
        )}
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-end px-4 py-2 border-b border-border">
          <TabsList className="h-9">
            <TabsTrigger value="preview" className="text-sm">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-sm">
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="preview"
          className="m-0 flex justify-center py-12 bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] [background-size:16px_16px]"
        >
          <PhoneFrame>
            <iframe
              src={iframeSrc}
              title={`${title} preview`}
              className="h-full w-full border-0 bg-white"
              loading="lazy"
            />
          </PhoneFrame>
        </TabsContent>

        <TabsContent value="code" className="border-none p-0 m-0">
          <div className="relative">
            <button
              type="button"
              onClick={onCopy}
              aria-label="Copy code"
              className={cn(
                "absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium backdrop-blur transition-colors",
                copied
                  ? "border-green-500/40 bg-green-500/15 text-green-400"
                  : "border-white/15 bg-white/10 text-white/90 hover:bg-white/20"
              )}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied!" : "Copy code"}
            </button>
            <Highlight theme={themes.vsDark} code={source} language="tsx">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className="max-h-[520px] overflow-auto rounded-b-xl p-4 text-sm"
                  style={style}
                >
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

/** A realistic, full-height phone mockup whose screen is the sandbox iframe. */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[340px] shrink-0">
      {/* device body */}
      <div
        className="relative rounded-[52px] bg-neutral-950 p-[11px] ring-1 ring-white/10"
        style={{ boxShadow: "0 30px 70px -20px rgba(0,0,0,0.55)" }}
      >
        {/* side buttons */}
        <div className="absolute -left-[2px] top-[110px] h-9 w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -left-[2px] top-[164px] h-14 w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -left-[2px] top-[236px] h-14 w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -right-[2px] top-[188px] h-20 w-[3px] rounded-r bg-neutral-800" />

        {/* screen */}
        <div className="relative overflow-hidden rounded-[42px] bg-white">
          {/* status bar (chrome) */}
          <div className="relative z-10 flex h-11 items-center justify-between px-6 text-[13px] font-semibold text-neutral-900">
            <span className="w-14">9:41</span>
            {/* dynamic island */}
            <div className="absolute left-1/2 top-1/2 h-[26px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-950" />
            <div className="flex w-14 items-center justify-end gap-[3px]">
              <SignalHigh className="h-[15px] w-[15px]" strokeWidth={2.5} />
              <Wifi className="h-[15px] w-[15px]" strokeWidth={2.5} />
              <BatteryFull className="h-[18px] w-[18px]" strokeWidth={2} />
            </div>
          </div>

          {/* app content */}
          <div className="h-[572px]">{children}</div>

          {/* home indicator */}
          <div className="pointer-events-none absolute bottom-[7px] left-1/2 z-10 h-[5px] w-[110px] -translate-x-1/2 rounded-full bg-neutral-900/80" />
        </div>
      </div>
    </div>
  );
}
