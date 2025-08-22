import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   handle login
  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill all the values!!");
      return;
    }
    console.log("email", email);
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
