import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { StyleSheet } from "react-native";

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
  // modal
  selectBox: {
    height: 50,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#1C1C2E",
    borderRadius: 12,
    padding: 16,
  },

  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },

  modalItemSelected: {
    backgroundColor: "#333",
    borderRadius: 8,
  },

  modalCloseButton: {
    marginTop: 10,
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 8,
  },
});

export default styles;
