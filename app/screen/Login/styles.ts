import { Colors, Fonts, FontSizes } from "@/app/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /* ********** Header ********** */
  headerContainer: {
    flex: 1.5 / 8,
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
  signature: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.large,
    color: Colors.text_green,
  },
  leafIcon: {
    width: 60,
    height: 60,
  },
  /* **************************** */
  /* ********** Form ********** */
  inputContainer: {
    flex: 5 / 8,
    gap: 32,
    alignItems: "center",
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
  linkContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  linkText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text_green,
    marginVertical: 4,
  },
  registerBtn: {
    height: 44,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12
  },
  registerText: {
    fontFamily: Fonts.medium,
    textDecorationLine: "underline",
    fontSize: FontSizes.medium,
  },
});

export default styles;