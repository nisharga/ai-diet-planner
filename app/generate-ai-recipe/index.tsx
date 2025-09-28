import Button from "@/components/shared/Button";
import RecipeOptionList from "@/components/ui/RecipeOptionList";
import { generateRecipeVariants } from "@/services/ai";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function GenerateAiRecipe() {
  const [input, setInput] = useState("");
  console.log("🚀 ~ GenerateAiRecipe ~ input:", input);
  const [loading, setLoading] = useState(false);
  const [recipeOption, setRecipeOption] = useState([]);
  console.log("🚀 ~ GenerateAiRecipe ~ recipeOption:", recipeOption);

  const handleGenerate = async () => {
    setLoading(true);
    if (!input) {
      Alert.alert("put a name first");
    }
    try {
      const res = await generateRecipeVariants(input);
      setRecipeOption(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error while generating recipe", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>AI Recipe Generator ✨</Text>
      <Text style={styles.subtitle}>
        Generate Personalized recipes using AI
      </Text>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your ingredient or recipe name"
        value={input}
        onChangeText={(value) => setInput(value)}
      />

      {/* Button */}

      <Button
        title="Generate Recipe"
        onPress={() => handleGenerate()}
        color="#8e2de2"
        loading={loading}
      />
      {recipeOption && <RecipeOptionList recipeOption={recipeOption} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "ios" ? 40 : 30,
    backgroundColor: "white",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 20,
    height: 150,
    textAlignVertical: "top",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#8e2de2", // purple
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
