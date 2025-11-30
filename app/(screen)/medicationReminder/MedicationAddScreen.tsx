import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./addStyle";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MedicationAddScreen() {
  const [medicineName, setMedicineName] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");
  const [unit, setUnit] = useState<string>("Viên");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [frequency, setFrequency] = useState<string>("Mỗi ngày");
  const [time, setTime] = useState<string>("08:00");
  const [note, setNote] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleDatePicked = (date: Date) => {
    setStartDate(date);
    hideDatePicker();
  };

  return (
    <LinearGradient colors={["#F0F4F8", "#FFFFFF"]} style={styles.container}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Thêm thuốc</Text>

          {/* Tên thuốc */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tên thuốc *"
              value={medicineName}
              onChangeText={setMedicineName}
            />
          </View>

          {/* Toa thuốc */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Toa thuốc"
              value={prescription}
              onChangeText={setPrescription}
            />
          </View>

          {/* Lịch trình */}
          <View style={styles.scheduleSection}>
            <Text style={styles.scheduleTitle}>Lịch trình</Text>

            {/* Đơn vị */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Đơn vị</Text>
              <TextInput
                style={styles.input}
                value={unit}
                onChangeText={setUnit}
              />
            </View>

            {/* Ngày bắt đầu */}
            <Pressable onPress={showDatePicker} style={styles.inputContainer}>
              <Text style={styles.label}>Ngày bắt đầu uống</Text>
              <Text style={styles.input}>{startDate.toLocaleDateString()}</Text>
            </Pressable>

            {/* Tần suất */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tần suất</Text>
              <TextInput
                style={styles.input}
                value={frequency}
                onChangeText={setFrequency}
              />
            </View>

            {/* Thời gian */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Thời gian</Text>
              <TextInput
                style={styles.input}
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>

          {/* Ghi chú */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ghi chú (Không bắt buộc)</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              value={note}
              onChangeText={setNote}
              placeholder="Ví dụ: Uống trước khi ăn"
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
        onConfirm={handleDatePicked}
        onCancel={hideDatePicker}
        locale="vi-VN"
      />
    </LinearGradient>
  );
}
