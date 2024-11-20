"use client";
import VEditor from "@/components/simple-ui/editors/VEditor";
import React, { useState } from "react";

export default function page() {
  const [content, setContent] = useState("<p>Initial content</p>");

  return (
    <VEditor
      variant="default"
      content={content}
      setContent={setContent}
      isEditable={true}
    />
  );
}
