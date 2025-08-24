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
    // <View style={styles.container}>
    //   {/* <Text style={styles.title}>🕌 Prayer Times</Text>
    //   <Text style={styles.location}>Lagos, Nigeria</Text> */}

    //   <View style={styles.dateContainer}>
    //     <View style={styles.dateRow}>
    //       <Calendar size={14} color="#64748b" />
    //       <Text style={styles.gregorianDate}>{prayerData.date.readable}</Text>
    //     </View>
    //     <Text style={styles.hijriDate}>
    //       {prayerData.date.hijri.date} {prayerData.date.hijri.month.en}{" "}
    //       {prayerData.date.hijri.year} AH
    //     </Text>
    //   </View>
    // </View>
    <LinearGradient
      colors={["#065f46", "#064e3b"]}
      style={styles.progressCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.checkContainer}>
        <Check size={24} color="#ffffff" />
      </View>
      {/* <Text style={styles.progressNumber}>{prayersCompleted}/5</Text> */}
      <Text style={styles.progressText}>prayed</Text>
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
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  progressText: {
    color: "#ffffff",
    fontSize: 12,
    opacity: 0.8,
  },
});
