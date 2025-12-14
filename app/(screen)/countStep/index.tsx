// HealthScreen.tsx
import GradientText from "@/components/GradientText";
import { Colors, getGradientByPercent } from "@/styles/Common";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStepCounter } from "../../../hook/stepCountSensor";
import { currentCalories, stepData } from "@/mock/countStep";
import styles from "@/styles/countStep/styles";
import {
  CHAR_HEIGHT,
  DAILY_STEP_GOAL,
  WEEKLY_CALO_GOAL,
} from "@/constants/countStep";

export default function HealthScreen() {
  const maxSteps = Math.max(...stepData.map((d) => d.steps));

  const { stepsToday } = useStepCounter();
  const caloriePercent = currentCalories / WEEKLY_CALO_GOAL;
  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* Background Decor */}
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <ScrollView
          style={styles.safeArea}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <GradientText
              colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
              style={[styles.title]}
            >
              Mục tiêu tuần này
            </GradientText>
            <View style={styles.progressContainer}>
              {/* Progress numbers left-right */}
              <View style={styles.progressHeader}>
                <Text style={styles.progressNumber}>0 kcal</Text>
                <Text style={styles.progressNumber}>
                  {WEEKLY_CALO_GOAL} kcal
                </Text>
              </View>

              {/* PROGRESS BAR */}
              <View style={styles.progressBarBackground}>
                <LinearGradient
                  colors={getGradientByPercent(caloriePercent)}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[
                    styles.progressBarFill,
                    { width: `${caloriePercent * 100}%` },
                  ]}
                />
              </View>

              {/* CURRENT VALUE */}
              <Text style={styles.progressCurrent}>{currentCalories} kcal</Text>
            </View>
            {/* METRICS CARD */}
            <View style={styles.metricsCard}>
              <View style={styles.metricsRow}>
                <View style={styles.metricBlock}>
                  <Ionicons
                    name="flame-outline"
                    size={26}
                    color={Colors.accent_red}
                    style={styles.metricIcon}
                  />
                  <Text style={styles.metricLabel}>Calo</Text>
                  <Text style={styles.metricValue}>0</Text>
                  <Text style={styles.metricSub}>/500 kcal</Text>
                </View>

                <View style={styles.metricBlock}>
                  <MaterialCommunityIcons
                    name="shoe-print"
                    size={26}
                    color={Colors.primary_2}
                    style={styles.metricIcon}
                  />
                  <Text style={styles.metricLabel}>Số bước</Text>
                  <Text style={styles.metricValue}>{stepsToday}</Text>
                  <Text style={styles.metricSub}>/6000 bước</Text>
                </View>

                <View style={styles.metricBlock}>
                  <Ionicons
                    name="time-outline"
                    size={26}
                    color={Colors.accent_blue}
                    style={styles.metricIcon}
                  />
                  <Text style={styles.metricLabel}>Vận động</Text>
                  <Text style={styles.metricValue}>0</Text>
                  <Text style={styles.metricSub}>/30 phút</Text>
                </View>
              </View>

              <View style={styles.standSection}>
                <Text style={styles.standText}>Đứng 0 giờ</Text>
              </View>
            </View>
            <Pressable
              style={styles.foodActionCard}
              onPress={() => {
                // TODO: điều hướng sang màn AI tính calo từ food
                // router.push("/(screen)/food-ai");
              }}
            >
              <Ionicons
                name="restaurant-outline"
                size={24}
                color={Colors.accent_red}
              />

              <View style={styles.foodTextWrapper}>
                <Text style={styles.foodTitle}>Ghi bữa ăn</Text>
                <Text style={styles.foodDesc}>
                  Tính calo từ món bạn đã ăn hôm nay
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.text_secondary}
              />
            </Pressable>
            <GradientText
              colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
              style={[styles.title, { marginTop: 32 }]}
            >
              7 ngày gần nhất
            </GradientText>

            {/* CUSTOM BAR CHART */}
            <View style={styles.chartContainer}>
              {stepData.map((item, index) => {
                const barHeight = (item.steps / maxSteps) * CHAR_HEIGHT;
                const percent = item.steps / DAILY_STEP_GOAL;
                const colors = getGradientByPercent(percent);
                return (
                  <View key={index} style={styles.barItem}>
                    <LinearGradient
                      colors={colors}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      style={[styles.bar, { height: barHeight }]}
                    />
                    <Text style={styles.dayLabel}>{item.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {/* Button 1 */}
            <Pressable style={styles.buttonWrapper}>
              <LinearGradient
                colors={[Colors.primary, Colors.primary_2]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.buttonGradient, styles.shadowPrimary]}
              >
                <Ionicons name="sparkles-outline" size={18} color="#FFF" />
                <Text style={styles.buttonText}>Tham khảo AI</Text>
              </LinearGradient>
            </Pressable>

            {/* Button 2 */}
            <Pressable style={styles.buttonWrapper}>
              <LinearGradient
                colors={[Colors.primary, Colors.primary_2]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.buttonGradient, styles.shadowSecondary]}
              >
                <Ionicons name="barbell-outline" size={18} color="#FFF" />
                <Text style={styles.buttonText}>Lộ trình tập luyện</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
