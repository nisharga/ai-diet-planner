import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";

export default function Loadingdialog({ loading }: { loading: boolean }) {
  return (
    <Modal transparent visible={loading}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000070",
        }}
      >
        <View
          style={{
            padding: 20,
            borderRadius: 15,
            backgroundColor: "#8837ff",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="white" />
          <Text
            style={{
              color: "white",
              marginTop: 8,
              fontSize: 18,
            }}
          >
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
}
