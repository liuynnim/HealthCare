import {
  FREQUENCY_OPTIONS,
  UNIT_OPTIONS,
  WEEK_DAYS_DISPLAY,
} from "@/constants/medication";
import { medicationSchema } from "@/schema/medicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../../../styles/medicationReminder/MedicationAddScreen/styles";
import CheckBoxDaysModal from "../../../../../components/CheckBoxDaysModal";

export default function MedicationAddScreen() {
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [showWeekModal, setShowWeekModal] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      drugName: "",
      unit_id: 1,
      start_date: new Date(),
      note: "",
      frequency_type: "DAILY",
      schedules: [
        {
          time: "08:00",
          dosage: 1,
        },
      ],
      days_of_week: [],
    },
  });

  const startDate = watch("start_date");
  const endDate = watch("end_date");
  const schedules = watch("schedules");
  const daysOfWeek = watch("days_of_week", []);

  const onSubmit = (data: any) => {
    console.log("FINAL FORM:", data);
  };

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

          {/* ===================== TÊN THUỐC ===================== */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Tên thuốc <Text style={styles.requiredMark}>*</Text>
            </Text>
            <Controller
              control={control}
              name="drugName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.drugName && (
              <Text style={styles.errorText}>{errors.drugName.message}</Text>
            )}
          </View>

          {/* ===================== ĐƠN VỊ ===================== */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Đơn vị <Text style={styles.requiredMark}>*</Text>
            </Text>
            <Controller
              control={control}
              name="unit_id"
              render={({ field: { onChange, value } }) => (
                <View style={[styles.selectBox]}>
                  <Picker
                    selectedValue={value}
                    onValueChange={(val) => onChange(val)}
                    style={{ color: "#FFF" }}
                    dropdownIconColor="#FFF"
                  >
                    {UNIT_OPTIONS.map((u) => (
                      <Picker.Item label={u.label} value={u.id} key={u.id} />
                    ))}
                  </Picker>
                </View>
              )}
            />
            {errors.unit_id && (
              <Text style={styles.errorText}>{errors.unit_id.message}</Text>
            )}
          </View>

          {/* ===================== NGÀY BẮT ĐẦU ===================== */}
          <Pressable
            onPress={() => setStartDatePickerVisible(true)}
            style={styles.inputContainer}
          >
            <Text style={styles.label}>
              Ngày bắt đầu uống <Text style={styles.requiredMark}>*</Text>
            </Text>

            <Text style={[styles.input, { lineHeight: 50 }]}>
              {startDate.toLocaleDateString()}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setEndDatePickerVisible(true)}
            style={styles.inputContainer}
          >
            <Text style={styles.label}>Ngày ngừng uống</Text>

            <Text style={[styles.input, { lineHeight: 50 }]}>
              {endDate ? endDate.toLocaleDateString() : undefined}
            </Text>
          </Pressable>

          {/* ===================== TẦN SUẤT ===================== */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Tần suất <Text style={styles.requiredMark}>*</Text>
            </Text>

            <Controller
              control={control}
              name="frequency_type"
              render={({ field: { onChange, value } }) => (
                <View style={[styles.selectBox]}>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={{ color: "#FFF" }}
                    dropdownIconColor="#FFF"
                  >
                    {FREQUENCY_OPTIONS.map((item) => (
                      <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            />
            {errors.frequency_type && (
              <Text style={styles.errorText}>
                {errors.frequency_type.message}
              </Text>
            )}
          </View>
          {watch("frequency_type") === "WEEKLY" && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Chọn các ngày trong tuần{" "}
                <Text style={styles.requiredMark}>*</Text>
              </Text>

              <Pressable
                onPress={() => setShowWeekModal(true)}
                style={[styles.selectBox]}
              >
                <Text style={{ color: "#FFF" }}>
                  {daysOfWeek.length > 0
                    ? daysOfWeek.map((d) => WEEK_DAYS_DISPLAY[d]).join(", ")
                    : "Chọn ngày"}
                </Text>
              </Pressable>

              {errors.days_of_week && (
                <Text style={styles.errorText}>
                  {errors.days_of_week.message}
                </Text>
              )}
            </View>
          )}
          {/* ===================== THỜI GIAN UỐNG (schedule[0]) ===================== */}
          <Pressable
            onPress={() => setTimePickerVisible(true)}
            style={styles.inputContainer}
          >
            <Text style={styles.label}>
              Thời gian <Text style={styles.requiredMark}>*</Text>
            </Text>

            <Text style={[styles.input, { lineHeight: 50 }]}>
              {schedules[0]?.time}
            </Text>
          </Pressable>

          {/* ===================== GHI CHÚ ===================== */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ghi chú</Text>
            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  multiline
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          {/* ===================== LƯU ===================== */}
          <Pressable style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.saveText}>Lưu</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>

      {/* ===================== DATE PICKER ===================== */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={(value) => {
          setStartDatePickerVisible(false);
          setValue("start_date", value);
        }}
        onCancel={() => setStartDatePickerVisible(false)}
        locale="vi-VN"
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={(value) => {
          setEndDatePickerVisible(false);
          setValue("end_date", value);
        }}
        onCancel={() => setEndDatePickerVisible(false)}
        locale="vi-VN"
      />

      {/* ===================== TIME PICKER ===================== */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(value) => {
          setTimePickerVisible(false);

          const hh = value.getHours().toString().padStart(2, "0");
          const mm = value.getMinutes().toString().padStart(2, "0");

          setValue("schedules.0.time", `${hh}:${mm}`);
        }}
        onCancel={() => setTimePickerVisible(false)}
        locale="vi-VN"
      />

      <CheckBoxDaysModal
        showWeekModal={showWeekModal}
        setShowWeekModal={setShowWeekModal}
        setValue={setValue}
        control={control}
      />
    </LinearGradient>
  );
}
