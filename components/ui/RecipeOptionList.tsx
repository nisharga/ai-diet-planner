import { UserContext } from "@/context/UserContent";
import { api } from "@/convex/_generated/api";
import { generateFullRecipe } from "@/services/ai";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Loadingdialog from "../shared/Loadingdialog";

export default function RecipeOptionList({ recipeOption }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const [user] = useContext(UserContext);
  const router = useRouter();

  const onRecipeOptionSelect = async (recipe: any) => {
    console.log("🚀 ~ onRecipeOptionSelect ~ rr:", recipe);
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const result = await generateFullRecipe(
        recipe?.recipeName,
        recipe?.description
      );

      /* const image = await imageGeneration(recipe?.imagePrompt);
      console.log("🚀 ~ onRecipeOptionSelect ~ image:", image);

     if (!result || !image || !result.choices || !result.choices[0]) {
        throw new Error("Failed to generate recipe. Please try again.");
      }
*/
      // Save on DB
      const saveRecipeResult = await CreateRecipe({
        jsonData: JSON.stringify(recipe),
        imageUrl: "image",
        recipeName: recipe?.recipeName,
        uid: user?._id,
      });
      console.log("saveRecipeResult", saveRecipeResult);

      //  push db
      router.push({
        pathname: "/recipe-detail",
        params: { recipe: JSON.stringify(saveRecipeResult) },
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
      // Also show an alert
      Alert.alert("Recipe Generation Failed", "Try Again", [
        { text: "OK", onPress: () => setError(null) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Generated Ideas
      </Text>

      {/* Error Message Display */}
      {error && (
        <View
          style={{
            backgroundColor: "#ffebee",
            borderColor: "#f44336",
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: "#d32f2f",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            ⚠️ {error}
          </Text>
          <TouchableOpacity
            onPress={() => setError(null)}
            style={{
              alignSelf: "center",
              marginTop: 8,
              paddingHorizontal: 12,
              paddingVertical: 4,
              backgroundColor: "#f44336",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Dismiss
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View>
        {recipeOption?.recipes?.map((item: any, index: number) => (
          <TouchableOpacity
            onPress={() => {
              onRecipeOptionSelect(item);
            }}
            key={index}
            style={{
              marginTop: 15,
              padding: 15,
              borderWidth: 0.2,
              borderRadius: 15,
              opacity: loading ? 0.6 : 1, // Dim when loading
            }}
            disabled={loading} // Disable during loading
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item?.recipeName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "gray",
              }}
            >
              {item?.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Loadingdialog loading={loading} />
    </View>
  );
}
