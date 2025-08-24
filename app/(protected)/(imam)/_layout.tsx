import { useAuth } from "@/app/context/AuthContext";
import { HapticTab } from "@/components/HapticTab";
import SunMoonIcon from "@/components/icons/HomeIcon";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs, useRouter } from "expo-router";
import { Calendar, LogOut } from "lucide-react-native";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";

export default function ImamLayout() {
  const colorScheme = useColorScheme();
  console.log("ImamLayout rendering");
  const { logOut } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "#0f172a",
          },
          android: {
            elevation: 8,
            backgroundColor: "#0f172a",
          },
          default: {
            backgroundColor: "#0f172a",
          },
        }),
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Pressable onPress={() => router.push("/user/profile")}>
              {/* <Image
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
                      /> */}
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
                {/* {name} */}
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
            <LogOut
              size={22}
              color={Colors[colorScheme ?? "light"].text}
              onPress={() => logOut()}
            />
          </Pressable>
        ),
        headerStyle: {
          backgroundColor: "#0f172a",
        },
      }}
    >
      <Tabs.Screen
        name="imamhome"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <SunMoonIcon size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="imamevents"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      {/*
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
