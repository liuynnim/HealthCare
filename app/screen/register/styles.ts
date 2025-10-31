import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@/app/styles/Common";

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  appTitle: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.primary_2,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 4,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 60,
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
  },
  input: {
    backgroundColor: "#F2F7F6",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text_green,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 14,
  },
  submitButton: {
    backgroundColor: Colors.primary_2,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    marginTop: 8,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontFamily: Fonts.medium,
  },
});

export default styles;
