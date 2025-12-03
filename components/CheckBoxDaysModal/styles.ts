import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
