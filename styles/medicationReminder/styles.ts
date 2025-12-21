import { StyleSheet } from "react-native";
import { Colors } from "@/styles/Common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  circleTop: {
    position: "absolute",
    top: 200,
    right: -250,
    width: 320,
    height: 320,
    borderRadius: 320,
    backgroundColor: "#8B5CF6",
    opacity: 0.18,
  },

  circleBottom: {
    position: "absolute",
    top: 250,
    left: -220,
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: "#06B6D4",
    opacity: 0.08,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },

  /* DAY SELECTOR */
  dayScroll: {
    width: "100%",
    marginBottom: 14,
    maxHeight: 66,
  },

  dayItem: {
    height: 60,
    width: 62,
    paddingVertical: 1,
    paddingHorizontal: "auto",
    alignItems: "center",
    borderRadius: 14,
    marginRight: 10,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  dayItemActive: {
    backgroundColor: Colors.primary_2,
    borderColor: Colors.primary_2,
  },

  dayWeekText: {
    color: Colors.text_secondary,
    fontSize: 13,
    marginBottom: 2,
  },

  dayWeekTextActive: {
    color: "#fff",
  },

  dayNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text_primary,
  },

  dayNumberActive: {
    color: "#fff",
  },

  /* ADD BUTTON */
  addButton: {
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
  },

  addGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  addText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 6,
  },

  /* MEDICINE LIST */
  /* MEDICINE LIST */
  listWrapper: {
    flex: 1,
    width: "100%",
    marginTop: 6,
  },

  listContent: {
    paddingBottom: 32,
  },

  placeholderContainer: {
    alignItems: "center",
    marginTop: 60,
    opacity: 0.8,
  },
  placeholderText: {
    color: Colors.text_primary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
});

export default styles;
