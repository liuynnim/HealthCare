// HealthScreen.tsx
import GradientText from "@/components/GradientText";
import { Colors } from "@/styles/Common";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStepCounter } from "../../../hook/stepCountSensor";
import healthStyles from "./styles";
const getGradientByPercent = (percent: number): readonly [string, string] => {
  if (percent < 0.3) return ["#EF4444", "#F97316"] as const; // đỏ → cam

  if (percent < 0.6) return ["#F97316", "#FACC15"] as const; // cam → vàng

  if (percent < 0.8) return ["#FACC15", "#3B82F6"] as const; // vàng → xanh dương

  return ["#3B82F6", "#22C55E"] as const; // xanh dương → xanh lá
};
const DAILY_STEP_GOAL = 6000; // mục tiêu 1 ngày
const WEEKLY_CALO_GOAL = 500;
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
  const currentCalories = 250;

  const maxSteps = Math.max(...stepData.map((d) => d.steps));
  const chartHeight = 160;
  const { stepsToday, isAvailable } = useStepCounter();
  const caloriePercent = currentCalories / WEEKLY_CALO_GOAL;
  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={healthStyles.container}
    >
      <SafeAreaView edges={["top"]} style={healthStyles.safeArea}>
        {/* Background Decor */}
        <View style={healthStyles.circleTopRight} />
        <View style={healthStyles.circleBottomLeft} />

        <View style={healthStyles.content}>
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={[healthStyles.title, { marginBottom: 24 }]}
          >
            Mục tiêu tuần này
          </GradientText>
          <View style={healthStyles.progressContainer}>
            {/* Progress numbers left-right */}
            <View style={healthStyles.progressHeader}>
              <Text style={healthStyles.progressNumber}>0 kcal</Text>
              <Text style={healthStyles.progressNumber}>
                {WEEKLY_CALO_GOAL} kcal
              </Text>
            </View>

            {/* PROGRESS BAR */}
            <View style={healthStyles.progressBarBackground}>
              <LinearGradient
                colors={getGradientByPercent(caloriePercent)}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  healthStyles.progressBarFill,
                  { width: `${caloriePercent * 100}%` },
                ]}
              />
            </View>

            {/* CURRENT VALUE */}
            <Text style={healthStyles.progressCurrent}>
              {currentCalories} kcal
            </Text>
          </View>
          {/* METRICS CARD */}
          <View style={healthStyles.metricsCard}>
            <View style={healthStyles.metricsRow}>
              <View style={healthStyles.metricBlock}>
                <Ionicons
                  name="flame-outline"
                  size={26}
                  color={Colors.accent_red}
                  style={healthStyles.metricIcon}
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
                  style={healthStyles.metricIcon}
                />
                <Text style={healthStyles.metricLabel}>Số bước</Text>
                <Text style={healthStyles.metricValue}>{stepsToday}</Text>
                <Text style={healthStyles.metricSub}>/6000 bước</Text>
              </View>

              <View style={healthStyles.metricBlock}>
                <Ionicons
                  name="time-outline"
                  size={26}
                  color={Colors.accent_blue}
                  style={healthStyles.metricIcon}
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
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={[healthStyles.title, { marginTop: 32 }]}
          >
            7 ngày gần nhất
          </GradientText>

          {/* CUSTOM BAR CHART */}
          <View style={healthStyles.chartContainer}>
            {stepData.map((item, index) => {
              const barHeight = (item.steps / maxSteps) * chartHeight;
              const percent = item.steps / DAILY_STEP_GOAL;
              const colors = getGradientByPercent(percent);
              return (
                <View key={index} style={healthStyles.barItem}>
                  <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={[healthStyles.bar, { height: barHeight }]}
                  />
                  <Text style={healthStyles.dayLabel}>{item.day}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={healthStyles.buttonContainer}>
          {/* Button 1 */}
          <Pressable style={healthStyles.buttonWrapper}>
            <LinearGradient
              colors={[Colors.primary, Colors.primary_2]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[healthStyles.buttonGradient, healthStyles.shadowPrimary]}
            >
              <Ionicons name="sparkles-outline" size={18} color="#FFF" />
              <Text style={healthStyles.buttonText}>Tham khảo AI</Text>
            </LinearGradient>
          </Pressable>

          {/* Button 2 */}
          <Pressable style={healthStyles.buttonWrapper}>
            <LinearGradient
              colors={[Colors.primary, Colors.primary_2]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[
                healthStyles.buttonGradient,
                healthStyles.shadowSecondary,
              ]}
            >
              <Ionicons name="barbell-outline" size={18} color="#FFF" />
              <Text style={healthStyles.buttonText}>Lộ trình tập luyện</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
