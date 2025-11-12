import { PUBLIC_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosInstance } from "axios";
import { router } from "expo-router";
import { STORAGE_KEY } from "../constants/common";

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      const { data } = response;

      if (data?.code === 401) {
        AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
        router.replace("/(screen)/login");
      }
      if (data?.code === 400) {
        console.log(data.message || "Đã có lỗi xảy ra");
      }
      console.log("✅ RESPONSE:", response.status, response.data);
      return Promise.resolve(response.data);
    },
    async (error) => {
      const status = error?.response?.status;

      if (status === 401) {
        await AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
        router.replace("/(screen)/login");
      }
      console.log("❌ RESPONSE ERROR:", error, error);
      console.log("❌ RAW ERROR:", error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};

const BASE_URL = `${PUBLIC_URL}`;

const axiosInstance = createAxiosInstance(`${BASE_URL}api`);
console.log("📡 BASE_URL:", axiosInstance.defaults.baseURL);
export default axiosInstance;
