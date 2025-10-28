import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "@/app/styles/Common";

const LoadingScreen = ({ message = "Đang tải..." }: { message?: string }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.text_black,
    fontFamily: "Roboto-Condensed-Medium",
  },
});

export default LoadingScreen;
