// healthStyles.ts
import { Colors } from "@/styles/Common";
import { StyleSheet } from "react-native";

const healthStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },

  content: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "left",
    width: "100%",
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 16,
    color: Colors.text_secondary,
    marginBottom: 30,
    marginTop: 8,
    width: "100%",
    textAlign: "left",
  },

  // --- Bar Chart ---
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 28,
  },

  barItem: {
    alignItems: "center",
  },

  bar: {
    width: 22,
    borderRadius: 10,
    backgroundColor: Colors.primary_2,
  },

  dayLabel: {
    color: Colors.text_secondary,
    fontSize: 13,
    marginTop: 6,
  },

  // --- Card (4 stats: Calo – Steps – Exercise – Stand) ---
  metricsCard: {
    width: "100%",
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
  },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  metricBlock: {
    flex: 1,
    alignItems: "center",
  },

  metricLabel: {
    fontSize: 14,
    color: Colors.text_secondary,
    marginBottom: 4,
  },

  metricValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.text_primary,
  },

  metricSub: {
    fontSize: 12,
    color: Colors.text_secondary,
    marginTop: 2,
  },

  standSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    alignItems: "center",
  },

  standText: {
    fontSize: 16,
    color: Colors.text_primary,
  },
});

export default healthStyles;
