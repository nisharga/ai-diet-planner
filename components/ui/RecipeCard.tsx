import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GRAY, WHITE } from "../shared/Colors";

export default function RecipeCard({ recipe }: any) {
  const recipeJson = recipe?.jsonData;
  return (
    <Link href={`/recipe-detail?recipeId=${recipe?._id}`} asChild>
      <TouchableOpacity style={{ flex: 1, margin: 5 }}>
        <View>
          <Image
            source={{ uri: recipe?.imageURL }}
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
    </Link>
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
