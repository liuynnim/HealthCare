import { UNIT_DISPLAY } from "@/constants/medication";
import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type ScheduleCardMode = "edit" | "view";

type Props = {
  name: string;
  time: string;
  unit: string;
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
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.9 }]}
    >
      {/* LEFT: icon + info */}
      <View style={styles.leftContainer}>
        <Ionicons
          name="medkit-outline"
          size={30}
          color={Colors.primary_2}
          style={styles.icon}
        />

        <View style={styles.textWrapper}>
          <Text style={styles.medName} numberOfLines={2}>
            {name || "Tên thuốc"}
          </Text>

          <Text style={styles.medDose}>
            {dosage} {unit}
          </Text>
        </View>
      </View>

      {/* RIGHT: time + delete */}
      <View style={styles.rightContainer}>
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={16} color="#FFF" />
          <Text style={styles.timeText}>{time}</Text>
        </View>

        {mode === "edit" && (
          <Pressable onPress={onDelete} hitSlop={10} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={22} color="#FF6666" />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* LEFT */
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },

  icon: {
    marginRight: 12,
  },

  textWrapper: {
    flex: 1,
  },

  medName: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },

  medDose: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.small,
    color: Colors.text_secondary,
    marginTop: 4,
  },

  /* RIGHT */
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  timeText: {
    marginLeft: 6,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    color: "#FFF",
  },

  deleteBtn: {
    padding: 4,
  },
});
