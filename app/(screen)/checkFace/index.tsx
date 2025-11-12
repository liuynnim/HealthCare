import SubHeader from "@/components/SubHeader";
import { SafeAreaViewStyles } from "@/styles/Common";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import styles from "./styles";
const iconChandoan = require("@/assets/image/chandoan.png");

const mockResultData = {
  summary: "Khuôn mặt có dấu hiệu mệt mỏi nhẹ, vùng da dưới mắt hơi sạm.",
  diagnosis: [
    {
      title: "1️⃣ Da và vùng mắt",
      detail:
        "Có dấu hiệu thâm nhẹ ở vùng mắt, có thể do thiếu ngủ hoặc căng thẳng kéo dài.\n" +
        "Đề xuất: Nghỉ ngơi đủ giấc, kết hợp bổ sung vitamin C và uống đủ nước mỗi ngày.",
    },
    {
      title: "2️⃣ Màu da tổng thể",
      detail:
        "Màu da nhợt nhạt hơn so với bình thường, có khả năng cơ thể đang thiếu máu nhẹ hoặc thiếu dinh dưỡng.\n" +
        "Đề xuất: Ăn thêm các thực phẩm giàu sắt như thịt bò, trứng và rau xanh.",
    },
    {
      title: "3️⃣ Khu vực miệng và môi",
      detail:
        "Môi hơi khô và nhợt, có thể do cơ thể mất nước hoặc thời tiết hanh khô.\n" +
        "Đề xuất: Uống đủ nước (2–2.5L/ngày) và dùng son dưỡng môi không màu để bảo vệ môi.",
    },
  ],
  recommendation:
    "Tổng thể sức khỏe ổn định, chỉ cần điều chỉnh giấc ngủ, chế độ ăn và tăng cường vận động nhẹ mỗi ngày.",
};

const CheckFaceScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [data, setData] = useState<any>(mockResultData);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleDiagnose = () => {
    if (!selectedImage) return;
    console.log("Diagnosing image:", selectedImage);
  };

  return (
    <View style={SafeAreaViewStyles.SafeAreaView}>
      <SubHeader source={iconChandoan} title={"Chẩn đoán sức khỏe"} />

      {!data ? (
        <View style={styles.container}>
          <Pressable style={styles.uploadBox} onPress={pickImageAsync}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.preview}
                contentFit="contain"
              />
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
          <Pressable onPress={handleDiagnose} disabled={!selectedImage}>
            Chẩn đoán
          </Pressable>
        </View>
      ) : (
        <View style={styles.resultWrapper}>
          <Text style={styles.resultTitle}>Kết quả chẩn đoán</Text>

          {/* Khung có thể cuộn nếu nội dung dài */}
          <ScrollView
            style={styles.resultBox}
            contentContainerStyle={{ padding: 12 }}
            showsVerticalScrollIndicator
          >
            <Text style={styles.resultText}>{mockResultData.summary}</Text>

            {mockResultData.diagnosis.map((item, index) => (
              <View key={index} style={{ marginTop: 12 }}>
                <Text
                  style={[
                    styles.resultText,
                    { fontWeight: "600", color: "#14B8A6" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.resultText}>{item.detail}</Text>
              </View>
            ))}

            <View
              style={{
                marginTop: 16,
                paddingTop: 8,
                borderTopWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text
                style={[
                  styles.resultText,
                  { fontStyle: "italic", color: "#0F766E" },
                ]}
              >
                👉 {mockResultData.recommendation}
              </Text>
            </View>
          </ScrollView>

          <Pressable
            onPress={() => {
              setData(null);
              setSelectedImage(null);
            }}
          >
            Thử lại
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CheckFaceScreen;
