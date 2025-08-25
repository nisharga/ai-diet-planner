import { UserContext } from "@/context/UserContent";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        "74246080296-1l2mhq80nir1q5u8uieio7j25i3hdocm.apps.googleusercontent.com",
      webClientId:
        "74246080296-cj1u9k8tnh7nmucpc1o17hqisid5916b.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  });

  return (
    <ConvexProvider client={convex}>
      <UserContext.Provider value={[user, setUser]}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </UserContext.Provider>
    </ConvexProvider>
  );
}
