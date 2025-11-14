import { Colors } from "@/styles/Common";
import { LinearGradient } from "expo-linear-gradient";
import { Dispatch, SetStateAction } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import styles from "./styles";
type Props = {
  setSelectedImage: Dispatch<SetStateAction<string | undefined>>;
  data: any;
  setData: Dispatch<SetStateAction<any>>;
};
const ResultSection: React.FC<Props> = ({
  data,
  setData,
  setSelectedImage,
}) => {
  const handleTryAgain = () => {
    setData(null);
    setSelectedImage(undefined);
  };

  return (
    <View>
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
    </View>
  );
};

export default ResultSection;
