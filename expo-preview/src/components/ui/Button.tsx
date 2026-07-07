import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
} from "react-native";
import { colors } from "@/lib/theme";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text" | "destructive";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: "bg-primary",
    text: "text-white",
  },
  secondary: {
    container: "bg-transparent border-[1.5px] border-primary",
    text: "text-primary",
  },
  ghost: {
    container: "bg-transparent border-[1.5px] border-primary",
    text: "text-primary",
  },
  text: {
    container: "bg-transparent",
    text: "text-primary",
  },
  destructive: {
    container: "bg-error",
    text: "text-white",
  },
};

export default function Button({
  title,
  variant = "primary",
  loading = false,
  fullWidth = true,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const styles = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`h-[52px] rounded-full items-center justify-center ${styles.container} ${
        fullWidth ? "w-full" : "px-6"
      } ${isDisabled ? "opacity-50" : ""}`}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessibilityLabel={title}
      accessibilityRole="button"
      style={style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary" || variant === "destructive"
              ? colors.white
              : colors.primary.DEFAULT
          }
          size="small"
        />
      ) : (
        <Text className={`text-[16px] font-semibold ${styles.text}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
