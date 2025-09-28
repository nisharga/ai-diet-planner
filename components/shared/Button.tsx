import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { PRIMARY, WHITE } from "./Colors";

export default function Button({
  title,
  onPress,
  color,
  loading,
}: {
  title: string;
  onPress: () => void;
  color?: string;
  loading?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={title === "Generating..." || loading === true}
      style={{
        padding: 15,
        backgroundColor: color || PRIMARY,
        width: "100%",
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: WHITE, textAlign: "center" }}>
        {loading ? "thinking...." : title}
      </Text>
    </TouchableOpacity>
  );
}
