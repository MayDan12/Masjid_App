// import Loader from "@/components/Loader";
// import { checkUserRole } from "@/services/checkrole";
// import { Redirect, Stack } from "expo-router";
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedLayout() {
//   const { user, loading } = useAuth();
//   const [role, setRole] = useState<string | null>(null);
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRole = async () => {
//       const uid = user?.uid;
//       if (uid) {
//         const userRole = await checkUserRole(uid);
//         setRole(userRole);
//       }
//       setLoading(false);
//     };
//     fetchRole();
//   }, [user]);

//   if (loading || isLoading) {
//     return <Loader loading={loading} isLoading={isLoading} />;
//   }

//   if (!user) {
//     return <Redirect href={"/(auth)"} />;
//   }

//   return (
//     <Stack>
//       {role === "imam" ? (
//         <Stack.Screen name="(imam)" options={{ headerShown: false }} />
//       ) : (
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       )}
//       <Stack.Screen name="profile" options={{ headerShown: false }} />
//     </Stack>
//   );
// }
import { checkUserRole } from "@/services/checkrole";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useAuth } from "../context/AuthContext";

// Define possible roles for better type safety
type UserRole = "imam" | "user" | null;

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <Text
      style={{
        fontFamily: "Inter_600SemiBold",
        fontSize: 20, // e.g., 20
        color: "#fff",
      }}
      accessibilityLabel="Profile Header"
    >
      {title}
    </Text>
  );
};

export default function ProtectedLayout() {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const userRole = await checkUserRole(user.uid);
        setRole(userRole as UserRole); // Ensure role matches UserRole type
      } catch (err) {
        console.error("Failed to fetch user role:", err);
        setError("Could not fetch user role");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  // // Show loader while auth or role is loading
  // if (authLoading || isLoading) {
  //   return <Loader loading={authLoading} isLoading />;
  // }

  // Handle error state
  if (error) {
    return (
      // You can customize this error UI as needed
      <Stack.Screen
        name="error"
        options={{ headerShown: false }}
        initialParams={{ message: error }}
      />
    );
  }

  // Redirect unauthenticated users
  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack>
      {role === "imam" ? (
        <Stack.Screen name="(imam)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      <Stack.Screen
        name="user/profile"
        options={{
          headerTitle: () => <HeaderTitle title="Profile" />,
          headerStyle: {
            backgroundColor: "#0f172a",
          },
          animation: "slide_from_left", // Slide in from the right
          animationDuration: 300, // Duration in milliseconds
        }}
      />
    </Stack>
  );
}
