import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import PointsCard from "@/components/rewards/PointsCard";
import TierProgress from "@/components/rewards/TierProgress";
import ReferralCodeCard from "@/components/rewards/ReferralCodeCard";

function ReferralCodeCardDemo() {
  const [copied, setCopied] = useState(false);
  return (
    <Stage>
      <ReferralCodeCard
        code="SAVE20"
        onCopy={() => setCopied(true)}
        onShare={() => {}}
      />
      {copied ? (
        <Text className="text-[13px] text-[#7B2FBE] text-center font-semibold">
          Copied to clipboard!
        </Text>
      ) : null}
    </Stage>
  );
}

export const rewardsRegistry: DemoRegistry = {
  "rewards/PointsCard": () => (
    <Stage>
      <PointsCard balance={12450} tier="Gold Member" />
    </Stage>
  ),
  "rewards/TierProgress": () => (
    <Stage>
      <TierProgress
        currentTier="Silver"
        nextTier="Gold"
        progress={0.65}
        pointsToNext={3500}
      />
    </Stage>
  ),
  "rewards/ReferralCodeCard": () => <ReferralCodeCardDemo />,
};
