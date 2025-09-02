import Button from "@/components/shared/Button";
import { WHITE } from "@/components/shared/Colors";
import { useRouter } from "expo-router";
import { Dimensions, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      {/* Splash Background Image  */}
      <Image
        source={require("../assets/landing.jpg")}
        style={{ width: "100%", height: Dimensions.get("screen").height }}
      />

      {/* Overlay and content */}
      {/* Overlay and content */}
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: Dimensions.get("screen").height,
          backgroundColor: "#0707075e",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/logo.jpg")}
          style={{
            width: 150,
            height: 150,
            marginTop: 100,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: WHITE,
          }}
        >
          Ai Diet Plan
        </Text>

        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            fontSize: 20,
            color: WHITE,
            marginTop: 15,
            opacity: 0.8,
          }}
        >
          Craft delicious food menu for your healthy calorie count
        </Text>
      </View>

      {/* Get Started Btn */}
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 15,
          padding: 20,
        }}
      >
        <Button
          title="Get Started"
          onPress={() => router.push("./auth/SignIn")}
        />
      </View>
    </View>
  );
}
