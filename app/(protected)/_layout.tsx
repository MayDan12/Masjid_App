import Loader from "@/components/Loader";
import { checkUserRole } from "@/services/checkrole";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const uid = user?.uid;
      if (uid) {
        const userRole = await checkUserRole(uid);
        setRole(userRole);
      }
      setLoading(false);
    };
    fetchRole();
  }, [user]);

  if (loading || isLoading) {
    return (
      <Loader loading={loading} isLoading={isLoading} />
      // <SafeAreaView
      //   style={{
      //     flex: 1,
      //     justifyContent: "center",
      //     alignItems: "center",
      //     backgroundColor: "#1e293b", // slate-800
      //   }}
      // >
      //   <Animated.View style={animatedStyle}>
      //     <Image
      //       source={require("@/assets/images/masjidlinkicon.png")}
      //       style={{ width: 100, height: 100 }}
      //       contentFit="contain"
      //     />
      //   </Animated.View>
      // </SafeAreaView>
    );
  }

  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <Stack>
      {role === "imam" ? (
        <Stack.Screen name="(imam)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
