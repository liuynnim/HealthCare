import { axiosInstanceAI } from "@/services/axiosInstance";

export async function analyzeSkin(imageUri: string) {
  const formData = new FormData();
  formData.append("image", {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any);
  const response = await axiosInstanceAI.post("analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}
