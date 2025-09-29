// import { useAuth } from "@/app/context/AuthContext";
// import { HapticTab } from "@/components/HapticTab";
// import SunMoonIcon from "@/components/icons/HomeIcon";
// import MosqueIcon from "@/components/icons/MosqueIcon";
// import PrayerTimeIcon from "@/components/icons/PrayerTime";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import { Image } from "expo-image";
// import { Tabs, useRouter } from "expo-router";
// import { Calendar, LogOut, UserCog } from "lucide-react-native";
// import React from "react";
// import { Platform, Pressable, Text, View } from "react-native";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   console.log("TabLayout rendering");
//   const { logOut, user } = useAuth();
//   const router = useRouter();

//   const name = user?.displayName;

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             position: "absolute",
//             backgroundColor: "#0f172a",
//           },
//           android: {
//             elevation: 8,
//             backgroundColor: "#0f172a",
//           },
//           default: {
//             backgroundColor: "#0f172a",
//           },
//         }),
//         headerTitle: () => (
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               backgroundColor: "transparent",
//             }}
//           >
//             <Pressable onPress={() => router.push("/user/profile")}>
//               <Image
//                 source={
//                   user?.photoURL
//                     ? { uri: user.photoURL }
//                     : require("@/assets/images/mosque.jpg")
//                 }
//                 style={{
//                   width: 32,
//                   height: 32,
//                   borderRadius: 16,
//                   marginRight: 8,
//                 }}
//               />
//             </Pressable>
//             <View>
//               <Text
//                 style={{ fontFamily: "Inter_600SemiBold" }}
//                 className="text-white text-xl"
//               >
//                 Assalamualaikum!
//               </Text>
//               <Text
//                 style={{ fontFamily: "Inter_400Regular" }}
//                 className="text-white"
//               >
//                 {name}
//               </Text>
//             </View>
//           </View>
//         ),
//         headerRight: () => (
//           <Pressable
//             onPress={logOut}
//             style={{ marginRight: 24 }}
//             android_ripple={{ color: "gray", borderless: true }}
//           >
//             <LogOut size={22} color={"#fff"} onPress={() => logOut()} />
//           </Pressable>
//         ),
//         headerStyle: {
//           backgroundColor: "#0f172a",
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => <SunMoonIcon size={24} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="prayertime"
//         options={{
//           title: "Prayer Time",
//           tabBarIcon: ({ color }) => <PrayerTimeIcon size={30} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="events"
//         options={{
//           title: "Events",
//           tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="masjid"
//         options={{
//           title: "Masjid",
//           tabBarIcon: ({ color }) => <MosqueIcon size={28} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color }) => <UserCog size={24} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
import { useAuth } from "@/app/context/AuthContext";
import { HapticTab } from "@/components/HapticTab";
import MosqueIcon from "@/components/icons/MosqueIcon";
import PrayerTimeIcon from "@/components/icons/PrayerTime";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useRouter } from "expo-router";
import { CalendarDaysIcon, Heart, Home, LogOut } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function TabLayout() {
  const { logOut, user } = useAuth();
  const router = useRouter();

  const name = user?.displayName;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2E7D32", // Emerald Green
        tabBarInactiveTintColor: "#9CA3AF", // Muted gray
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: "#F5F5DC", // Light beige background
          borderTopWidth: 0,
          elevation: 8,
        },
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Pressable onPress={() => router.push("/user/profile")}>
              <Image
                source={
                  user?.photoURL
                    ? { uri: user.photoURL }
                    : require("@/assets/images/mosque.jpg")
                }
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 8,
                }}
              />
            </Pressable>
            <View>
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-white text-xl"
              >
                Assalamualaikum!
              </Text>
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-white"
              >
                {name}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <Pressable
            onPress={logOut}
            style={{ marginRight: 24 }}
            android_ripple={{ color: "gray", borderless: true }}
          >
            <LogOut size={22} color={"#fff"} onPress={() => logOut()} />
          </Pressable>
        ),
        headerBackground: () => (
          <LinearGradient
            colors={["#2E7D32", "#66BB6A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="prayertime"
        options={{
          title: "Prayer Time",
          tabBarIcon: ({ color }) => <PrayerTimeIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => (
            <CalendarDaysIcon size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="masjid"
        options={{
          title: "Masjid",
          tabBarIcon: ({ color }) => <MosqueIcon size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Donations",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
