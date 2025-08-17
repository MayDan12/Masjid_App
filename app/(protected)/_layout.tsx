import { Redirect, Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();

  //   if (loading) {
  //     return <LoadingIndicator />;
  //   }

  if (!user) {
    return <Redirect href={"/intro"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
