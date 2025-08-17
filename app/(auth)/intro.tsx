import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Intro() {
  return (
    <ImageBackground
      source={require("@/assets/images/mosque1.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Top/center content */}
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>Welcome to Masjid App</ThemedText>

          <ThemedText style={styles.subtitle}>
            Discover prayer times, events, and more. Please login or get started
            to continue.
          </ThemedText>
        </ThemedView>

        {/* Bottom buttons */}
        <ThemedView style={styles.links}>
          <Link href="/login" asChild>
            <ThemedText type="link" style={styles.button}>
              Login
            </ThemedText>
          </Link>
          <Link href="/signup" asChild>
            <ThemedText type="link" style={styles.button}>
              Get Started
            </ThemedText>
          </Link>
        </ThemedView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between", // pushes top content & bottom buttons apart
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    lineHeight: 52,
    color: "white",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  links: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 20,
  },
  button: {
    textAlign: "center",
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
