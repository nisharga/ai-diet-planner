import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface User {
  _id?: string;
  email: string;
  name: string;
  credits: number;
  weight?: string;
  height?: string;
}

export const UserContext = createContext<any>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load user + token on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        const savedToken = await AsyncStorage.getItem("token");

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedToken) setToken(savedToken);
      } catch (e) {
        console.error("Failed to load auth data", e);
      }
    };
    loadData();
  }, []);

  // Save whenever user changes
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      AsyncStorage.removeItem("user");
    }
  }, [user]);

  // Save whenever token changes
  useEffect(() => {
    if (token) {
      AsyncStorage.setItem("token", token);
    } else {
      AsyncStorage.removeItem("token");
    }
  }, [token]);

  // Logout
  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.multiRemove(["user", "token"]);
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};
