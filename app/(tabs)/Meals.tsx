import TodaysMealPlan from "@/components/ui/TodaysMealPlan";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Meals = () => {
  return (
    <SafeAreaView>
      <TodaysMealPlan selectedDate="10/10/2025" />
    </SafeAreaView>
  );
};

export default Meals;
