"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Plus, ArrowUp, X, MessageCircle } from "lucide-react";

export default function ChatPageThree() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  const suggestionPrompts = [
    "How do I prepare for web designer interview?",
    "What are the key principles of effective web design?",
    "What are the best design trends for websites in 2025?",
  ];

  const recentChats = [
    { title: "New chat", time: "20 secs ago" },
    {
      title: "Give me unique name logo for CRM dashboard",
      time: "45 mins ago",
    },
    { title: "Create SaaS web app categories", time: "3 hour ago" },
  ];

  const validateInput = (text: string) => {
    if (!text.trim()) {
      setError("Please enter a message");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateInput(input)) {
      console.log("User input:", input);
      setInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (error && value.trim()) {
      setError("");
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setError("");
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Banner */}
      {showBanner && (
        <div className="bg-black text-white px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span>Get Jolly AI Chat for Chrome</span>
            <Button
              variant="link"
              className="text-white p-0 h-auto underline text-sm"
            >
              Install Extension
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white h-6 w-6"
            onClick={() => setShowBanner(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Promotional Banner */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">LIMITED</Badge>
                <span className="text-sm">
                  Get 1 month FREE by paying annually
                </span>
                <Button
                  variant="link"
                  className="text-purple-600 p-0 h-auto underline text-sm"
                >
                  View Discount
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <h1 className="text-3xl font-semibold text-gray-900">
                  Start talking to
                </h1>
                <div className="flex items-center gap-1">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">J</span>
                  </div>
                  <span className="text-3xl font-semibold text-purple-600">
                    Jolly
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-8">
                Your friendly AI chat assistant! Need quick answers, smart
                suggestions, or just a cheerful conversation?
                <br />
                Jolly is here to help with a smile. Start chatting now! 😊
              </p>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Write a question..."
                  className="w-full h-20 pr-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-base"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-3 top-6 h-8 w-8 bg-gray-900 hover:bg-gray-800"
                  disabled={!input.trim()}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>

            {/* Model Selector */}
            <div className="mb-6">
              <Button variant="outline" className="h-8 text-sm">
                GPT-4o mini <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>

            {/* Add Content Button */}
            <div className="mb-6">
              <Button variant="outline" className="h-8 text-sm">
                <Plus className="w-4 h-4 mr-1" />
                Add content
              </Button>
            </div>

            {/* Suggestion Prompts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {suggestionPrompts.map((prompt, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors border-gray-200"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <p className="text-sm text-gray-700">{prompt}</p>
                </Card>
              ))}
            </div>

            {/* Recent Chat */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Chat
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentChats.map((chat, index) => (
                  <Card
                    key={index}
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {chat.title}
                        </p>
                        <p className="text-xs text-gray-500">{chat.time}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
