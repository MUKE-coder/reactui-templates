import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { colors } from '@/lib/theme';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
  /** Optional pre-filled value (per-digit) for showcases. */
  initialValue?: string;
}

export default function OTPInput({
  length = 6,
  onComplete,
  initialValue = '',
}: OTPInputProps) {
  const [codes, setCodes] = useState<string[]>(() =>
    Array.from({ length }, (_, i) => initialValue[i] ?? '')
  );
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCodes = [...codes];
    newCodes[index] = text;
    setCodes(newCodes);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newCodes.every((c) => c.length === 1)) {
      onComplete(newCodes.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newCodes = [...codes];
      newCodes[index - 1] = '';
      setCodes(newCodes);
    }
  };

  return (
    <View className="flex-row items-center justify-center gap-1.5">
      {codes.map((code, index) => (
        <React.Fragment key={index}>
          <TextInput
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            className="w-[38px] h-[50px] rounded-xl border text-center text-[19px] font-bold text-neutral-900"
            style={{
              borderColor: code ? colors.primary.DEFAULT : colors.neutral[300],
              borderWidth: code ? 1.5 : 1,
              backgroundColor: code ? colors.primary.light : colors.neutral[100],
            }}
            maxLength={1}
            keyboardType="number-pad"
            value={code}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            accessibilityLabel={`OTP digit ${index + 1}`}
          />
          {index === Math.floor(length / 2) - 1 && (
            <View className="w-3 h-[2px] rounded-full bg-neutral-300" />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
