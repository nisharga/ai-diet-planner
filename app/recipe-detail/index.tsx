import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const RecipeDetails = () => {
  const params = useLocalSearchParams();

  // Parse back from JSON
  const recipe = params?.recipe ? JSON.parse(params.recipe as string) : null;

  console.log("🚀 ~ RecipeDetails ~ recipe:", recipe);
  return (
    <View style={{ padding: 16 }}>
      <Text>RD {params?.description}</Text>
    </View>
  );
};

export default RecipeDetails;
