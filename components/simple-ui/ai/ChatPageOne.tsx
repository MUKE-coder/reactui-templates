"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Settings,
  User,
  Mail,
  FileText,
  Paperclip,
  ImageIcon,
  RefreshCw,
  Send,
} from "lucide-react";

export default function ChatPageOne() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const promptSuggestions = [
    {
      title: "Write a to-do list for a personal project or task",
      icon: User,
    },
    {
      title: "Generate an email ro reply to a job offer",
      icon: Mail,
    },
    {
      title: "Summarise this article or text for me in one paragraph",
      icon: FileText,
    },
    {
      title: "How does AI work in a technical capacity",
      icon: Settings,
    },
  ];

  const validateInput = (text: string) => {
    if (!text.trim()) {
      setError("Please enter a message");
      return false;
    }
    if (text.length > 1000) {
      setError("Message cannot exceed 1000 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateInput(input)) {
      console.log("User input:", input);
      // Clear input after successful submission
      setInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Clear error when user starts typing
    if (error && value.trim()) {
      setError("");
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setError("");
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Main Content */}
      <div className="w-full flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-4xl mx-auto w-full">
          {/* Welcome Section */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl font-semibold mb-4 text-gray-800">
              Hi there, Ui Mahadi
            </h1>
            <h2 className="text-4xl font-semibold mb-6 text-gray-800">
              What would like to know?
            </h2>
            <p className="text-gray-600 mb-8">
              Use one of the most common prompts
              <br />
              below or use your own to begin
            </p>
          </div>

          {/* Prompt Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-3xl">
            {promptSuggestions.map((suggestion, index) => {
              const IconComponent = suggestion.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
                  onClick={() => handlePromptClick(suggestion.title)}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {suggestion.title}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Refresh Prompts Button */}
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 mb-8"
            onClick={() => console.log("Refresh prompts clicked")}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Prompts
          </Button>
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="bg-white rounded-lg border border-gray-300 focus-within:border-gray-400 shadow-sm">
                <div className="flex items-center px-4 py-3">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask whatever you want..."
                    className="flex-1 bg-transparent border-none text-gray-900 placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                    maxLength={1000}
                  />
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-xs text-gray-600">All Web</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Paperclip className="w-4 h-4 mr-1" />
                      Add Attachment
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      Use Image
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600">
                      {input.length}/1000
                    </span>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-gray-900 text-white hover:bg-gray-800"
                      disabled={!input.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm mt-2 px-2">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
