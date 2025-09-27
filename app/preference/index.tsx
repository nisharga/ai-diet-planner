import { BLUE, GRAY, PRIMARY, RED, WHITE } from "@/components/shared/Colors";
import Input from "@/components/shared/Input";
import {
  BodyWeightFreeIcons,
  FemaleSymbolFreeIcons,
  MaleSymbolFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Preference = () => {
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  console.log("🚀 ~ Preference ~ goal:", goal);
  console.log("🚀 ~ Preference ~ gender:", gender);
  return (
    <View style={{ padding: 20, backgroundColor: WHITE, height: "100%" }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 30,
          marginBottom: 5,
        }}
      >
        Tell us about yourself
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: GRAY,
        }}
      >
        This Help us to create your personal meal plan
      </Text>

      {/* inputs */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Input
            placeholder="15-100"
            label="Weight"
            onChangeText={() => console.log("")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="5.5-7.9"
            label="Height"
            onChangeText={() => console.log("")}
          />
        </View>
      </View>

      {/* gender */}
      {/* Gender */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Gender
        </Text>

        <View
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setGender("Male")}
            style={{
              borderWidth: gender === "Male" ? 1.7 : 1,
              borderColor: gender === "Male" ? PRIMARY : GRAY,
              borderRadius: 10,
              padding: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={MaleSymbolFreeIcons}
              size={44}
              color={BLUE}
              strokeWidth={1.5}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender("Female")}
            style={{
              borderWidth: gender === "Female" ? 1.7 : 1,
              borderColor: gender === "Female" ? PRIMARY : GRAY,
              borderRadius: 10,
              padding: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={FemaleSymbolFreeIcons}
              size={44}
              color={RED}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Goals */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 17,
          }}
        >
          Whats Your Goal ?
        </Text>

        {/* Lose Weight */}
        <TouchableOpacity
          onPress={() => setGoal("Lose Weight")}
          style={{
            padding: 13,
            marginTop: 10,
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderWidth: goal === "Lose Weight" ? 1.7 : 1,
            borderColor: goal === "Lose Weight" ? PRIMARY : GRAY,
          }}
        >
          <HugeiconsIcon icon={BodyWeightFreeIcons} size={24} color={RED} />
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                fontSize: 19,
                fontWeight: "bold",
              }}
            >
              Lose Weight
            </Text>
            <Text>Trim down and feel lighter</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Preference;
