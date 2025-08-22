import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { PRIMARY, YELLOW } from "./Colors";

const LoadingDialouge = ({ loading = false }: { loading: boolean }) => {
  return (
    <Modal transparent={true} visible={loading}>
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
            backgroundColor: YELLOW,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={PRIMARY} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
              color: PRIMARY,
            }}
          >
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingDialouge;
