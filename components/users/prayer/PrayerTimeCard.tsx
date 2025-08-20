import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PrayerTimeCardProps {
  name: string;
  time: string;
  icon: string;
  isCurrent: boolean;
  isPrayer: boolean;
  formatTime: (time: string) => string;
}

export const PrayerTimeCard: React.FC<PrayerTimeCardProps> = ({
  name,
  time,
  icon,
  isCurrent,
  isPrayer,
  formatTime,
}) => {
  return (
    <View style={[styles.card, isCurrent && styles.currentCard]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.icon}>{icon}</Text>
          <View style={styles.prayerInfo}>
            <Text
              style={[
                styles.prayerName,
                isCurrent && styles.currentPrayerName,
                !isPrayer && styles.nonPrayerName,
              ]}
            >
              {name}
            </Text>
            {!isPrayer && (
              <Text style={styles.subtitle}>Not a prayer time</Text>
            )}
          </View>
        </View>
        <Text style={[styles.time, isCurrent && styles.currentTime]}>
          {formatTime(time)}
        </Text>
      </View>
      {isCurrent && <View style={styles.currentIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#334155",
    overflow: "hidden",
  },
  currentCard: {
    backgroundColor: "#0f172a",
    borderColor: "#3b82f6",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  prayerInfo: {
    flex: 1,
  },
  prayerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f1f5f9",
  },
  currentPrayerName: {
    color: "#3b82f6",
    fontWeight: "700",
  },
  nonPrayerName: {
    color: "#94a3b8",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  time: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f1f5f9",
  },
  currentTime: {
    color: "#3b82f6",
    fontSize: 18,
    fontWeight: "700",
  },
  currentIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#3b82f6",
  },
});
