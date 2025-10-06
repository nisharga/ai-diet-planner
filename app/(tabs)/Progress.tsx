import DateSelection from "@/components/ui/DateSelection";
import RecipeGenCard from "@/components/ui/RecipeGenCard";
import TodayProgress from "@/components/ui/TodayProgress";
import TodaysMealPlan from "@/components/ui/TodaysMealPlan";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const Progress = () => {
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("en-GB") // gives DD/MM/YYYY format
      .replace(/\//g, "/"); // ensures slash separator
    setSelectedDate(formattedDate);
  }, []);
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{
            padding: 20,
            paddingTop: 40,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Progress
          </Text>
          <DateSelection setSelectedDate={setSelectedDate} />
          <TodaysMealPlan date={selectedDate} />
          <TodayProgress />
          <RecipeGenCard />
        </View>
      }
    />
  );
};

export default Progress;
