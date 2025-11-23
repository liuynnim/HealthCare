// HealthScreen.tsx
import GradientText from "@/components/GradientText";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import healthStyles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/styles/Common";
const SCREEN_WIDTH = Dimensions.get("window").width;
const BAR_WIDTH = 22;

export default function HealthScreen() {
  const stepData = [
    { day: "T2", steps: 3200 },
    { day: "T3", steps: 5000 },
    { day: "T4", steps: 6800 },
    { day: "T5", steps: 7200 },
    { day: "T6", steps: 9000 },
    { day: "T7", steps: 4500 },
    { day: "CN", steps: 3000 },
  ];

  const maxSteps = Math.max(...stepData.map((d) => d.steps));
  const chartHeight = 160;

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={healthStyles.container}
    >
      <SafeAreaView edges={["top"]}>
        <View
          style={{
            position: "absolute",
            top: -40,
            right: -60,
            width: 320,
            height: 320,
            borderRadius: 320,
            backgroundColor: "#8B5CF6",
            opacity: 0.18,
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: -400,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: 300,
            backgroundColor: "#06B6D4",
            opacity: 0.08,
          }}
        />

        <View style={healthStyles.content}>
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={healthStyles.title}
          >
            7 ngày gần nhất
          </GradientText>

          {/* CUSTOM BAR CHART */}
          <View style={healthStyles.chartContainer}>
            {stepData.map((item, index) => {
              const barHeight = (item.steps / maxSteps) * chartHeight;

              return (
                <View key={index} style={healthStyles.barItem}>
                  <View
                    style={[
                      healthStyles.bar,
                      {
                        height: barHeight,
                      },
                    ]}
                  />
                  <Text style={healthStyles.dayLabel}>{item.day}</Text>
                </View>
              );
            })}
          </View>

          {/* METRICS CARD */}
          <View style={healthStyles.metricsCard}>
            <View style={healthStyles.metricsRow}>
              <View style={healthStyles.metricBlock}>
                <Ionicons
                  name="flame-outline"
                  size={26}
                  color={Colors.accent_red}
                  style={{ marginBottom: 6 }}
                />
                <Text style={healthStyles.metricLabel}>Calo</Text>
                <Text style={healthStyles.metricValue}>0</Text>
                <Text style={healthStyles.metricSub}>/500 kcal</Text>
              </View>

              <View style={healthStyles.metricBlock}>
                <MaterialCommunityIcons
                  name="shoe-print"
                  size={26}
                  color={Colors.primary_2}
                  style={{ marginBottom: 6 }}
                />
                <Text style={healthStyles.metricLabel}>Số bước</Text>
                <Text style={healthStyles.metricValue}>0</Text>
                <Text style={healthStyles.metricSub}>/6000 bước</Text>
              </View>

              <View style={healthStyles.metricBlock}>
                <Ionicons
                  name="time-outline"
                  size={26}
                  color={Colors.accent_blue}
                  style={{ marginBottom: 6 }}
                />
                <Text style={healthStyles.metricLabel}>Vận động</Text>
                <Text style={healthStyles.metricValue}>0</Text>
                <Text style={healthStyles.metricSub}>/30 phút</Text>
              </View>
            </View>

            <View style={healthStyles.standSection}>
              <Text style={healthStyles.standText}>Đứng 0 giờ</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
