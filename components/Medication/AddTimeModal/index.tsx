import { AddReminderMedicationForm } from "@/schema/medicationSchema";
import React, { Dispatch, SetStateAction, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<AddReminderMedicationForm>;
  schedules: { time: string; dosage: number }[];
  editingIndex: number | null; // được truyền từ ngoài vào
};

export default function AddTimeModal({
  visible,
  setVisible,
  schedules,
  setValue,
  editingIndex,
}: Props) {
  const isEditing = editingIndex !== null;

  const [timePickerVisible, setTimePickerVisible] = useState(false);

  // STATE bên trong modal
  const [time, setTime] = useState<string>("08:00");
  const [dosage, setDosage] = useState<string>("1");

  const openTimePicker = () => setTimePickerVisible(true);

  const resetAndClose = () => {
    setVisible(false);
    setTime("08:00");
    setDosage("1");
  };

  const handleSave = () => {
    const newItem = {
      time,
      dosage: Number(dosage),
    };

    let updated = [...schedules];

    if (isEditing) {
      // UPDATE
      updated[editingIndex!] = newItem;
    } else {
      // ADD NEW
      updated.push(newItem);
    }

    setValue("schedules", updated);
    resetAndClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            margin: 20,
            padding: 20,
            backgroundColor: "#222",
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10 }}>
            {isEditing ? "Chỉnh sửa thời gian" : "Thêm thời gian uống"}
          </Text>

          {/* TIME */}
          <Pressable
            onPress={openTimePicker}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#333",
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#fff" }}>Giờ: {time}</Text>
          </Pressable>

          {/* DOSAGE */}
          <TextInput
            style={{
              backgroundColor: "#333",
              borderRadius: 8,
              padding: 12,
              color: "#fff",
              marginBottom: 12,
            }}
            keyboardType="numeric"
            value={dosage}
            onChangeText={(text) => {
              const clean = text.replace(/[^0-9.]/g, "");
              setDosage(clean);
            }}
            placeholder="Liều lượng"
            placeholderTextColor="#666"
          />

          {/* ACTION BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Pressable
              onPress={resetAndClose}
              style={{ padding: 10, paddingHorizontal: 20 }}
            >
              <Text style={{ color: "#ccc" }}>Hủy</Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              style={{
                padding: 10,
                paddingHorizontal: 20,
                backgroundColor: "#4da6ff",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff" }}>
                {isEditing ? "Lưu" : "Thêm"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* TIME PICKER */}
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={(value) => {
          const hh = value.getHours().toString().padStart(2, "0");
          const mm = value.getMinutes().toString().padStart(2, "0");
          setTime(`${hh}:${mm}`);
          setTimePickerVisible(false);
        }}
        onCancel={() => setTimePickerVisible(false)}
      />
    </Modal>
  );
}
