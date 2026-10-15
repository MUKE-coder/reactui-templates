"use client";
import dynamic from "next/dynamic";

// `ssr: false` is only allowed inside a Client Component (Next 15+).
const PostHogPageView = dynamic(() => import("@/components/PostHogPageView"), {
  ssr: false,
});

export default PostHogPageView;
