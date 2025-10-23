import { Colors, SafeAreaViewStyles } from "@/app/styles/Common";
import { Image } from "expo-image";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { useState } from "react";
import Button from "@/app/component/Button";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { BlobShape } from "@/app/component/BlobShape";
const leafIcon = require("@/assets/image/leaf_drop_icon_teal.png")

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
          <Image source={leafIcon} style={styles.leafIcon} />
        </View>
        <Text style={styles.signature}>Hãy bảo vệ sức khỏe của chính mình</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#7C7C7C"
          value={username}
          onChangeText={setUsername}
          selectionColor={Colors.text_green}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { paddingRight: 40, width: "100%" }]}
            placeholder="Password"
            placeholderTextColor="#7C7C7C"
            secureTextEntry={!isVisible}
            value={password}
            onChangeText={setPassword}
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
        <Button label="Đăng nhập" onPress={() => { }} />

        <Link href="/" asChild>
          <Pressable style={{}}>
            <Text style={styles.registerText}>
              Quên mật khẩu?
            </Text>
          </Pressable>
        </Link>

        <Link href="/" asChild>
          <Pressable style={{}}>
            <Text style={styles.registerText}>
              Đăng ký
            </Text>
          </Pressable>
        </Link>

        <Pressable
          // onPress={() => promptAsync()}
          // disabled={!request}
          style={{
            height: 44,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            gap: 8,
            padding: 10,
            backgroundColor: "#FFF",
          }}
        >
          <Image
            source={{ uri: "https://developers.google.com/identity/images/g-logo.png" }}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ color: "#333", fontSize: 16, fontWeight: "500" }}>
            Đăng nhập với Google
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 1.5 / 8, justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Button label="Bỏ qua" onPress={() => { }} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;