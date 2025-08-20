import { Clock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface NextPrayerCardProps {
  nextPrayer: {
    name: string;
    time: string;
    minutes: number;
    isTomorrow?: boolean;
  } | null;
  formatTime: (time: string) => string;
}

export const NextPrayerCard: React.FC<NextPrayerCardProps> = ({
  nextPrayer,
  formatTime,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    if (!nextPrayer) return;

    const updateTimeRemaining = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let targetMinutes = nextPrayer.minutes;
      if (nextPrayer.isTomorrow || targetMinutes <= currentMinutes) {
        targetMinutes += 24 * 60; // Add 24 hours for tomorrow
      }

      const diffMinutes = targetMinutes - currentMinutes;
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setTimeRemaining(`${minutes}m`);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextPrayer]);

  if (!nextPrayer) return null;

  const prayerIcons: Record<string, string> = {
    Fajr: "🌅",
    Dhuhr: "🌞",
    Asr: "🌤️",
    Maghrib: "🌆",
    Isha: "🌙",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Clock size={16} color="#3b82f6" />
        <Text style={styles.headerText}>NEXT PRAYER</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.prayerInfo}>
          <Text style={styles.icon}>{prayerIcons[nextPrayer.name]}</Text>
          <View>
            <Text style={styles.prayerName}>
              {nextPrayer.name}
              {nextPrayer.isTomorrow && (
                <Text style={styles.tomorrowText}> (Tomorrow)</Text>
              )}
            </Text>
            <Text style={styles.prayerTime}>{formatTime(nextPrayer.time)}</Text>
          </View>
        </View>

        <View style={styles.countdown}>
          <Text style={styles.countdownLabel}>in</Text>
          <Text style={styles.countdownTime}>{timeRemaining}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e40af",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginLeft: 6,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prayerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 28,
    marginRight: 16,
  },
  prayerName: {
    color: "#f1f5f9",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 2,
  },
  tomorrowText: {
    color: "#93c5fd",
    fontSize: 14,
    fontWeight: "500",
  },
  prayerTime: {
    color: "#93c5fd",
    fontSize: 16,
    fontWeight: "500",
  },
  countdown: {
    alignItems: "flex-end",
  },
  countdownLabel: {
    color: "#93c5fd",
    fontSize: 12,
    marginBottom: 2,
  },
  countdownTime: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "700",
  },
});
