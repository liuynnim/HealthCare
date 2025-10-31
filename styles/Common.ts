import { StyleSheet } from "react-native";

export const Colors = {
  background: "#F0FDF4",
  primary: "#14B8A695",
  primary_2: "#14B8A6",
  text_green: "#0F766E",
  text_black: "#4A4459",
}

export const Fonts = {
  regular: "Roboto-Condensed-Regular",
  medium: "Roboto-Condensed-Medium",
  bold: "Roboto-Condensed-Bold",
}

export const FontSizes = {
  smaill: 14,
  medium: 18,
  large: 24,
  extraLarge: 44,
}

export const FontWeight = {
  medium: "500",
} as const

export const SafeAreaViewStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
