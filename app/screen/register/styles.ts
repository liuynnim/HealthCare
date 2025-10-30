import { Colors, Fonts, FontSizes } from "@/app/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /* ********** Header ********** */
  headerContainer: {
    flex: 1 / 8,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 32
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  appTitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.extraLarge,
    color: Colors.primary_2,
  },
  /* **************************** */
  /* ********** Form ********** */
  inputContainer: {
    flex: 5 / 8,
    gap: 32,
    alignItems: "center",
    maxHeight: 300, // Adjust this value as needed for your layout
  },
  input: {
    width: "60%",
    height: 56,
    backgroundColor: "#E0EBE9",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text_green,
    marginBottom: 16,
  },
  passwordContainer: {
    width: "60%",
    height: 56,
    position: "relative",
  },
  showPasswordBtn: {
    position: "absolute",
    right: 0,
    width: 40,
    height: 56
  },
  eyeIcon: {
    lineHeight: 56,
    textAlign: "center",
  },
  loginButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#4EC9B0",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  /* ************************** */
});

export default styles;