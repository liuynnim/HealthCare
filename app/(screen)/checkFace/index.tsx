import SubHeader from "@/components/SubHeader";
import { Colors, SafeAreaViewStyles } from "@/styles/Common"
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
const iconChandoan = require("@/assets/image/chandoan.png")

const CheckFaceScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleDiagnose = () => {
    if (!selectedImage) return;
    // TODO: gọi API hoặc xử lý ảnh tại đây
    console.log("Diagnosing image:", selectedImage);
  };

  return (
    <View style={SafeAreaViewStyles.SafeAreaView}>
      <SubHeader source={iconChandoan} title={"Chẩn đoán sức khỏe"} />

      <View style={styles.container}>
        <Pressable style={styles.uploadBox} onPress={handlePickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.preview} />
          ) : (
            <View style={styles.iconWrapper}>
              <Image
                source={require("@/assets/image/camera.png")}
                style={styles.icon}
              />
              <Text style={styles.uploadText}>
                Nhấn để tải ảnh {"\n"}hoặc chụp trực tiếp
              </Text>
            </View>
          )}
        </Pressable>

        <Pressable
          style={[
            styles.button,
            { backgroundColor: selectedImage ? Colors.primary : "#e0e0e0" },
          ]}
          onPress={handleDiagnose}
          disabled={!selectedImage}
        >
          <Text
            style={[
              styles.buttonText,
              { color: selectedImage ? "#fff" : "#888" },
            ]}
          >
            Chẩn đoán
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CheckFaceScreen;