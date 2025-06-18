"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Paperclip,
  Mic,
  Send,
  List,
  Zap,
  UserPlus,
  Volume2,
} from "lucide-react";

export default function ChatPageTwo() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const featureCards = [
    {
      icon: Zap,
      color: "bg-blue-500",
      title: "Productivity Boost",
      description:
        "Start your day with focus. Set three main goals you want to accomplish.",
    },
    {
      icon: UserPlus,
      color: "bg-amber-500",
      title: "User-Friendly Onboarding",
      description:
        "Start your day with focus. Set three main goals you want to accomplish.",
    },
    {
      icon: Volume2,
      color: "bg-pink-500",
      title: "Voice-Activated Responses",
      description:
        "Start your day with focus. Set three main goals you want to accomplish.",
    },
  ];

  const validateInput = (text: string) => {
    if (!text.trim()) {
      setError("Please enter a message");
      return false;
    }
    if (text.length > 1500) {
      setError("Message cannot exceed 1500 characters");
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

  return (
    <div className="h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col h-full">
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-6 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-10 pointer-events-none">
            {Array.from({ length: 1600 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-gray-300"></div>
            ))}
          </div>

          {/* Green Orb */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-90 blur-md"></div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-300 to-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Welcome Content */}
          <div className="relative z-10 flex flex-col items-center justify-center mt-32 mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome to Relatus.AI
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Get started by Relatus a task and Chat can do the rest.
              <br />
              Not sure where to start?
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
              {featureCards.map((card, index) => (
                <Card key={index} className="p-4 border border-gray-200">
                  <div
                    className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}
                  >
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="rounded-lg border border-gray-300 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-6 px-4"
                />
                <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-500"
                    >
                      <Paperclip className="h-4 w-4 mr-1" /> Attach
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-500"
                    >
                      <Mic className="h-4 w-4 mr-1" /> Voice Message
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-500"
                    >
                      <List className="h-4 w-4 mr-1" /> Browse Prompts
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {input.length}/1500
                    </span>
                    <Button
                      type="submit"
                      size="icon"
                      className="h-8 w-8"
                      disabled={!input.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
          <div className="max-w-4xl mx-auto mt-4">
            <p className="text-xs text-gray-500 text-center">
              Relatus may display inaccurate info, so please double check the
              response.
              <a href="#" className="text-blue-600 hover:underline ml-1">
                Your Privacy & Relatus.AI
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
