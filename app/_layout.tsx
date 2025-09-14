import { Slot } from "expo-router";
import "react-native-reanimated";
import "./globals.css";

import Loader from "@/components/Loader";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ephesis_400Regular } from "@expo-google-fonts/ephesis";
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
import { AuthProvider, useAuth } from "./context/AuthContext"; // Adjust path if needed

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Ephesis_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <AuthenticatedLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

function AuthenticatedLayout() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <Loader loading={authLoading} isLoading />;
  }

  return (
    <Slot
      initialRouteName={user ? "(protected)" : "(auth)"}
      screenOptions={{
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    />
  );
}
