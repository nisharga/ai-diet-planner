import HomeHeader from "@/components/ui/HomeHeader";
import TodayProgress from "@/components/ui/TodayProgress";
import { UserContext } from "@/context/UserContent";
import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!user[0]?.weight) {
      router.replace("/preference");
    }
  }, [router, user]);
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
        }}
      >
        <HomeHeader />
        <TodayProgress />
      </View>
    </SafeAreaView>
  );
};

export default Home;
