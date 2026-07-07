import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import OTPInput from "@/components/shared/OTPInput";
import PriceDisplay from "@/components/shared/PriceDisplay";
import RedHeader from "@/components/shared/RedHeader";
import ScreenHeader from "@/components/shared/ScreenHeader";

function OTPDemo() {
  const [code, setCode] = useState("");
  return (
    <Stage>
      <Text className="text-[14px] font-semibold text-neutral-900 text-center">
        Enter the 4-digit code
      </Text>
      <OTPInput length={4} onComplete={(value) => setCode(value)} />
      <Text className="text-[13px] text-neutral-500 text-center">
        {code ? `Code entered: ${code}` : "Waiting for input…"}
      </Text>
    </Stage>
  );
}

export const sharedRegistry: DemoRegistry = {
  "shared/OTPInput": () => <OTPDemo />,
  "shared/PriceDisplay": () => (
    <Stage>
      <View className="flex-row items-center gap-3">
        <PriceDisplay amount={12.5} size="sm" />
        <PriceDisplay amount={49.99} size="md" />
        <PriceDisplay amount={129.0} size="lg" />
      </View>
      <PriceDisplay amount={19.99} size="lg" color="text-primary" />
    </Stage>
  ),
  "shared/RedHeader": () => (
    <RedHeader
      location="New York, USA"
      notificationCount={3}
      onNotificationPress={() => {}}
      onSearchPress={() => {}}
      onFilterPress={() => {}}
    />
  ),
  "shared/ScreenHeader": () => (
    <ScreenHeader
      title="Order details"
      showBack
      rightIcon="cart-outline"
      onRightPress={() => {}}
    />
  ),
};
