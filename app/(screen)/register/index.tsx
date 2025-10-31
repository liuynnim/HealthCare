import { BlobShape } from "@/components/BlobShape";
import { SafeAreaViewStyles } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RegisterFromData, RegisterSchema } from "@/schema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles";

const Register = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleCheckPassword, setIsVisibleCheckPassword] = useState(false);

  const {
    control,
    handleSubmit,
  } = useForm<RegisterFromData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    defaultValues: {
      username: '',
      password: '',
      email: '',
      f_name: '',
      l_name: '',
      checkPassword: ''
    }
  });

  const onSubmit = (data: RegisterFromData) => {
    console.log("Register data:", data);
  };

  return (
    <SafeAreaView style={[SafeAreaViewStyles.SafeAreaView, { backgroundColor: "#F4FAF9" }]}>
      {/* Decorative blobs */}
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <BlobShape height={350} width={200} rotate="25deg" rx={80} ry={80} top={-40} right={280} opacity={0.25} />
        <BlobShape height={400} width={200} rotate="70deg" rx={80} ry={120} top={520} right={300} opacity={0.25} />
        <BlobShape height={400} width={200} rotate="0deg" rx={80} ry={120} top={190} right={-30} opacity={0.25} />
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.appTitle}>HealthCare</Text>
        <Text style={styles.subtitle}>Chăm sóc sức khỏe - Dễ dàng & Tin cậy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formCard}>
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#8E8E8E"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* Họ + Tên */}
          <View style={styles.row}>
            <Controller
              control={control}
              name="f_name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Họ"
                  placeholderTextColor="#8E8E8E"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="l_name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Tên"
                  placeholderTextColor="#8E8E8E"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          {/* Tên đăng nhập */}
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                placeholderTextColor="#8E8E8E"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* Mật khẩu */}
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { paddingRight: 40 }]}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#8E8E8E"
                  secureTextEntry={!isVisiblePassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setIsVisiblePassword(!isVisiblePassword)}
            >
              <Ionicons
                name={isVisiblePassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#7C7C7C"
              />
            </Pressable>
          </View>

          {/* Nhập lại mật khẩu */}
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="checkPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { paddingRight: 40 }]}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#8E8E8E"
                  secureTextEntry={!isVisibleCheckPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setIsVisibleCheckPassword(!isVisibleCheckPassword)}
            >
              <Ionicons
                name={isVisibleCheckPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#7C7C7C"
              />
            </Pressable>
          </View>

          {/* Button */}
          <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitText}>Đăng ký</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
