import { UserContext } from "@/context/UserContent";
import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { PRIMARY } from "../shared/Colors";

export default function HomeHeader() {
  const [user] = useContext(UserContext);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
      }}
    >
      <Image
        source={require("../../assets/images/usericon.png")}
        style={{
          height: 66,
          width: 66,
        }}
      />
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Hello 👋
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: PRIMARY,
          }}
        >
          {user?.name}
        </Text>
      </View>
    </View>
  );
}
