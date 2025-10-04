import Button from "@/components/shared/Button";
import AddToMealActionSheet from "@/components/ui/AddToMealActionSheet";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { api } from "../../convex/_generated/api";

export default function RecipeDetails() {
  const params = useLocalSearchParams();

  // action sheet
  const actionSheetRef = useRef<ActionSheetRef>(null);

  // Parse back from JSON
  const localSearchParams = params?.recipe
    ? JSON.parse(params.recipe as string)
    : null;

  const recipe = useQuery(api.Recipes.getByIdRecipe, {
    id: localSearchParams?._id,
  });

  const jsonData =
    recipe?.jsonData && typeof recipe.jsonData === "string"
      ? JSON.parse(recipe.jsonData)
      : recipe?.jsonData;

  console.log("recipe jsonData description:", jsonData);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (recipe) {
      setData(recipe);
    }
  }, [recipe]);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Recipe Image */}
      {data?.imageUrl && (
        <Image source={{ uri: data?.imageUrl }} style={styles.image} />
      )}

      {/* Recipe Header */}
      <View style={styles.header}>
        <Text style={styles.recipeTitle}>{jsonData.recipeName}</Text>
        <Text style={styles.recipeDescription}>{jsonData?.description}</Text>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{jsonData.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{jsonData.cookTime} min</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{jsonData.serveTo}</Text>
            <Text style={styles.statLabel}>Serve</Text>
          </View>
        </View>
      </View>

      {/* Ingredients */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {/* {Example (uncomment if json.ingredients exists) */}
        {jsonData.ingredients.map((item: any, index: number) => (
          <View key={index} style={styles.ingredientRow}>
            <Text style={styles.ingredientIcon}>{item.icon}</Text>
            <Text style={styles.ingredientText}>{item.ingredient}</Text>
            <Text style={styles.ingredientQuantity}>{item.quantity}</Text>
          </View>
        ))}
      </View>

      {/* Steps / Directions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Directions</Text>
        {/* {Example (uncomment if json.steps exists) */}
        {jsonData.steps.map((step: any, index: number) => (
          <View key={index} style={styles.stepRow}>
            <Text style={styles.stepIndex}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      {/* add meal to plan */}
      <View style={{ marginBottom: 40 }}>
        <Button
          title="Add Meal To Plan"
          onPress={() => actionSheetRef.current?.show()}
        />
      </View>

      <ActionSheet ref={actionSheetRef}>
        <AddToMealActionSheet recipeDetail={recipe} />
      </ActionSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: Platform.OS === "ios" ? 40 : 30,
    paddingHorizontal: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  header: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  recipeDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#6B21A8", // purple-600
    fontWeight: "bold",
    fontSize: 16,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ingredientIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  ingredientText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },
  ingredientQuantity: {
    marginLeft: 8,
    color: "#666",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    backgroundColor: "#F3E8FF", // purple-50
    padding: 12,
    borderRadius: 8,
  },
  stepIndex: {
    backgroundColor: "#6B21A8",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    fontWeight: "bold",
  },
  stepText: {
    flex: 1,
    color: "#333",
  },
});
