import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface PrayerLoadingStateProps {
  loading: boolean;
}

export const PrayerLoadingState: React.FC<PrayerLoadingStateProps> = ({
  loading,
}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.icon}>🕌</Text>
      <ActivityIndicator size="large" color="#3b82f6" style={styles.spinner} />
      <Text style={styles.title}>Loading Prayer Times</Text>
      <Text style={styles.subtitle}>
        Fetching accurate prayer times for your location...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  spinner: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 24,
  },
});
