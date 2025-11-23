import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientText from "@/components/GradientText";
import { Colors } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import styles from "./medicationStyles";

export default function MedicationReminderScreen() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());

  // Fake list thuốc trong ngày
  const medicineList = [
    { name: "Paracetamol 500mg", time: "08:00", dose: "1 viên" },
    { name: "Vitamin C", time: "12:00", dose: "1 viên" },
    { name: "Hạ sốt", time: "20:00", dose: "2 viên" },
  ];

  // Tạo danh sách 14 ngày để scroll
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - 7 + i);
    return {
      label: d.getDate(),
      weekday: d.toLocaleDateString("vi-VN", { weekday: "short" }),
    };
  });

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        {/* Decor background */}
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />

        <View style={styles.content}>
          {/* Title */}
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={styles.title}
          >
            Nhắc uống thuốc
          </GradientText>

          {/* Scroll Days Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dayScroll}
          >
            {days.map((d, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedDay(d.label)}
                style={[
                  styles.dayItem,
                  selectedDay === d.label && styles.dayItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.dayWeekText,
                    selectedDay === d.label && styles.dayWeekTextActive,
                  ]}
                >
                  {d.weekday}
                </Text>

                <Text
                  style={[
                    styles.dayNumber,
                    selectedDay === d.label && styles.dayNumberActive,
                  ]}
                >
                  {d.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Add Button */}
          <Pressable style={styles.addButton}>
            <LinearGradient
              colors={[Colors.primary, Colors.primary_2]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.addGradient}
            >
              <Ionicons name="add" size={28} color="#fff" />
              <Text style={styles.addText}>Thêm thuốc</Text>
            </LinearGradient>
          </Pressable>

          {/* LIST REMINDER CARDS */}
          <View style={styles.listWrapper}>
            {medicineList.map((item, index) => (
              <View key={index} style={styles.medicineCard}>
                <View style={styles.medicineInfo}>
                  <Ionicons
                    name="medkit-outline"
                    size={30}
                    color={Colors.primary_2}
                    style={{ marginRight: 12 }}
                  />
                  <View>
                    <Text style={styles.medName}>{item.name}</Text>
                    <Text style={styles.medDose}>{item.dose}</Text>
                  </View>
                </View>

                <View style={styles.timeBadge}>
                  <Ionicons name="time-outline" size={18} color="#fff" />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
