import GradientText from "@/components/GradientText";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/styles/Common";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./profileStyles";

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    email: "example@gmail.com",
    weight: "70",
    height: "175",
  });
  const { logout } = useAuth();
  
  const [editingField, setEditingField] = useState<
    "email" | "weight" | "height" | null
  >(null);

  const handleSave = () => setEditingField(null);

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]}>
        {/* Background Decor */}
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />

        <View style={styles.content}>
          {/* Name */}
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={styles.title}
          >
            Nguyen Van A
          </GradientText>

          {/* Profile Cards */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Email</Text>

            {editingField === "email" ? (
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(t) => setProfile({ ...profile, email: t })}
              />
            ) : (
              <Text style={styles.cardValue}>{profile.email}</Text>
            )}

            <Pressable
              onPress={() =>
                setEditingField(editingField === "email" ? null : "email")
              }
            >
              <Text style={styles.editText}>
                {editingField === "email" ? "Lưu" : "Sửa"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Cân nặng</Text>

            {editingField === "weight" ? (
              <TextInput
                style={styles.input}
                value={profile.weight}
                keyboardType="numeric"
                onChangeText={(t) => setProfile({ ...profile, weight: t })}
              />
            ) : (
              <Text style={styles.cardValue}>{profile.weight} kg</Text>
            )}

            <Pressable
              onPress={() =>
                setEditingField(editingField === "weight" ? null : "weight")
              }
            >
              <Text style={styles.editText}>
                {editingField === "weight" ? "Lưu" : "Sửa"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Chiều cao</Text>

            {editingField === "height" ? (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={profile.height}
                onChangeText={(t) => setProfile({ ...profile, height: t })}
              />
            ) : (
              <Text style={styles.cardValue}>{profile.height} cm</Text>
            )}

            <Pressable
              onPress={() =>
                setEditingField(editingField === "height" ? null : "height")
              }
            >
              <Text style={styles.editText}>
                {editingField === "height" ? "Lưu" : "Sửa"}
              </Text>
            </Pressable>
          </View>

          {/* Logout Button */}
          <Pressable style={styles.logoutBtn} onPress={logout}>
            <LinearGradient
              colors={[Colors.primary, Colors.primary_2]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.logoutGradient}
            >
              <Text style={styles.logoutText}>Log out</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
