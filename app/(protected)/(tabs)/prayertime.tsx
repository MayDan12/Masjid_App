import { StatusBar } from "expo-status-bar";
import React, { JSX } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DateHeader } from "@/components/users/prayer/DateHeader";
import { NextPrayerCard } from "@/components/users/prayer/NextPrayerCard";
import { PrayerErrorState } from "@/components/users/prayer/PrayerErrorState";
import { PrayerLoadingState } from "@/components/users/prayer/PrayerLoadingState";
import { PrayerTimeCard } from "@/components/users/prayer/PrayerTimeCard";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  MapPin,
  Moon,
  Sun,
  Sunset,
} from "lucide-react-native";

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

const prayerIconss: Record<string, JSX.Element> = {
  Fajr: <Sun size={20} color="#f59e0b" />, // sunrise color
  Dhuhr: <Sun size={20} color="#eab308" />, // midday yellow
  Asr: <Cloud size={20} color="#f97316" />, // orange sky
  Maghrib: <Sunset size={20} color="#ef4444" />, // sunset red
  Isha: <Moon size={20} color="#8b5cf6" />, // night purple
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
    return <PrayerLoadingState loading={loading} />;
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
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
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
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity>
              <ChevronLeft size={24} color="#10b981" />
            </TouchableOpacity>

            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>Today, 20 August</Text>
              <Text style={styles.hijriDate}>26 Safar 1447</Text>
            </View>

            <TouchableOpacity>
              <ChevronRight size={24} color="#10b981" />
            </TouchableOpacity>
          </View>

          <View style={styles.locationRow}>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#10b981" />
              <Text style={styles.locationText}>Lagos</Text>
            </View>
            <Text style={styles.organizationText}>
              Muslim World League (MWL)
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <NextPrayerCard
            CurrentPrayer={currentPrayer}
            // isCurrent={currentPrayer === nextPrayer.name}
            nextPrayer={nextPrayer}
            formatTime={formatTime}
          />
          <DateHeader prayerData={prayerData} />
        </View>

        <View style={styles.prayerTimesContainer}>
          <Text style={styles.sectionTitle}>Prayer Times</Text>

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
                  icon={prayerIconss[prayerKey]}
                  isCurrent={prayerKey === currentPrayer?.name}
                  isPrayer={isPrayer}
                  formatTime={formatTime}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Your Progress</Text>

          <LinearGradient
            colors={["#7c3aed", "#10b981"]}
            style={styles.adBanner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.adContent}>
              <View style={styles.adLeft}>
                <Text style={styles.adTitle}>DON&apos;T LIKE ADS?</Text>
                <Text style={styles.adSubtitle}>
                  Try Premium and you&apos;ll never go back
                </Text>
              </View>
              <TouchableOpacity style={styles.premiumButton}>
                <Text style={styles.premiumButtonText}>GET PREMIUM</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
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
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateContainer: {
    alignItems: "center",
  },
  dateText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  hijriDate: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    color: "#10b981",
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  organizationText: {
    color: "#64748b",
    fontSize: 12,
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
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: "#f1f5f9",
    marginBottom: 10,
    textAlign: "center",
  },
  prayersList: {
    paddingHorizontal: 8,
    marginBottom: 20,
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
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  progressTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  adBanner: {
    borderRadius: 16,
    padding: 20,
  },
  adContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  adLeft: {
    flex: 1,
  },
  adTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  adSubtitle: {
    color: "#ffffff",
    fontSize: 12,
    opacity: 0.9,
  },
  premiumButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  premiumButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
