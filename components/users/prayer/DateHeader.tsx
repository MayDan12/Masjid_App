import { PrayerData } from "@/types/prayer";
import { LinearGradient } from "expo-linear-gradient";
import { Check } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DateHeaderProps {
  prayerData: PrayerData;
}

export const DateHeader: React.FC<DateHeaderProps> = ({ prayerData }) => {
  return (
    <LinearGradient
      colors={["#2E7D32", "#065f46"]}
      style={styles.progressCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.checkContainer}>
        <Check size={24} color="#F5F5DC" />
      </View>
      {/* <Text style={styles.progressNumber}>{prayersCompleted}/5</Text> */}
      <Text style={styles.progressText}>Prayed</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: 4,
    textAlign: "center",
  },
  location: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 16,
  },
  dateContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  gregorianDate: {
    fontSize: 16,
    color: "#f1f5f9",
    fontWeight: "600",
    marginLeft: 8,
  },
  hijriDate: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  progressCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  checkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(16, 185, 129, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  progressNumber: {
    color: "#F5F5DC",
    fontSize: 24,
    fontWeight: "700",
  },
  progressText: {
    color: "#F5F5DC",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    opacity: 0.8,
  },
});
