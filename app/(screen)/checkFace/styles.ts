import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 56,
    paddingBottom: 10,
    gap: 56
  },
  uploadBox: {
    width: "100%",
    height: 300,
    maxHeight: 500,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FFFB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 5, height: 2 },
  },
  iconWrapper: {
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    tintColor: Colors.primary,
  },
  uploadText: {
    color: Colors.primary,
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  /** Phần kết quả **/
  resultWrapper: {
    flex: 1,
    padding: 20,
    gap: 56,
    alignItems: "center"
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#14B8A6",
  },
  resultBox: {
    marginTop: -30,
    flex: 1,
    maxHeight: 450,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  resultText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    lineHeight: 22,
    color: "#333",
  },
});

