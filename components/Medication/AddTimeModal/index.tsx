import { UNIT_DISPLAY } from "@/constants/medication";
import { AddReminderMedicationForm } from "@/schema/medicationSchema";
import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<AddReminderMedicationForm>;
  schedules: { time: string; dosage: number }[];
  editingIndex: number | null;
  unit: number;
};

export default function AddTimeModal({
  visible,
  setVisible,
  schedules,
  setValue,
  editingIndex,
  unit,
}: Props) {
  const isEditing = editingIndex !== null;
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [time, setTime] = useState("08:00");
  const [dosage, setDosage] = useState("1");

  /** Load data khi edit */
  useEffect(() => {
    if (isEditing && editingIndex !== null && schedules?.[editingIndex]) {
      setTime(schedules[editingIndex].time);
      setDosage(String(schedules[editingIndex].dosage));
    }
  }, [editingIndex, schedules]);

  const close = () => {
    setVisible(false);
    setTime("08:00");
    setDosage("1");
  };

  const handleSave = () => {
    const updated = Array.isArray(schedules) ? [...schedules] : [];
    const item = { time, dosage: Number(dosage) };

    if (isEditing && editingIndex !== null) {
      updated[editingIndex] = item;
    } else {
      updated.push(item);
    }

    setValue("schedules", updated);
    close();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* ===== HEADER ===== */}
          <Text style={styles.title}>
            {isEditing ? "Chỉnh sửa giờ uống" : "Thêm giờ uống thuốc"}
          </Text>

          {/* ===== TIME ===== */}
          <Pressable
            style={styles.timeCard}
            onPress={() => setTimePickerVisible(true)}
          >
            <Ionicons name="time-outline" size={22} color={Colors.primary_2} />
            <Text style={styles.timeText}>{time}</Text>
          </Pressable>

          {/* ===== DOSAGE ===== */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="medkit-outline"
              size={20}
              color={Colors.text_secondary}
            />
            <TextInput
              value={dosage}
              keyboardType="numeric"
              onChangeText={(t) => setDosage(t.replace(/[^0-9]/g, ""))}
              style={styles.input}
              placeholder="Liều lượng"
              placeholderTextColor={Colors.text_secondary}
            />
            <Text style={styles.unit}>{UNIT_DISPLAY[unit]}</Text>
          </View>

          {/* ===== ACTIONS ===== */}
          <View style={styles.actions}>
            <Pressable onPress={close}>
              <Text style={styles.cancelText}>Hủy</Text>
            </Pressable>

            <Pressable onPress={handleSave}>
              <LinearGradient
                colors={[Colors.primary, Colors.primary_2]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.saveBtn}
              >
                <Text style={styles.saveText}>
                  {isEditing ? "Lưu" : "Thêm"}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ===== TIME PICKER ===== */}
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={(d) => {
          const hh = String(d.getHours()).padStart(2, "0");
          const mm = String(d.getMinutes()).padStart(2, "0");
          setTime(`${hh}:${mm}`);
          setTimePickerVisible(false);
        }}
        onCancel={() => setTimePickerVisible(false)}
        locale="vi-VN"
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.large,
    color: Colors.text_primary,
    marginBottom: 16,
  },

  /* Time */
  timeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#262626",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },

  timeText: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    color: Colors.text_primary,
  },

  /* Dosage */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    gap: 8,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    color: Colors.text_primary,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
  },

  unit: {
    color: Colors.text_secondary,
    fontSize: FontSizes.small,
  },

  /* Actions */
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cancelText: {
    color: Colors.text_secondary,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
  },

  saveBtn: {
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 30,
  },

  saveText: {
    color: "#FFF",
    fontSize: FontSizes.medium,
    fontFamily: Fonts.medium,
  },
});
