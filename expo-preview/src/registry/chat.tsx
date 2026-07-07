import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import ChatBubble from "@/components/chat/ChatBubble";
import VoiceMessage from "@/components/chat/VoiceMessage";

export const chatRegistry: DemoRegistry = {
  "chat/ChatBubble": () => (
    <Stage>
      <View className="bg-neutral-100 rounded-2xl py-4 -mx-1">
        <ChatBubble
          type="text"
          text="Hey! Are we still on for lunch today?"
          isSent={false}
          senderName="Ama Serwaa"
          timestamp="2026-07-06T12:24:00"
        />
        <ChatBubble
          type="text"
          text="Yes! I booked us a table for 1pm 🍜"
          isSent
          timestamp="2026-07-06T12:25:00"
        />
        <ChatBubble
          type="image"
          image="https://i.pravatar.cc/150?img=8"
          isSent={false}
          senderName="Ama Serwaa"
          timestamp="2026-07-06T12:26:00"
        />
      </View>
    </Stage>
  ),
  "chat/VoiceMessage": () => (
    <Stage>
      <View className="bg-neutral-100 rounded-2xl py-4 -mx-1">
        <VoiceMessage
          duration={12}
          isSent={false}
          timestamp="2026-07-06T09:14:00"
        />
        <VoiceMessage
          duration={27}
          isSent
          timestamp="2026-07-06T09:15:00"
        />
      </View>
    </Stage>
  ),
};
