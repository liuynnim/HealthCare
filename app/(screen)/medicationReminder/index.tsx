import GradientText from "@/components/GradientText";
import { Colors, FontSizes } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../styles/medicationReminder/styles";
import MedicationActionModal from "../../../components/Medication/MedicationActionModal";
import ScheduleCard from "@/components/Medication/ScheduleCard";
import { useNotificationPermission } from "@/hook/useNotificationPermission";
import { getListPrescriptions } from "@/services/api/medication/medication";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { MedicationSchedule } from "@/app/types/medication";
import { syncMedicationNotifications } from "@/hook/notification/notificationService";
import LoadingScreen from "@/components/Loading";

const generateDays = (centerDate: Dayjs, range: number) => {
  return Array.from({ length: range }, (_, i) => {
    const d = centerDate.subtract(Math.floor(range / 2), "day").add(i, "day");

    return {
      date: d, // Dayjs
      label: d.format("DD/MM"),
      weekday: d.locale("vi").format("ddd"),
    };
  });
};

export default function MedicationReminderScreen() {
  // xin quyền hệ thống
  const { status, requestPermission } = useNotificationPermission();

  const [actionVisible, setActionVisible] = useState(false);

  const today = dayjs();
  const [selectedDay, setSelectedDay] = useState<Dayjs>(today);
  const [days, setDays] = useState(() => generateDays(today, 14));
  const dayScrollRef = useRef<ScrollView>(null);
  // 14 ngày quanh hôm nay
  useEffect(() => {
    setDays(generateDays(selectedDay, 14));
  }, [selectedDay]);
  // Date picker
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDatePicked = (date: Date) => {
    setSelectedDay(dayjs(date));
    hideDatePicker();
  };

  useEffect(() => {
    const selectedIndex = days.findIndex((d) =>
      selectedDay.isSame(d.date, "day")
    );

    if (selectedIndex !== -1 && dayScrollRef.current) {
      const itemWidth = 60 + 10;
      const offset = selectedIndex * itemWidth - 14;
      dayScrollRef.current.scrollTo({ x: offset - itemWidth, animated: true });
    }
  }, [selectedDay, days]);

  const { data, isLoading } = useQuery({
    queryKey: ["prescriptions", selectedDay],
    queryFn: () => getListPrescriptions(selectedDay.format("YYYY-MM-DD")),
  });
  const medicineList: MedicationSchedule[] = data ?? [];

  useEffect(() => {
    if (medicineList?.length) {
      syncMedicationNotifications(medicineList);
    }
  }, [medicineList]);

  if (status === "denied") {
    return (
      <LinearGradient
        colors={["#0D0D0D", "#111122", "#0F1125"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
              fontSize: FontSizes.large,
            }}
          >
            Ứng dụng cần quyền thông báo để nhắc bạn uống thuốc đúng giờ
          </Text>

          <Pressable onPress={() => Linking.openSettings()}>
            <Text style={{ color: Colors.primary, marginTop: 16 }}>
              Mở cài đặt
            </Text>
          </Pressable>
        </SafeAreaView>
      </LinearGradient>
    );
  }
  const handleAddMedication = async () => {
    if (status !== "granted") {
      const granted = await requestPermission();
      if (!granted) return;
    }

    router.push("/(screen)/medicationReminder/components/MedicationAddScreen");
  };

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
                  selectedDay.isSame(d.date, "day") && styles.dayItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.dayWeekText,
                    selectedDay.isSame(d.date, "day") &&
                      styles.dayWeekTextActive,
                  ]}
                >
                  {d.weekday}
                </Text>

                <Text
                  style={[
                    styles.dayNumber,
                    selectedDay.isSame(d.date, "day") && styles.dayNumberActive,
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
          <Pressable style={styles.addButton} onPress={handleAddMedication}>
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
            {isLoading ? (
              <LoadingScreen />
            ) : medicineList.length > 0 ? (
              medicineList.map((item) => (
                <ScheduleCard
                  key={item.scheduleId}
                  name={item.drugName}
                  time={item.time}
                  dosage={item.dosage}
                  unit={item.unitName ?? "Viên"}
                  onPress={() => setActionVisible(true)}
                />
              ))
            ) : (
              <Text style={styles.placeholderText}>
                Không có lịch uống thuốc cho ngày này
              </Text>
            )}
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

        {/* ACTION MODAL */}
        <MedicationActionModal
          visible={actionVisible}
          onClose={() => setActionVisible(false)}
          name="Paracetamol 500mg"
          time="08:00"
          dosage="1 viên"
          onEdit={() => {}}
          onPause={() => {}}
          onDelete={() => {}}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
