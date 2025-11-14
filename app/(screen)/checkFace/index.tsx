import { NotifyTypeEnum } from "@/constants/notify";
import { analyzeSkin } from "@/services/api/AI/checkFace";
import { Colors } from "@/styles/Common";
import { notify } from "@/utils/notify";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import styles from "./styles";

export default function ImageDiagnosisScreen() {
  // State từ logic cũ
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [data, setData] = useState<any>(null);

  // Hàm chọn ảnh (lấy từ logic cũ, áp dụng vào nút mới)
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  // Hàm thử lại (từ logic cũ)
  const handleTryAgain = () => {
    setData(null);
    setSelectedImage(undefined);
  };

  const uploadImage = useMutation({
    mutationFn: (imgUri: string) => analyzeSkin(imgUri),
    onSuccess: (response: any) => {
      notify(
        response?.message || "Phân tích thành công",
        NotifyTypeEnum.SUCCESS
      );
      console.log(response);
    },
    onError: (error: any) => {
      notify(error.message || "Lỗi kết nối máy chủ", NotifyTypeEnum.ERROR);
    },
  });

  const onSubmit = () => {
    if (!selectedImage) return;
    uploadImage.mutate(selectedImage);
  };

  // --- Render Màn hình ---
  return (
    <View style={styles.container}>
      {!data ? (
        <>
          <View style={styles.content}>
            <Text style={styles.title}>Chuẩn đoán hình ảnh</Text>
            <Text style={styles.subtitle}>
              Tải lên hình ảnh khuân mặt của bạn để phân tích
            </Text>

            {/* Hộp tải ảnh lên */}
            <Pressable style={styles.uploadBox} onPress={pickImageAsync}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.previewImage}
                />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Feather
                    name="upload-cloud"
                    size={60}
                    color={Colors.accent_purple}
                  />
                  <Text style={styles.uploadText}>Nhấn để tải ảnh lên</Text>
                  <Text style={styles.uploadSubtext}>Hỗ trợ PNG, JPG</Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Nút Chuẩn đoán */}
          <Pressable
            style={({ pressed }) => [
              styles.buttonContainer,
              (!selectedImage || uploadImage.isPending) &&
                styles.buttonDisabled,
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 }, // ← hiệu ứng
            ]}
            onPress={onSubmit}
            disabled={!selectedImage || uploadImage.isPending} // Logic vô hiệu hóa từ code cũ
          >
            <LinearGradient
              // Thay đổi màu khi bị vô hiệu hóa
              colors={
                !selectedImage || uploadImage.isPending
                  ? ["#373737", "#2A2A2A"]
                  : [Colors.primary, Colors.primary_2]
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            >
              <Text
                style={[
                  styles.buttonText,
                  (!selectedImage || uploadImage.isPending) &&
                    styles.buttonTextDisabled,
                ]}
              >
                Chuẩn đoán
              </Text>
            </LinearGradient>
          </Pressable>
        </>
      ) : (
        // ==============================
        // 2. MÀN HÌNH KẾT QUẢ (RESULT)
        // ==============================
        <>
          <View style={styles.content}>
            <Text style={styles.title}>Kết quả chẩn đoán</Text>
            <Text style={styles.subtitle}>{data.summary}</Text>

            {/* Khung kết quả có thể cuộn */}
            <ScrollView
              style={styles.resultBox}
              showsVerticalScrollIndicator={false}
            >
              {data.diagnosis.map((item: any, index: any) => (
                <View key={index} style={styles.resultItem}>
                  <Text style={styles.resultItemTitle}>{item.title}</Text>
                  <Text style={styles.resultItemDetail}>{item.detail}</Text>
                </View>
              ))}

              {/* Khuyến nghị */}
              <View style={styles.recommendationBox}>
                <Text style={styles.recommendationText}>
                  👉 {data.recommendation}
                </Text>
              </View>
            </ScrollView>
          </View>

          {/* Nút Thử lại */}
          <Pressable
            style={({ pressed }) => [
              styles.buttonContainer,
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
            onPress={handleTryAgain}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primary_2]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Thử lại</Text>
            </LinearGradient>
          </Pressable>
        </>
      )}
    </View>
  );
}

// StyleSheet
