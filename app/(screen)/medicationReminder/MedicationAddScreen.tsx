import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./addStyle";

export default function MedicationAddScreen() {
  const [medicineName, setMedicineName] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");
  const [unit, setUnit] = useState<string>("Viên");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [frequency, setFrequency] = useState<string>("Mỗi ngày");
  const [time, setTime] = useState<Date>(new Date());
  const [note, setNote] = useState<string>("");

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Thêm thuốc</Text>

          {/* Tên thuốc */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Tên thuốc
              <Text style={styles.requiredMark}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={medicineName}
              onChangeText={setMedicineName}
            />
          </View>

          {/* Toa thuốc */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Toa thuốc</Text>
            <TextInput
              style={styles.input}
              value={prescription}
              onChangeText={setPrescription}
            />
          </View>

          {/* Lịch trình */}
          <View style={styles.scheduleSection}>
            <Text style={styles.scheduleTitle}>Lịch trình</Text>

            {/* Đơn vị */}
            <View style={styles.inputContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Đơn vị
                  <Text style={styles.requiredMark}> *</Text>
                </Text>
                {/* Controller... */}
              </View>
              <TextInput
                style={styles.input}
                value={unit}
                onChangeText={setUnit}
              />
            </View>

            {/* Ngày bắt đầu */}
            <Pressable
              onPress={() => setDatePickerVisible(true)}
              style={styles.inputContainer}
            >
              <Text style={styles.label}>
                Ngày bắt đầu uống
                <Text style={styles.requiredMark}> *</Text>
              </Text>
              <Text style={[styles.input, { lineHeight: 50 }]}>
                {startDate.toLocaleDateString()}
              </Text>
            </Pressable>

            {/* Tần suất */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Tần suất
                <Text style={styles.requiredMark}> *</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={frequency}
                onChangeText={setFrequency}
              />
            </View>

            {/* Thời gian */}
            <Pressable
              onPress={() => setTimePickerVisible(true)}
              style={styles.inputContainer}
            >
              <Text style={styles.label}>
                Thời gian
                <Text style={styles.requiredMark}> *</Text>
              </Text>
              <Text style={[styles.input, { lineHeight: 50 }]}>
                {time.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Pressable>
          </View>

          {/* Ghi chú */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ghi chú (Không bắt buộc)</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Lưu */}
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveText}>Lưu</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(value) => {
          setDatePickerVisible(false);
          setStartDate(value);
        }}
        onCancel={() => setDatePickerVisible(false)}
        locale="vi-VN"
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(value) => {
          setTimePickerVisible(false);
          setTime(value);
        }}
        onCancel={() => setTimePickerVisible(false)}
        locale="vi-VN"
      />
    </LinearGradient>
  );
}
