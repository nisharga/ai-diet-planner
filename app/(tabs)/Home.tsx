import HomeHeader from "@/components/ui/HomeHeader";
import RecipeGenCard from "@/components/ui/RecipeGenCard";
import TodayProgress from "@/components/ui/TodayProgress";
import TodaysMealPlan from "@/components/ui/TodaysMealPlan";
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
        <RecipeGenCard />

        <TodaysMealPlan selectedDate="10/10/2025" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
