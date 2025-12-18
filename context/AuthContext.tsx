import { STORAGE_KEY } from "@/constants/common";
import { NotifyTypeEnum } from "@/constants/notify";
import { LoginFormData } from "@/schema/loginSchema";
import { postLogin } from "@/services/api/auth/login";
import { notify } from "@/utils/notify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (payload: LoginFormData) => Promise<void>;
  loginLoading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: false,
  login: async (payload: LoginFormData) => {},
  loginLoading: false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const accessToken = await AsyncStorage.getItem(
          STORAGE_KEY.ACCESS_TOKEN
        );
        if (accessToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthState();
  }, []);

  const getMe = useMutation({
    mutationFn: (payload: LoginFormData) => postLogin(payload),
    onSuccess: async (res: any, payload) => {
      await AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, res.accessToken);
      await AsyncStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, res.refreshToken);
      await AsyncStorage.setItem(
        STORAGE_KEY.SAVED_LOGIN,
        JSON.stringify({
          username: payload.email,
          password: payload.password,
        })
      );
      setIsLoggedIn(true);
      notify("Đăng nhập thành công", NotifyTypeEnum.SUCCESS);
      router.replace("/(tabs)/ImageDiagnosis");
    },
    onError: (error: any) => {
      notify(
        error.response?.data?.message || "Đăng nhập thất bại",
        NotifyTypeEnum.ERROR
      );
    },
  });

  const login = async (payload: LoginFormData) => {
    getMe.mutate(payload);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("guest");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login,
        logout,
        loginLoading: getMe.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
