import { BellIcon } from "lucide-react-native";
import React, { JSX } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PrayerTimeCardProps {
  name: string;
  time: string;
  icon: JSX.Element;
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
        <View style={styles.timeContainer}>
          {isCurrent && (
            <View style={styles.nowBadge}>
              <Text style={styles.nowBadgeText}>Now</Text>
            </View>
          )}
          <Text style={[styles.time, isCurrent && styles.currentTime]}>
            {formatTime(time)}
          </Text>
          <TouchableOpacity style={styles.rightSection}>
            <BellIcon size={18} color="#f1f5f9" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "#1e293b",
    // borderRadius: 12,
    // marginVertical: 2,
    // borderWidth: 1,
    // borderColor: "#334155",
    // overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
    marginBottom: 12,
    backgroundColor: "rgba(30, 41, 59, 0.3)",
  },
  currentCard: {
    borderColor: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
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
    color: "#f1f5f9",
    fontFamily: "Inter_600SemiBold",
  },
  currentPrayerName: {
    fontFamily: "Inter_700Bold",
    color: "#3b82f6",
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
    fontFamily: "Inter_600SemiBold",
    color: "#f1f5f9",
  },
  currentTime: {
    color: "#3b82f6",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  rightSection: {
    // alignItems: "flex-end",
    marginLeft: 12,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nowBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  nowBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
});
