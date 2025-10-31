import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isLoggedIn: boolean;
  isGuest: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  skipLogin: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isGuest: false,
  isLoading: false,
  login: async () => { },
  logout: async () => { },
  skipLogin: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        // const userToken = await AsyncStorage.getItem("token");
        // const guestMode = await AsyncStorage.getItem("guest");
        // if (userToken) setIsLoggedIn(true);
        // else if (guestMode === "true") setIsGuest(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthState();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem("token", "dummy_token");
    setIsLoggedIn(true);
    setIsGuest(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("guest");
    setIsLoggedIn(false);
    setIsGuest(false);
  };

  const skipLogin = async () => {
    await AsyncStorage.setItem("guest", "true");
    setIsGuest(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isGuest, isLoading, login, logout, skipLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
