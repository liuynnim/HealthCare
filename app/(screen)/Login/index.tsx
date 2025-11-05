import { BlobShape } from "@/components/BlobShape";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { LoginFormData, LoginSchema } from "@/schema/loginSchema";
import { Colors, SafeAreaViewStyles } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
const leafIcon = require("@/assets/image/leaf_drop_icon_teal.png");

const LoginScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { login, skipLogin } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const handleLogin = async () => {
    await login();
  };

  const handleSkip = async () => {
    await skipLogin();
  };

  return (
    <SafeAreaView style={[SafeAreaViewStyles.SafeAreaView, { backgroundColor: "#F4FAF9" }]}>
      {/* ---- Blob background ---- */}
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <BlobShape height={350} width={200} rotate="25deg" rx={80} ry={80} top={0} right={300} opacity={0.25} />
        <BlobShape height={400} width={200} rotate="70deg" rx={80} ry={120} top={500} right={300} opacity={0.25} />
        <BlobShape height={400} width={200} rotate="0deg" rx={80} ry={120} top={190} right={-30} opacity={0.25} />
      </View>

      {/* ---- Header ---- */}
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>HealthCare</Text>
          <Image source={leafIcon} style={styles.leafIcon} />
        </View>
        <Text style={styles.signature}>Hãy bảo vệ sức khỏe của chính mình</Text>
      </View>

      {/* ---- Form ---- */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formCard}>
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
                selectionColor={Colors.text_green}
              />
            )}
          />

          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { paddingRight: 40 }]}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#8E8E8E"
                  secureTextEntry={!isVisible}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  selectionColor={Colors.text_green}
                />
              )}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Ionicons
                name={isVisible ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#7C7C7C"
              />
            </Pressable>
          </View>

          {/* ---- Buttons ---- */}
          <Pressable style={styles.primaryButton} onPress={handleSubmit(handleLogin)}>
            <Text style={styles.primaryText}>Đăng nhập</Text>
          </Pressable>

          <Pressable onPress={() => { }}>
            <Text style={styles.linkText}>Quên mật khẩu?</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/(screen)/register")}>
            <Text style={[styles.linkText, { textDecorationLine: "underline" }]}>Đăng ký tài khoản mới</Text>
          </Pressable>

          {/* ---- Social Login ---- */}
          <Pressable style={styles.googleButton}>
            <Image
              source={{ uri: "https://developers.google.com/identity/images/g-logo.png" }}
              style={{ width: 28, height: 28 }}
            />
            <Text style={styles.googleText}>Đăng nhập với Google</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* ---- Skip ---- */}
      <View style={styles.skipContainer}>
        <Button label="Bỏ qua" onPress={handleSkip} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
