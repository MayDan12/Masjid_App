import { Redirect, Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/home"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Welcome", headerShown: false }}
      />
      <Stack.Screen
        name="onboarding"
        options={{ title: "Onboarding", headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up", headerShown: false }}
      />
    </Stack>
  );
}
