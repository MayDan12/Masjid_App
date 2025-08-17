import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrayerTime() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#1e293b" }}>
      <ThemedView>
        <ThemedText>PrayerTime</ThemedText>
        <HelloWave />
      </ThemedView>
    </SafeAreaView>
  );
}
