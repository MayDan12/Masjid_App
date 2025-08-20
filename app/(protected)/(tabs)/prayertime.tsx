import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DateHeader } from "@/components/users/prayer/DateHeader";
import { NextPrayerCard } from "@/components/users/prayer/NextPrayerCard";
import { PrayerErrorState } from "@/components/users/prayer/PrayerErrorState";
import { PrayerLoadingState } from "@/components/users/prayer/PrayerLoadingState";
import { PrayerTimeCard } from "@/components/users/prayer/PrayerTimeCard";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

const prayerNames: Record<string, string> = {
  Fajr: "Fajr",
  Sunrise: "Sunrise",
  Dhuhr: "Dhuhr",
  Asr: "Asr",
  Sunset: "Sunset",
  Maghrib: "Maghrib",
  Isha: "Isha",
};

const prayerIcons: Record<string, string> = {
  Fajr: "🌅",
  Sunrise: "☀️",
  Dhuhr: "🌞",
  Asr: "🌤️",
  Sunset: "🌇",
  Maghrib: "🌆",
  Isha: "🌙",
};

export default function PrayerTimesScreen() {
  const {
    prayerData,
    loading,
    error,
    refreshing,
    onRefresh,
    getCurrentPrayer,
    getNextPrayer,
    formatTime,
    retry,
  } = usePrayerTimes();

  if (loading) {
    return <PrayerLoadingState />;
  }

  if (error) {
    return <PrayerErrorState error={error} onRetry={retry} />;
  }

  if (!prayerData) {
    return null;
  }

  const currentPrayer = getCurrentPrayer();
  const nextPrayer = getNextPrayer();

  const orderedPrayers = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Sunset",
    "Maghrib",
    "Isha",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3b82f6"
            colors={["#3b82f6"]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <DateHeader prayerData={prayerData} />

        <NextPrayerCard nextPrayer={nextPrayer} formatTime={formatTime} />

        <View style={styles.prayerTimesContainer}>
          <Text style={styles.sectionTitle}>Today&apos;s Prayer Times</Text>

          <View style={styles.prayersList}>
            {orderedPrayers.map((prayerKey) => {
              const time =
                prayerData.timings[
                  prayerKey as keyof typeof prayerData.timings
                ];
              const isPrayer = [
                "Fajr",
                "Dhuhr",
                "Asr",
                "Maghrib",
                "Isha",
              ].includes(prayerKey);

              return (
                <PrayerTimeCard
                  key={prayerKey}
                  name={prayerNames[prayerKey]}
                  time={time}
                  icon={prayerIcons[prayerKey]}
                  isCurrent={prayerKey === currentPrayer}
                  isPrayer={isPrayer}
                  formatTime={formatTime}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Pull down to refresh • Times calculated using ISNA method
          </Text>
          <Text style={styles.footerSubtext}>
            Timezone: {prayerData.meta.timezone}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  prayerTimesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 16,
  },
  prayersList: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "#334155",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  footerText: {
    color: "#64748b",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
  footerSubtext: {
    color: "#475569",
    fontSize: 11,
    textAlign: "center",
  },
});
