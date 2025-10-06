import HomeHeader from "@/components/ui/HomeHeader";
import RecipeGenCard from "@/components/ui/RecipeGenCard";
import TodayProgress from "@/components/ui/TodayProgress";
import TodaysMealPlan from "@/components/ui/TodaysMealPlan";
import { UserContext } from "@/context/UserContent";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("en-GB") // gives DD/MM/YYYY format
      .replace(/\//g, "/"); // ensures slash separator
    setSelectedDate(formattedDate);
  }, []);

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

        <TodaysMealPlan selectedDate={selectedDate} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
