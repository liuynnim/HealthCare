import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  scrollView: {
    flex: 1,
  },

  title: {
    fontSize: FontSizes.extraLarge,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 26,
    textAlign: "center",
  },

  inputContainer: {
    marginBottom: 24,
  },

  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },

  label: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.small,
    color: Colors.text_secondary,
    marginBottom: 6,
  },

  requiredMark: {
    color: "#FF4D4F",
    fontSize: FontSizes.small,
  },

  errorText: {
    marginTop: 4,
    color: "#FF4D4F",
    fontSize: FontSizes.small,
    fontFamily: Fonts.regular,
  },

  /* Select Box */
  selectBox: {
    height: 50,
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  /* Modal overlay */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* Modal container */
  modalBox: {
    width: "88%",
    backgroundColor: "#1C1C2E",
    borderRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },

  modalItem: {
    paddingVertical: 12,
    borderBottomColor: "#2E2E3A",
    borderBottomWidth: 1,
  },

  modalItemLabel: {
    color: Colors.text_primary,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
  },

  modalItemSubLabel: {
    color: Colors.text_secondary,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.small,
    marginTop: 2,
  },

  modalCloseButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
  },

  modalCloseText: {
    color: Colors.text_primary,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
  },

  /* Secondary button */
  secondaryButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222", // subtle dark background
  },

  secondaryButtonText: {
    color: Colors.text_primary,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
  },

  /* Save button */
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  saveText: {
    color: "black",
    fontSize: 18,
    fontFamily: Fonts.medium,
    width: "100%",
    textAlign: "center",
  },
});

export default styles;
