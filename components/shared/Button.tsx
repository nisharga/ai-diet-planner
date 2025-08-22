import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { PRIMARY, WHITE } from "./Colors";

export default function Button({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={title === "Generating..."}
      style={{
        padding: 15,
        backgroundColor: PRIMARY,
        width: "100%",
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: WHITE, textAlign: "center" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
