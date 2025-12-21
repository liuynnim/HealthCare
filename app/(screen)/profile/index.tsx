import GradientText from "@/components/GradientText";
import LoadingScreen from "@/components/Loading";
import { NotifyTypeEnum } from "@/constants/notify";
import { useAuth } from "@/context/AuthContext";
import { getProfile, updateProfile } from "@/services/api/profile/profile";
import { Colors } from "@/styles/Common";
import { notify } from "@/utils/notify";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../styles/profile/styles";

export interface ProfileData {
  activity_level: string;
  created_at: string;
  date_of_birth: string;
  gender: string | null;
  goal_type: string;
  height_cm: number;
  updated_at: string;
  user_email: string;
  weight_kg: number;
}

type ProfileForm = {
  weight_kg: string;
  height_cm: string;
  gender: string;
};

const GENDER_OPTIONS = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
  { label: "Khác", value: "other" },
];

const genderLabel = (value: string | null) => {
  return GENDER_OPTIONS.find((g) => g.value === value)?.label ?? "Chưa chọn";
};

const calculateAge = (dob: string) => {
  const birth = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export default function ProfileScreen() {
  const { logout } = useAuth();

  const [editingField, setEditingField] = useState<
    "gender" | "weight" | "height" | null
  >(null);

  const { control, handleSubmit, reset, watch } = useForm<ProfileForm>({
    defaultValues: {
      weight_kg: "",
      height_cm: "",
      gender: "",
    },
  });

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery<ProfileData>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  useEffect(() => {
    if (profile) {
      reset({
        weight_kg: profile.weight_kg.toString() ?? "",
        height_cm: profile.height_cm.toString() ?? "",
        gender: profile.gender ?? "",
      });
    }
  }, [profile, reset]);

  const updateData = useMutation({
    mutationFn: (data: any) => {
      return updateProfile(data);
    },
    onSuccess: () => {
      notify("Cập nhật thông tin thành công!", NotifyTypeEnum.SUCCESS);
      refetch();
    },
    onError: () => {
      notify("Cập nhật thông tin thất bại!", NotifyTypeEnum.ERROR);
    },
  });

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} >
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
        {isLoading ? (
          <LoadingScreen />
        ) : profile ? (
          <View style={styles.content}>
            {/* Name */}
            <GradientText
              colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
              style={styles.title}
            >
              Hồ sơ
            </GradientText>

            {/* Profile Cards */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Email</Text>

              <Text style={styles.cardValue}>{profile.user_email}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Tuổi</Text>
              <Text style={styles.cardValue}>
                {calculateAge(profile.date_of_birth)} tuổi
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Cân nặng</Text>

              {editingField === "weight" ? (
                <Controller
                  control={control}
                  name="weight_kg"
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={value}
                      onChangeText={(t) => onChange(t.replace(/[^0-9]/g, ""))}
                    />
                  )}
                />
              ) : (
                <Text style={styles.cardValue}>{watch("weight_kg")} kg</Text>
              )}

              <Pressable
                style={styles.editBtn}
                onPress={() => {
                  if (editingField === "weight") {
                    handleSubmit((data) => {
                      updateData.mutate({ weight_kg: Number(data.weight_kg) });
                      setEditingField(null);
                    })();
                  } else {
                    setEditingField("weight");
                  }
                }}
              >
                <Text style={styles.editBtnText}>
                  {editingField === "weight" ? "Lưu" : "Cập nhật"}
                </Text>
              </Pressable>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Chiều cao</Text>

              {editingField === "height" ? (
                <Controller
                  control={control}
                  name="height_cm"
                  render={({ field }) => (
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={field.value}
                      onChangeText={(t) =>
                        field.onChange(t.replace(/[^0-9]/g, ""))
                      }
                    />
                  )}
                />
              ) : (
                <Text style={styles.cardValue}>{watch("height_cm")} cm</Text>
              )}

              <Pressable
                style={styles.editBtn}
                onPress={() => {
                  if (editingField === "height") {
                    handleSubmit((data) => {
                      updateData.mutate({ height_cm: Number(data.height_cm) });
                      setEditingField(null);
                    })();
                  } else {
                    setEditingField("height");
                  }
                }}
              >
                <Text style={styles.editBtnText}>
                  {editingField === "height" ? "Lưu" : "Cập nhật"}
                </Text>
              </Pressable>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Giới tính</Text>

              {editingField === "gender" ? (
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { value, onChange } }) => (
                    <View style={styles.selectWrapper}>
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={styles.select}
                      >
                        <Picker.Item label="Chọn giới tính" value="" />
                        {GENDER_OPTIONS.map((g) => (
                          <Picker.Item
                            key={g.value}
                            label={g.label}
                            value={g.value}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.cardValue}>
                  {genderLabel(watch("gender"))}
                </Text>
              )}

              <Pressable
                style={styles.editBtn}
                onPress={() => {
                  if (editingField === "gender") {
                    handleSubmit((data) => {
                      updateData.mutate({ gender: data.gender || null });
                      setEditingField(null);
                    })();
                  } else {
                    setEditingField("gender");
                  }
                }}
              >
                <Text style={styles.editBtnText}>
                  {editingField === "gender" ? "Lưu" : "Cập nhật"}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
              Không thể tải dữ liệu người dùng.
            </Text>
          </View>
        )}
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
      </SafeAreaView>
    </LinearGradient>
  );
}
