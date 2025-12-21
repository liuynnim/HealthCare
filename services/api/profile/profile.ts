import { axiosInstanceCalori } from "@/services/axiosInstance";

export async function getProfile() {
  const response = await axiosInstanceCalori.get("/user-profile");
  return response.data;
}

export async function updateProfile(payload: any) {
  const response = await axiosInstanceCalori.put("/user-profile", payload);
  return response.data;
}
