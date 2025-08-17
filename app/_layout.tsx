import { Slot } from "expo-router";
import "react-native-reanimated";
import "./globals.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext"; // Adjust path if needed

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Slot
          screenOptions={{
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
