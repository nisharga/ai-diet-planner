import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { UserContext } from "@/context/UserContent";
import { api } from "@/convex/_generated/api";
import { auth } from "@/services/FirebaseConfig";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { useConvex } from "convex/react";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const convex = useConvex();
  const [user, setUser] = useContext(UserContext) as any;

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
        }
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   handle login
  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill all the values!!");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userId = userCredential.user;
        console.log("🚀 ~ onSignIn ~ userId:", userId);
        const userData = await convex.query(api.User.GetUser, {
          email: email,
        });
        setUser(userData);
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

        <View style={{ width: "100%", marginTop: 20 }}>
          <Button title="Google Sign In" onPress={() => handleGoolgeSignIn()} />
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
        </View>
      </View>
    </View>
  );
};

export default SignIn;
