/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { UserContext } from "@/context/UserContent";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Button from "../shared/Button";
import { GRAY } from "../shared/Colors";
import MealPlanCard from "./MealPlanCard";

export default function TodaysMealPlan({ selectedDate }: any) {
  const [mealPlan, setMealPlan] = useState<any>([]);
  const convex = useConvex();
  const [user] = useContext(UserContext);

  //   router
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    (async () => {
      await GetTodaysMealPlan();
    })();
  }, [user]);

  const GetTodaysMealPlan = async () => {
    const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
      date: selectedDate ?? moment().format("DD/MM/YYYY"), // must match DB
      uid: user?._id,
    });
    setMealPlan(result);
  };

  return (
    <View style={{ margin: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Today's Meal Plan
      </Text>

      {mealPlan.length === 0 ? (
        <View style={{ display: "flex", alignItems: "center", padding: 20 }}>
          <Text
            style={{
              fontSize: 18,
              color: GRAY,
              marginBottom: 20,
            }}
          >
            You don't have any meal plan for Today
          </Text>
          <Button
            title={"Create New Meal Plan"}
            onPress={() => router.push("/generate-ai-recipe")}
          />
        </View>
      ) : (
        <FlatList
          data={mealPlan}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <MealPlanCard
              MealPlanInfo={item}
              GetTodaysMealPlan={GetTodaysMealPlan}
            />
          )}
        />
      )}
    </View>
  );
}
