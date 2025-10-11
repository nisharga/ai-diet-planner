import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { UserContext } from "@/context/UserContent";
import { api } from "@/convex/_generated/api";
import { auth } from "@/services/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useConvex } from "convex/react";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

GoogleSignin.configure({
  webClientId:
    "74246080296-cj1u9k8tnh7nmucpc1o17hqisid5916b.apps.googleusercontent.com", // from Google Cloud Console
  offlineAccess: true,
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/calendar", // full calendar access
    "https://www.googleapis.com/auth/calendar.events", // manage events
  ],
});

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const convex = useConvex();
  const [user, setUser] = useContext(UserContext) as any;

  // router
  const router = useRouter();

  //   google login
  const handleGoolgeSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const user = {
          email: response?.data?.user?.email,
          name: response?.data?.user?.name,
          credits: 10,
        };
        setUser(user);
        if (user) {
          Alert.alert("User Login Successfully!!");

          // google calendar api fetch
          const tokens = await GoogleSignin.getTokens();
          const data = await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            }
          );

          const events = await data.json();
          if (events) {
            await AsyncStorage.setItem("event", JSON.stringify(events));
            await AsyncStorage.setItem(
              "accessToken",
              JSON.stringify(tokens.accessToken)
            );
            router.push("/auth/Meeting");
          }
        }
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert("already in progress!!");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("PLAY_SERVICES_NOT_AVAILABLE!!");
            break;
          default:
          // some other error happened
        }
      }
    }
  };

  /* const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }; */

  //   handle login
  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill all the values!!");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userId = userCredential.user;
        const userData = await convex.query(api.User.GetUser, {
          email: email,
        });
        console.log("🚀 ~ onSignIn ~ userId:", userId);
        setUser(userData);
        router.replace("/(tabs)/Home");
        if (user) {
          Alert.alert("User Login Successfully!!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("🚀 ~ onSignIn ~ errorCode:", errorCode);
        const errorMessage = error.message;
        Alert.alert("Invalid Email or Password", errorMessage);
      });
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        padding: 25,
      }}
    >
      {/* logo and text */}
      <Image
        source={require("../../assets/logo.jpg")}
        style={{
          width: 150,
          height: 150,
          marginTop: 100,
        }}
      />
      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
        }}
      >
        Welcome Back
      </Text>

      {/* SignInForm */}
      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
        <View style={{ width: "100%", marginTop: 20 }}>
          <Button title="Sign In" onPress={() => onSignIn()} />
        </View>

        {/* Divider */}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "black",
            marginTop: 20,
          }}
        />

        <View style={{ width: "100%", marginTop: 20 }}>
          <Button
            title="Arrange a meeting with our team"
            onPress={() => handleGoolgeSignIn()}
          />
        </View>

        {/* other */}
        <View style={{ width: "100%", marginTop: 20 }}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 15,
            }}
          >
            Dont&apos;t have an account?{" "}
          </Text>
          <Link href="/auth/SignUp" asChild>
            <Text
              style={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Create New Account
            </Text>
          </Link>
          {/* <Link href="/auth/SdkFiftyFour" asChild>
            <Text
              style={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Create SDK 54
            </Text>
          </Link> */}
        </View>
      </View>
    </View>
  );
};

export default SignIn;
