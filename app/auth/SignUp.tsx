import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { UserContext } from "@/context/UserContent";
import { api } from "@/convex/_generated/api";
import { auth } from "@/services/FirebaseConfig";
import { useMutation } from "convex/react";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useContext(UserContext);
  console.log("🚀 ~ SignUp ~ user:", user);
  const createNewUser = useMutation(api.User.CreateNewUser);

  const router = useRouter();

  //   handle login
  const onSignUp = () => {
    if (!email || !password || !fullName) {
      Alert.alert("Missing Fields", "Please fill all the values!!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        if (user) {
          const result = await createNewUser({
            email: email,
            name: fullName,
          });
          setUser(result);
          if (user) {
            Alert.alert("User Created Successfully!!");
            router.push("/auth/SignIn");
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("🚀 ~ onSignUp ~ errorCode:", errorCode);
        const errorMessage = error.message;
        Alert.alert("Something went wrong", errorMessage);
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
        Sign Up
      </Text>

      {/* SignInForm */}
      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder="Full Name" onChangeText={setFullName} />
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
        <View style={{ width: "100%", marginTop: 20 }}>
          <Button title="Create New Account" onPress={() => onSignUp()} />
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
            Already have an account?{" "}
          </Text>
          <Link href="/auth/SignIn" asChild>
            <Text
              style={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
