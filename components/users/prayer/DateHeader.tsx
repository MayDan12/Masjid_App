import { PrayerData } from "@/types/prayer";
import { Calendar } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DateHeaderProps {
  prayerData: PrayerData;
}

export const DateHeader: React.FC<DateHeaderProps> = ({ prayerData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕌 Prayer Times</Text>
      <Text style={styles.location}>Lagos, Nigeria</Text>

      <View style={styles.dateContainer}>
        <View style={styles.dateRow}>
          <Calendar size={14} color="#64748b" />
          <Text style={styles.gregorianDate}>{prayerData.date.readable}</Text>
        </View>
        <Text style={styles.hijriDate}>
          {prayerData.date.hijri.date} {prayerData.date.hijri.month.en}{" "}
          {prayerData.date.hijri.year} AH
        </Text>
      </View>
    </View>
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
});
