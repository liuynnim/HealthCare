import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/styles/Common";

export type ScheduleCardMode = "edit" | "view";

type Props = {
  name: string
  time: string;
  dosage: number;
  mode?: ScheduleCardMode;
  onPress?: () => void;
  onDelete?: () => void;
};

export default function ScheduleCard({
  name,
  time,
  dosage,
  mode = "view",
  onPress,
  onDelete,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        borderRadius: 14,
        backgroundColor: "#1C1C2E",
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT: Info (icon + medicine text) */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="medkit-outline"
          size={30}
          color={Colors.primary_2}
          style={{ marginRight: 12 }}
        />

        <View>
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {name}
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Liều: {dosage}
          </Text>
        </View>
      </View>

      {/* RIGHT: Time badge + delete */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {/* Time badge */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors.primary_2,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            alignItems: "center",
            gap: 6,
          }}
        >
          <Ionicons name="time-outline" size={16} color="#FFF" />
          <Text style={{ color: "#FFF", fontWeight: "600" }}>{time}</Text>
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
