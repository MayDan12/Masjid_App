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
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Adjust path if needed

// Define how notifications should behave
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // iOS: show banner
    shouldShowList: true, // iOS: show in notification center
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission for notifications not granted!");
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Ephesis_400Regular,
  });
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <AuthProvider>
      <AuthenticatedLayout />
    </AuthProvider>
    // </ThemeProvider>
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
