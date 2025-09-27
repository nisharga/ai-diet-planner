import React from "react";
import { Text, View } from "react-native";
import Button from "../shared/Button";
import { GRAY } from "../shared/Colors";

export default function RecipeGenCard() {
  return (
    <View
      style={{
        padding: 15,
        marginTop: 15,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: "white",
        }}
      >
        Need Meal Ideas ? 💡
      </Text>

      <Text
        style={{
          color: GRAY,
          fontSize: 15,
        }}
      >
        Let Our Al generate personalized recipes just for you!
      </Text>

      <Button title={"Generate with AI"} onPress={() => console.log("hi")} />
    </View>
  );
}
