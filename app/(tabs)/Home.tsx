import { UserContext } from "@/context/UserContent";
import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";

const Home = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!user[0]?.weight) {
      router.replace("/preference");
    }
  }, [router, user]);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
