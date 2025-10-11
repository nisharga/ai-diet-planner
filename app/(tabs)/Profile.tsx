/* eslint-disable react-hooks/exhaustive-deps */

import { GRAY, WHITE } from "@/components/shared/Colors";
import { UserContext } from "@/context/UserContent";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { auth } from "./../../services/FirebaseConfig";

const MenuOption = [
  {
    title: "My Progress",

    path: "/(tabs)/Progress",
  },
  {
    title: "Explore Recipes",

    path: "/(tabs)/Meals",
  },
  {
    title: "Ai Recipes",

    path: "/generate-ai-recipe",
  },
  {
    title: "Logout",

    path: "logout",
  },
];

export default function Profile() {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  const OnMenuOptionClick = async (menu: any) => {
    if (menu.path === "logout") {
      await signOut(auth);
      setUser(null); // update context
      return;
    }
    router.push(menu.path);
  };

  useEffect(() => {
    if (user === null) {
      router.replace("/"); // navigate to root layout
    }
  }, [user]);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Profile
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Image
          source={require("./../../assets/images/usericon.png")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 99,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          {user?.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: GRAY,
            marginTop: 5,
          }}
        >
          {user?.email}
        </Text>
      </View>
      <FlatList
        data={MenuOption}
        style={{
          marginTop: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => OnMenuOptionClick(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              padding: 15,
              borderWidth: 0.2,
              marginTop: 5,
              borderRadius: 15,
              backgroundColor: WHITE,
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "300" }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
