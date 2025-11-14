import GradientText from "@/components/GradientText";
import { NotifyTypeEnum } from "@/constants/notify";
import { analyzeSkin } from "@/services/api/AI/checkFace";
import { Colors } from "@/styles/Common";
import { notify } from "@/utils/notify";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

type Props = {
  selectedImage: string | undefined;
  setSelectedImage: Dispatch<SetStateAction<string | undefined>>;
  setData: Dispatch<SetStateAction<any>>;
};
const UploadSection: React.FC<Props> = ({
  selectedImage,
  setSelectedImage,
  setData,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const openImagePickerMenu = () => {
    const options = ["Chụp ảnh", "Chọn từ thư viện", "Hủy"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // CHỤP ẢNH
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled) setSelectedImage(result.assets[0].uri);
        }

        if (buttonIndex === 1) {
          // CHỌN TỪ THƯ VIỆN
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled) setSelectedImage(result.assets[0].uri);
        }
      }
    );
  };

  const uploadImage = useMutation({
    mutationFn: (imgUri: string) => analyzeSkin(imgUri),
    onSuccess: (response: any) => {
      notify(
        response?.message || "Phân tích thành công",
        NotifyTypeEnum.SUCCESS
      );
      setData(response);
    },
    onError: (error: any) => {
      notify(error.message || "Lỗi kết nối máy chủ", NotifyTypeEnum.ERROR);
    },
  });

  const onSubmit = () => {
    if (!selectedImage) return;
    uploadImage.mutate(selectedImage);
  };
  return (
    <View style={styles.content}>
      <GradientText
        colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
        style={styles.title}
      >
        Chuẩn đoán hình ảnh
      </GradientText>
      <Text style={styles.subtitle}>Tải lên hình ảnh khuân mặt của bạn</Text>

      {/* Hộp tải ảnh lên */}
      <Pressable style={styles.uploadBox} onPress={openImagePickerMenu}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Feather
              name="upload-cloud"
              size={60}
              color={Colors.accent_purple}
            />
            <Text style={styles.uploadText}>Nhấn để chọn hoặc chụp ảnh</Text>
            <Text style={styles.uploadSubtext}>Hỗ trợ PNG, JPG</Text>
          </View>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          (!selectedImage || uploadImage.isPending) && styles.buttonDisabled,
          pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
        ]}
        onPress={onSubmit}
        disabled={!selectedImage || uploadImage.isPending}
      >
        <LinearGradient
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
    </View>
  );
};

export default UploadSection;
