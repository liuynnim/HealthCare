import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientText from "@/components/GradientText";
import { Colors } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./medicationStyles";

const generateDays = (centerDate: Date, range: number) => {
  return Array.from({ length: range }, (_, i) => {
    const d = new Date(centerDate);
    d.setDate(centerDate.getDate() - Math.floor(range / 2) + i);

    return {
      date: d,
      label: d.getDate(),
      weekday: d.toLocaleDateString("vi-VN", { weekday: "short" }),
    };
  });
};

export default function MedicationReminderScreen() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const dayScrollRef = useRef<ScrollView>(null);
  const [days, setDays] = useState(generateDays(today, 14));
  // 14 ngày quanh hôm nay
  useEffect(() => {
    setDays(generateDays(selectedDay, 14));
  }, [selectedDay]);
  // Date picker
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDatePicked = (date: Date) => {
    setSelectedDay(date);
    hideDatePicker();
  };

  useEffect(() => {
    const selectedIndex = days.findIndex(
      (d) => d.date.toDateString() === selectedDay.toDateString()
    );

    if (selectedIndex !== -1 && dayScrollRef.current) {
      const itemWidth = 60 + 10;
      const offset = selectedIndex * itemWidth - 14;
      dayScrollRef.current.scrollTo({ x: offset - itemWidth, animated: true });
    }
  }, [selectedDay, days]);

  // Fake list thuốc
  const medicineList = [
    { name: "Paracetamol 500mg", time: "08:00", dose: "1 viên" },
    { name: "Vitamin C", time: "12:00", dose: "1 viên" },
    { name: "Hạ sốt", time: "20:00", dose: "2 viên" },
    { name: "Paracetamol 500mg", time: "08:00", dose: "1 viên" },
    { name: "Vitamin C", time: "12:00", dose: "1 viên" },
    { name: "Hạ sốt", time: "20:00", dose: "2 viên" },
    { name: "Paracetamol 500mg", time: "08:00", dose: "1 viên" },
    { name: "Vitamin C", time: "12:00", dose: "1 viên" },
    { name: "Hạ sốt", time: "20:00", dose: "2 viên" },
  ];

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />

        <View style={styles.content}>
          {/* TITLE */}
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={styles.title}
          >
            Nhắc uống thuốc
          </GradientText>

          {/* DAY SELECTOR */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={dayScrollRef}
            style={styles.dayScroll}
          >
            <Pressable style={[styles.dayItem]} onPress={showDatePicker}>
              <Ionicons name="calendar-clear-outline" size={40} color="#fff" />
            </Pressable>
            {days.map((d, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedDay(d.date)}
                style={[
                  styles.dayItem,
                  selectedDay.toDateString() === d.date.toDateString() &&
                    styles.dayItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.dayWeekText,
                    selectedDay.toDateString() === d.date.toDateString() &&
                      styles.dayWeekTextActive,
                  ]}
                >
                  {d.weekday}
                </Text>

                <Text
                  style={[
                    styles.dayNumber,
                    selectedDay.toDateString() === d.date.toDateString() &&
                      styles.dayNumberActive,
                  ]}
                >
                  {d.label}
                </Text>
              </Pressable>
            ))}

            {/* Ô mở DatePicker */}
            <Pressable style={[styles.dayItem]} onPress={showDatePicker}>
              <Ionicons name="calendar-clear-outline" size={40} color="#fff" />
            </Pressable>
          </ScrollView>

          {/* ADD BUTTON */}
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

          {/* LIST SCROLLABLE */}
          <ScrollView
            style={styles.listWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>
        </View>

        {/* DATE PICKER */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDatePicked}
          onCancel={hideDatePicker}
          locale="vi-VN"
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
