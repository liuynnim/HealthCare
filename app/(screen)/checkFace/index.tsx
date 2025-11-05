import Button from "@/components/Button";
import SubHeader from "@/components/SubHeader";
import { SafeAreaViewStyles } from "@/styles/Common";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
const iconChandoan = require("@/assets/image/chandoan.png")

const CheckFaceScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  }

  const handleDiagnose = () => {
    if (!selectedImage) return;
    console.log("Diagnosing image:", selectedImage);
  };

  return (
    <View style={SafeAreaViewStyles.SafeAreaView}>
      <SubHeader source={iconChandoan} title={"Chẩn đoán sức khỏe"} />

      <View style={styles.container}>
        <Pressable style={styles.uploadBox} onPress={pickImageAsync}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.preview} contentFit="contain" />
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
        <Button label="Chẩn đoán" theme="primary" onPress={handleDiagnose} disabled={!selectedImage} />
      </View>
    </View>
  );
};

export default CheckFaceScreen;