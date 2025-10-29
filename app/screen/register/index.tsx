import { BlobShape } from "@/app/component/BlobShape";
import Button from "@/app/component/Button";
import { Colors, SafeAreaViewStyles } from "@/app/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { useState } from "react";

const Register = () => {
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
        </View>
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
        <Button label="Đăng ký" onPress={() => { }} />
      </View>
    </SafeAreaView>
  );
};

export default Register;