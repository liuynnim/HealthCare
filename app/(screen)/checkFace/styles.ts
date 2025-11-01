import { Colors } from "@/styles/Common";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 56,
    paddingBottom: 10,
  },
  uploadBox: {
    width: "100%",
    height: 300,
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
    height:100,
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
  button: {
    marginTop: 56,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

