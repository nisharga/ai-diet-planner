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

// interface UserContextType {
//   user: User | null;
//   setUser: Dispatch<SetStateAction<User | null>>;
//   logout: () => Promise<void>;
// }

export const UserContext = createContext<any>({
  user: null,
  setUser: () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Failed to load user", e);
      }
    };
    loadUser();
  }, []);

  // Save user whenever it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem("user");
        }
      } catch (e) {
        console.error("Failed to save user", e);
      }
    };
    saveUser();
  }, [user]);

  // Logout handler
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
