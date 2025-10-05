import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GRAY, PRIMARY, WHITE, YELLOW } from "../shared/Colors";

export default function MealPlanCard({ MealPlanInfo, GetTodaysMealPlan }: any) {
  const UpdateStatus = useMutation(api.MealPlan.UpdateStatus);
  //   const {refreshData,setRefreshData}=useContext(RefreshDataContext);
  const onCheck = async (status: any) => {
    const result = await UpdateStatus({
      mealPlanId: MealPlanInfo?._id,
      status: status,
      calories: MealPlanInfo?.recipe?.jsonData?.calories || 0,
    });
    GetTodaysMealPlan();
    console.log("result", result);
    Alert.alert("Status Updated");
    // setRefreshData(Date.now());
  };

  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        backgroundColor: WHITE,
        borderRadius: 15,
        marginTop: 10,
      }}
    >
      <Image
        source={{ uri: MealPlanInfo?.recipe?.imageUrl }}
        style={{ width: 70, height: 70, borderRadius: 15 }}
      />
      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={styles.mealTypeText}> {MealPlanInfo?.mealType}</Text>
          <Text style={styles.recipeNameText}>
            {MealPlanInfo?.recipe?.recipeName}
          </Text>
          <Text style={styles.caloriesText}>
            {MealPlanInfo?.recipe?.jsonData?.calories} kcal
          </Text>
        </View>
        <View>
          {MealPlanInfo?.status !== true ? (
            <TouchableOpacity onPress={() => onCheck(true)}>
              <Ionicons name="square" size={24} color={GRAY} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onCheck(false)}>
              <Ionicons name="checkbox" size={24} color={GRAY} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mealTypeText: {
    backgroundColor: YELLOW,
    color: PRIMARY,
    padding: 1,
    paddingHorizontal: 10,
    borderRadius: 99,
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
  recipeNameText: {
    fontSize: 17,
    fontWeight: "bold",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: 200,
    marginTop: 5,
  },

  caloriesText: {
    fontSize: 16,
    fontWeight: "500",
    color: PRIMARY,
    marginTop: 5,
  },
});
