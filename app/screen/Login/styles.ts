import { StyleSheet } from "react-native";
import { Colors, Fonts, FontSizes } from "@/app/styles/Common";

const styles = StyleSheet.create({
  /* Header */
  headerContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appTitle: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.primary_2,
  },
  signature: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: "#6B6B6B",
    marginTop: 4,
  },
  leafIcon: {
    width: 48,
    height: 48,
  },

  /* Form container */
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  formCard: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    rowGap: 24,
  },
  input: {
    backgroundColor: "#F2F7F6",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text_green,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 14,
  },

  /* Buttons */
  primaryButton: {
    backgroundColor: Colors.primary_2,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    marginTop: 8,
  },
  primaryText: {
    color: "white",
    fontSize: 18,
    fontFamily: Fonts.medium,
  },
  linkText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.text_green,
    marginTop: 10,
    textAlign: "center",
  },
  googleButton: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 30,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    gap: 10,
  },
  googleText: {
    color: "#333",
    fontSize: 16,
    fontFamily: Fonts.medium,
  },

  /* Skip */
  skipContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginBottom: 40,
  },
});

export default styles;
