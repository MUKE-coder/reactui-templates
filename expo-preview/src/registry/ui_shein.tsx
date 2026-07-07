import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import CountdownTimer from "@/components/ui/CountdownTimer";
import Toast from "@/components/ui/Toast";

function CountdownTimerDemo() {
  // endTime is a Date in the future; keep it stable across renders.
  const [endTime] = useState(() => new Date(Date.now() + 2 * 60 * 60 * 1000));
  return (
    <Stage center>
      <CountdownTimer endTime={endTime} />
    </Stage>
  );
}

function ToastDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <Stage center>
      <Text
        className="text-[14px] font-semibold text-[#EE1C24]"
        onPress={() => setVisible(true)}
      >
        Show toast
      </Text>
      <Toast
        visible={visible}
        message="Added to cart successfully"
        action={{ label: "VIEW", onPress: () => {} }}
        onDismiss={() => setVisible(false)}
        duration={3000}
      />
    </Stage>
  );
}

export const uiSheinRegistry: DemoRegistry = {
  "ui/CountdownTimer": () => <CountdownTimerDemo />,
  "ui/Toast": () => <ToastDemo />,
};
