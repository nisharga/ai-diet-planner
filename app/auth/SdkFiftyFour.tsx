import * as Battery from "expo-battery";
import { useBatteryLevel } from "expo-battery";
import * as Brightness from "expo-brightness";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SdkFiftyFour = () => {
  const [brightness, setBrightness] = useState<number>(0.5);

  const batteryLevel = useBatteryLevel();
  const lowPowerMode = Battery.useLowPowerMode();
  const batteryState = Battery.useBatteryState();

  // Load brightness on mount
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        const current = await Brightness.getBrightnessAsync();
        setBrightness(current);
      } else {
        console.warn("Brightness permission not granted");
      }
    })();
  }, []);

  const increaseBrightness = async () => {
    const newBrightness = Math.min(brightness + 0.1, 1);
    await Brightness.setBrightnessAsync(newBrightness);
    setBrightness(newBrightness);
  };

  const decreaseBrightness = async () => {
    const newBrightness = Math.max(brightness - 0.1, 0);
    await Brightness.setBrightnessAsync(newBrightness);
    setBrightness(newBrightness);
  };

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 10 }}>
        SDK 54 Demo
      </Text>

      {/* 🔋 Battery Section */}
      <View style={{ padding: 10, borderWidth: 2, margin: 10 }}>
        <Text style={{ color: "red", fontSize: 20 }}>Battery Info</Text>
        <Text>Battery Level: {(batteryLevel * 100).toFixed(0)}%</Text>
        <Text>Low Power Mode: {lowPowerMode ? "Yes" : "No"}</Text>
        <Text>Battery State: {batteryState}</Text>
      </View>

      {/* 💡 Brightness Section */}
      <View style={{ padding: 10, borderWidth: 2, margin: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Current Brightness: {brightness.toFixed(2)}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button title="Decrease" onPress={decreaseBrightness} />
          <View style={{ width: 20 }} />
          <Button title="Increase" onPress={increaseBrightness} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SdkFiftyFour;
