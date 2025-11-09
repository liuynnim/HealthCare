import { RegisterFromData } from "@/schema/RegisterSchema";
import axiosInstance from "@/services/axiosInstance";

export async function registerData(payload: RegisterFromData) {
  const response = await axiosInstance.post("/auth/register/start", payload);
  if (response.status === 204) {
    return { success: true };
  }
  return response.data;
}
