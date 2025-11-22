import { SKIN_LABEL_VI } from "@/constants/AIFace";
import { Colors } from "@/styles/Common";
import getDetectedPosition from "@/utils/getDetectedPosition ";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import styles from "./resultStyles";

type Props = {
  data: any;
  setData: any;
  setSelectedImage: any;
};

const ResultSection: React.FC<Props> = ({
  data,
  setData,
  setSelectedImage,
}) => {
  const [activeTab, setActiveTab] = useState<"diet" | "lifestyle">("diet");

  const handleTryAgain = () => {
    setData(null);
    setSelectedImage(undefined);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Kết quả phân tích</Text>

      <Text style={styles.summaryText}>{data.health_issue_info}</Text>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Detection Cards */}
        <Text style={styles.sectionTitle}>Vấn đề được phát hiện</Text>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${data.annotated_image_base64}`,
          }}
          style={styles.resultImage}
        />
        {data.detection?.map((item: any, index: number) => (
          <View key={index} style={styles.detectCard}>
            <Text style={styles.detectTitle}>{`${
              SKIN_LABEL_VI[item.detected_class]
            } (${getDetectedPosition(
              item.bbox,
              data.metadata.image_size.width
            )})`}</Text>
            <Text style={styles.detectDetail}>
              Độ tin cậy: {(item.confidence * 100).toFixed(1)}%
            </Text>
          </View>
        ))}

        {/* Suggestions Section */}
        <Text style={styles.sectionTitle}>Gợi ý cải thiện</Text>

        {/* Tabs */}
        <View style={styles.tabWrapper}>
          <Pressable
            onPress={() => setActiveTab("diet")}
            style={[styles.tab, activeTab === "diet" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "diet" && styles.activeTabText,
              ]}
            >
              Dinh dưỡng
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("lifestyle")}
            style={[styles.tab, activeTab === "lifestyle" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "lifestyle" && styles.activeTabText,
              ]}
            >
              Lối sống
            </Text>
          </Pressable>
        </View>

        {/* Tab Content */}
        <View style={styles.listBox}>
          {(activeTab === "diet"
            ? data.lifestyle_suggestions.diet
            : data.lifestyle_suggestions.lifestyle
          ).map((tip: string, index: number) => (
            <Text key={index} style={styles.bulletItem}>
              • {tip}
            </Text>
          ))}
        </View>

        {/* Try Again Button */}
        <Pressable
          onPress={handleTryAgain}
          style={({ pressed }) => [
            styles.buttonContainer,
            pressed && { transform: [{ scale: 0.98 }], opacity: 0.8 },
          ]}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primary_2]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Thử lại</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ResultSection;
