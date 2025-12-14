import { UNIT_DISPLAY } from "@/constants/medication";
import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type ScheduleCardMode = "edit" | "view";

type Props = {
  name: string;
  time: string;
  unit: number;
  dosage: number;
  mode?: ScheduleCardMode;
  onPress?: () => void;
  onDelete?: () => void;
};

export default function ScheduleCard({
  name,
  time,
  unit,
  dosage,
  mode = "view",
  onPress,
  onDelete,
}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* LEFT: Info (icon + medicine text) */}
      <View style={styles.leftContainer}>
        <Ionicons
          name="medkit-outline"
          size={30}
          color={Colors.primary_2}
          style={styles.icon}
        />

        <View style={{ flex: 1, marginRight: 5 }}>
          <Text style={styles.infoText}>{name ? name : "Tên thuốc"}</Text>

          <Text style={styles.infoText}>
            {UNIT_DISPLAY[unit]}: {dosage}
          </Text>
        </View>
      </View>

      {/* RIGHT: Time badge + delete */}
      <View style={styles.rightContainer}>
        {/* Time badge */}
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={16} color="#FFF" />
          <Text style={styles.timeText}>{time}</Text>
        </View>

        {/* Delete button (only in edit mode) */}
        {mode === "edit" && (
          <Pressable onPress={onDelete}>
            <Ionicons name="trash-outline" size={22} color="#FF6666" />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#1C1C2E",
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3 / 5,
  },
  icon: {
    marginRight: 12,
  },
  infoText: {
    color: "#FFF",
    fontSize: FontSizes.medium,
    fontFamily: Fonts.medium,
    flexWrap: "wrap",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 2 / 5,
  },
  timeBadge: {
    flexDirection: "row",
    backgroundColor: Colors.primary_2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    color: "#FFF",
    fontFamily: Fonts.medium,
  },
});
