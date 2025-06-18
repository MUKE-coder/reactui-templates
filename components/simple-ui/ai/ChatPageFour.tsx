"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles } from "lucide-react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Copy,
  Download,
  Type,
} from "lucide-react";
interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const copyContent = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      navigator.clipboard.writeText(text);
    }
  };

  const downloadContent = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-content.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1 flex-wrap">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("formatBlock", "<h1>")}
              className="h-8 px-2 text-xs"
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("formatBlock", "<h2>")}
              className="h-8 px-2 text-xs"
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("formatBlock", "<p>")}
              className="h-8 px-2 text-xs"
              title="Paragraph"
            >
              <Type className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("bold")}
              className="h-8 px-2"
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("italic")}
              className="h-8 px-2"
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("underline")}
              className="h-8 px-2"
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("strikethrough")}
              className="h-8 px-2"
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("insertUnorderedList")}
              className="h-8 px-2"
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("insertOrderedList")}
              className="h-8 px-2"
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("formatBlock", "<blockquote>")}
              className="h-8 px-2"
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("justifyLeft")}
              className="h-8 px-2"
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("justifyCenter")}
              className="h-8 px-2"
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("justifyRight")}
              className="h-8 px-2"
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyContent}
            className="h-8 px-3"
          >
            <Copy className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Copy</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadContent}
            className="h-8 px-2"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsEditorFocused(true)}
        onBlur={() => setIsEditorFocused(false)}
        className={`min-h-[500px] p-6 outline-none prose prose-sm max-w-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-all ${
          !content ? "text-gray-400" : ""
        }`}
        style={{ whiteSpace: "pre-wrap" }}
        suppressContentEditableWarning={true}
        data-placeholder="Generated content will appear here. You can edit and format it using the toolbar above."
      />

      {!content && (
        <div className="flex items-center justify-center pointer-events-none mt-16">
          <div className="text-center mb-4 text-gray-400">
            <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No content generated yet</p>
            <p className="text-sm">
              Enter your topic and click "Create Content" to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default function ChatPageFour() {
  const [userInput, setUserInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async () => {
    if (!userInput.trim()) return;

    setIsGenerating(true);
    console.log("Generating content for:", userInput);

    // Simulate content generation
    setTimeout(() => {
      const sampleContent = `
        <h2>Niche Ideas for ${userInput}</h2>
        <p>Here are some unique and engaging niche concepts tailored for your interest in <strong>${userInput}</strong>:</p>
        
        <h3>1. Sustainable ${userInput} Solutions</h3>
        <p>Focus on eco-friendly approaches and sustainable practices within the ${userInput} industry. This niche appeals to environmentally conscious consumers.</p>
        
        <h3>2. ${userInput} for Beginners</h3>
        <p>Create content that helps newcomers understand the basics of ${userInput}. This educational approach builds a loyal audience.</p>
        
        <h3>3. Premium ${userInput} Reviews</h3>
        <p>Provide in-depth reviews and comparisons of high-end ${userInput} products or services.</p>
        
        <blockquote>
          <p><em>"The key to successful niche content is understanding your audience's specific needs and pain points."</em></p>
        </blockquote>
        
        <h3>Key Benefits:</h3>
        <ul>
          <li>Targeted audience engagement</li>
          <li>Higher conversion rates</li>
          <li>Reduced competition</li>
          <li>Authority building opportunities</li>
        </ul>
      `;

      setGeneratedContent(sampleContent);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Content Generator
                  </h1>
                  <p className="text-gray-600">
                    Get unique, engaging, and specially tailored content for
                    your needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="text-lg font-semibold text-gray-900">
                      What are you interested in?
                    </span>
                  </div>
                </div>

                <Input
                  placeholder="e.g., Health, Technology, Fashion, Business..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full h-14 text-base px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button
                onClick={generateContent}
                disabled={!userInput.trim() || isGenerating}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Content...
                  </div>
                ) : (
                  "Create Content"
                )}
              </Button>
            </div>
          </div>

          {/* Rich Text Editor Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Generated Content
              </h2>
              <p className="text-gray-600 mt-1">
                Edit and format your content below
              </p>
            </div>

            <RichTextEditor
              content={generatedContent}
              onChange={setGeneratedContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
