import TasbihScreen from "@/components/home/Tasbih";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#1e293b" }}>
      <ThemedView>
        <ThemedText>Profile</ThemedText>
        <TasbihScreen />
      </ThemedView>
    </SafeAreaView>
  );
}
