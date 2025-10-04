import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { GRAY, PRIMARY, WHITE, YELLOW } from "../shared/Colors";

export default function DateSelection({ setSelectedDate }: any) {
  const [dateList, setDateList] = useState<any>([]);
  const [selectedDate_, setSelectedDate_] = useState();

  useEffect(() => {
    GenerateDates();
  }, []);

  const GenerateDates = () => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = moment().add(i, "days").format("DD/MM/YYYY");
      result.push(nextDate);
    }
    setDateList(result);
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>
        Select Date
      </Text>
      <FlatList
        data={dateList}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(item);
              setSelectedDate_(item);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 7,
              borderWidth: 2,
              borderRadius: 12,
              margin: 5,
              minWidth: 80,
              backgroundColor: selectedDate_ === item ? YELLOW : WHITE,
              borderColor: selectedDate_ === item ? PRIMARY : GRAY,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {moment(item, "DD/MM/YYYY").format("ddd")}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {moment(item, "DD/MM/YYYY").format("DD")}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {moment(item, "DD/MM/YYYY").format("MMM")}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
