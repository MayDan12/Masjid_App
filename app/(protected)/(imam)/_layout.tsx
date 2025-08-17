import { useAuth } from "@/app/context/AuthContext";
import { HapticTab } from "@/components/HapticTab";
import SunMoonIcon from "@/components/icons/HomeIcon";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { LogOut } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

export default function ImamLayout() {
  const colorScheme = useColorScheme();
  console.log("ImamLayout rendering");
  const { logOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
          android: {
            elevation: 8,
          },
        }),
        headerRight: () => (
          <LogOut
            size={22}
            color={Colors[colorScheme ?? "light"].text}
            onPress={() => logOut()}
            className="mr-10"
          />
        ),
      }}
    >
      <Tabs.Screen
        name="imamhome"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <SunMoonIcon size={24} color={color} />,
        }}
      />
      {/*
      <Tabs.Screen
        name="prayertime"
        options={{
          title: "Prayer Time",
          tabBarIcon: ({ color }) => <PrayerTimeIcon size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="masjid"
        options={{
          title: "Masjid",
          tabBarIcon: ({ color }) => <MosqueIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserCog size={24} color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
