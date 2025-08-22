import { UserContext } from "@/context/UserContent";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { useState } from "react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [user, setUser] = useState<any>();
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
