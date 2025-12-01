import { StyleSheet } from "react-native";
import { Colors, Fonts, FontSizes } from "@/styles/Common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text_primary,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#262626",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },
  scheduleSection: {
    marginBottom: 20,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: Colors.text_primary,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: Colors.text_secondary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  requiredMark: {
    color: "#FF4D4F", // đỏ cảnh báo, giống tone error
    fontSize: 14, // có thể chỉnh cho khớp với label
  },

  errorText: {
    marginTop: 4,
    color: "#FF4D4F",
    fontSize: 12,
  },
});

export default styles;
