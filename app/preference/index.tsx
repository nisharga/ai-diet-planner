import Button from "@/components/shared/Button";
import { GRAY, PRIMARY, RED, WHITE } from "@/components/shared/Colors";
import Input from "@/components/shared/Input";
import { UserContext } from "@/context/UserContent";
import { api } from "@/convex/_generated/api";
import { calculateCaloriesAndProteins } from "@/services/ai";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Preference = () => {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");

  // user context
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  console.log("🚀 ~ Preference ~ user:", user);
  useEffect(() => {
    if (!user) {
      router.replace("/auth/SignIn");
    }
  }, [router, user]);

  // api
  const UpdateUserPreference = useMutation(api.User.UpdateUserPreference);

  const Oncontinue = async () => {
    if (!weight || !height || !goal || !gender) {
      Alert.alert("Oops!", "Some fields are still empty.");
      return;
    }

    const data = {
      uid: user?._id,
      weight: weight, // 48
      height: height, // 5.5
      gender: gender, // female
      goal: goal, // gain weight
    };

    const { proteins, calories } = await calculateCaloriesAndProteins(data);

    const result = await UpdateUserPreference({
      ...data,
      age: "",
      calories: calories,
      proteins: proteins,
    });

    console.log("result", result);

    setUser((prev: any) => ({
      ...prev,
      ...data,
    }));

    router.replace("/(tabs)/Home");
  };

  return (
    <SafeAreaView>
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
              onChangeText={setWeight}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="5.5-7.9"
              label="Height"
              onChangeText={setHeight}
            />
          </View>
        </View>

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
              <Text>Male</Text>
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
              <Text>Female</Text>
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
            <Ionicons name="person" size={24} color={RED} />
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

          {/* Gain Weight */}
          <TouchableOpacity
            onPress={() => setGoal("Gain Weight")}
            style={{
              padding: 13,
              marginTop: 10,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderWidth: goal === "Gain Weight" ? 1.7 : 1,
              borderColor: goal === "Gain Weight" ? PRIMARY : GRAY,
            }}
          >
            <Ionicons name="person" size={24} color={RED} />
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
                Gain Weight
              </Text>
              <Text>Increase healthy body mass</Text>
            </View>
          </TouchableOpacity>

          {/* Build Muscle */}
          <TouchableOpacity
            onPress={() => setGoal("Muscle gain")}
            style={{
              padding: 13,
              marginTop: 10,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderWidth: goal === "Muscle gain" ? 1.7 : 1,
              borderColor: goal === "Muscle gain" ? PRIMARY : GRAY,
            }}
          >
            <Ionicons name="person" size={24} color={RED} />

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
                Muscle Gain
              </Text>
              <Text>Build Muscle & get stronger</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* continue button */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Button title={"Continue"} onPress={Oncontinue} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Preference;
