import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SideMenuModal({ visible, onClose }: Props) {
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>

        <Pressable style={styles.item} onPress={() => console.log("Explore")}>
          <Text style={styles.text}>Khám phá</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => console.log("Predict")}>
          <Text style={styles.text}>Chẩn đoán triệu chứng</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => console.log("Profile")}>
          <Text style={styles.text}>Hồ sơ cá nhân</Text>
        </Pressable>

        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Text style={{ color: "#fff" }}>Đóng</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-start",
  },
  container: {
    width: "75%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  item: {
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  closeBtn: {
    marginTop: 40,
    backgroundColor: "#14B8A6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
