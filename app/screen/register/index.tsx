import { BlobShape } from "@/app/component/BlobShape";
import Button from "@/app/component/Button";
import { Colors, SafeAreaViewStyles } from "@/app/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RegisterFromData, RegisterSchema } from "@/app/schema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    handleSubmit,
  } = useForm<RegisterFromData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    defaultValues: {
      username: '',
      password: '',
    }
  });

  return (
    <SafeAreaView style={SafeAreaViewStyles.SafeAreaView} >
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <BlobShape height={400} width={200} rotate="25deg" rx={80} ry={80} top={0} right={300} />
        <BlobShape height={400} width={200} rotate="70deg" rx={80} ry={120} top={500} right={300} />
        <BlobShape height={400} width={200} rotate="0deg" rx={80} ry={120} top={190} right={-30} />
        <BlobShape height={400} width={200} cx={100} cy={100} rotate="0deg" rx={100} ry={100} top={700} right={-40} />
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>HealthCare</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7C7C7C"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              selectionColor={Colors.text_green}
            />
          )}
        />
        <Controller
          control={control}
          name="f_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Họ"
              placeholderTextColor="#7C7C7C"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              selectionColor={Colors.text_green}
            />
          )}
        />
        <Controller
          control={control}
          name="l_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Tên"
              placeholderTextColor="#7C7C7C"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              selectionColor={Colors.text_green}
            />
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập"
              placeholderTextColor="#7C7C7C"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              selectionColor={Colors.text_green}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { paddingRight: 40, width: "100%" }]}
                placeholder="Mật khẩu"
                placeholderTextColor="#7C7C7C"
                secureTextEntry={!isVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                selectionColor={Colors.text_green}
              />
              <Pressable
                style={({ pressed }) => [styles.showPasswordBtn, { opacity: pressed ? 0.6 : 1, }]}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Ionicons
                  style={styles.eyeIcon}
                  name={isVisible ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#7C7C7C"
                />
              </Pressable>
            </View>
          )}
        />
        <Controller
          control={control}
          name="checkPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { paddingRight: 40, width: "100%" }]}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#7C7C7C"
                secureTextEntry={!isVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                selectionColor={Colors.text_green}
              />
              <Pressable
                style={({ pressed }) => [styles.showPasswordBtn, { opacity: pressed ? 0.6 : 1, }]}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Ionicons
                  style={styles.eyeIcon}
                  name={isVisible ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#7C7C7C"
                />
              </Pressable>
            </View>
          )}
        />
        <Button label="Đăng ký" onPress={() => { }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;