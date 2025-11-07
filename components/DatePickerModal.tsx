import { Colors, Fonts, FontSizes } from "@/styles/Common";
import dayjs from "dayjs";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DatePickerModalProps {
  value?: string;
  onChange?: (date: string) => void;
  label?: string;
}

const DatePickerModal = ({ value, onChange }: DatePickerModalProps) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    const formatted = dayjs(date).format("DD-MM-YYYY");
    setPickerVisible(false);
    onChange?.(formatted);
  };

  return (
    <>
      <Pressable style={styles.input} onPress={() => setPickerVisible(true)}>
        <Text style={styles.inputText}>{value || "Chọn ngày sinh"}</Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        display="spinner"
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
        textColor={Colors.text_primary}
        themeVariant="dark"
      />
    </>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  label: {
    color: Colors.text_secondary,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.smaill,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#262626",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    justifyContent: "center",
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },
  inputText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    lineHeight: 22,
    color: Colors.text_primary,
  },
});
