import React from "react";
import { Text, TextInput, View } from "react-native";

const Input = ({
  placeholder,
  label,
  password = false,
  onChangeText,
}: {
  placeholder: string;
  label?: string;
  password?: boolean;
  onChangeText: (value: any) => void;
}) => {
  return (
    <View style={{ marginTop: 15, width: "100%" }}>
      <Text style={{ fontWeight: "medium" }}>{label}</Text>
      <TextInput
        onChangeText={(value) => onChangeText(value)}
        secureTextEntry={password}
        placeholder={placeholder}
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          width: "100%",
          fontSize: 18,
          paddingVertical: 20,
          marginTop: 5,
        }}
      />
    </View>
  );
};

export default Input;
