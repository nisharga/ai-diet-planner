import { UserContext } from "@/context/UserContent";
import { api } from "@/convex/_generated/api";
import { generateFullRecipe, imageGeneration } from "@/services/ai";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GRAY, WHITE } from "../shared/Colors";

export default function RecipeCard({ recipe }: any) {
  const recipeJson = recipe?.jsonData;
  const router = useRouter();
  const [user] = useContext(UserContext);
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);

  const handlePress = async () => {
    try {
      const result = await generateFullRecipe(
        recipe?.recipeName,
        recipe?.description
      );

      const image = await imageGeneration(recipe?.imagePrompt);

      const saveRecipeResult = await CreateRecipe({
        jsonData: JSON.stringify(result),
        imageUrl: image,
        recipeName: recipe?.recipeName,
        uid: user?._id || "j5714s2fg9pe4d7ew89w23451d7rdf94",
      });

      console.log("saveRecipeResult", saveRecipeResult);

      router.push({
        pathname: "/recipe-detail",
        params: { recipe: JSON.stringify(saveRecipeResult) },
      });
    } catch (error) {
      console.error("Error generating or saving recipe:", error);
    }
  };

  return (
    <TouchableOpacity style={{ flex: 1, margin: 5 }} onPress={handlePress}>
      <View>
        <Image
          source={{ uri: recipe?.imageUrl }}
          style={{
            width: "100%",
            height: 140,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginTop: 10,
          }}
        />
        <View
          style={{
            padding: 10,
            backgroundColor: WHITE,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {recipe?.recipeName}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flexShrink: 1,
              marginTop: 5,
              gap: 5,
            }}
          >
            <View style={styles.infoContainer}>
              <Text
                style={{
                  fontSize: 14.5,
                  color: GRAY,
                }}
              >
                {recipeJson?.calories} kCal
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text
                style={{
                  fontSize: 14.5,
                  color: GRAY,
                }}
              >
                {recipeJson?.cookTime} Min
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
});
