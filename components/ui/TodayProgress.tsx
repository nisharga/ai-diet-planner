import { UserContext } from "@/context/UserContent";
import moment from "moment/moment";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { PRIMARY, YELLOW } from "../shared/Colors";

export default function TodayProgress() {
  const [user] = useContext(UserContext);
  return (
    <View
      style={{
        padding: 15,
        marginTop: 15,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          // gap: 20
        }}
      >
        <Text
          style={{
            fontSize: 19,
            fontWeight: "bold",
          }}
        >
          Today&rsquo;s Goal
        </Text>
        <Text
          style={{
            fontSize: 17,
          }}
        >
          {moment().format("MMM/DD/YYYY")}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 27,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
          color: PRIMARY,
        }}
      >
        {user?.calories as any}/{40} kcal
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          marginTop: 1,
          color: PRIMARY,
        }}
      >
        You&#39;r Doing Great !!
      </Text>

      <View
        style={{
          backgroundColor: YELLOW,
          height: 10,
          marginTop: 10,
          borderRadius: 99,
        }}
      >
        <View
          style={{
            backgroundColor: PRIMARY,
            height: 10,
            borderRadius: 99,
            width: "50%",
          }}
        ></View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text>Calories Consumes</Text>
        <Text>Keep it up! 🔥</Text>
      </View>
    </View>
  );
}
