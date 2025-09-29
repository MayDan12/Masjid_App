import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  ChevronRight,
  Contact2Icon,
  Earth,
  HelpCircle,
  LogOut,
  Palette,
  Shield,
  User2Icon,
  UserX2,
} from "lucide-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
  type?: "default" | "danger";
}

export default function Profile() {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("Logout pressed"),
      },
    ]);
  };

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: "Account",
      items: [
        {
          icon: <User2Icon color="#059669" size={24} />,
          title: "Profile",
          subtitle: "Manage your profile information",
          onPress: () => console.log("Profile pressed"),
        },
        {
          icon: <Shield color="#059669" size={24} />,
          title: "Security Settings",
          subtitle: "Update password and secure your account",
          onPress: () => console.log("Security pressed"),
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <Bell color="#059669" size={24} />,
          title: "Notifications",
          subtitle: "Manage your notification settings",
          onPress: () => console.log("Notifications pressed"),
        },
        {
          icon: <Earth color="#059669" size={24} />,
          title: "Language",
          subtitle: "Select your preferred language",
          onPress: () => console.log("Language pressed"),
        },
        {
          icon: <Palette color="#059669" size={24} />,
          title: "Theme",
          subtitle: "Switch between light and dark mode",
          onPress: () => console.log("Theme pressed"),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: <HelpCircle color="#059669" size={24} />,
          title: "Help Center",
          subtitle: "Get help with the App",
          onPress: () => console.log("Help pressed"),
        },
        {
          icon: <Contact2Icon color="#059669" size={24} />,
          title: "Contact Us",
          subtitle: "Get in touch with our support team",
          onPress: () => console.log("Contact pressed"),
        },
        {
          icon: <UserX2 color="#059669" size={24} />,
          title: "FAQ",
          subtitle: "Frequently asked questions",
          onPress: () => console.log("FAQ pressed"),
        },
      ],
    },
  ];

  const MenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      onPress={item.onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 12,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ecfdf5",
          padding: 12,
          borderRadius: 12,
          marginRight: 16,
        }}
      >
        {item.icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#0f172a",
            marginBottom: 4,
            fontFamily: "Inter_600SemiBold",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#64748b",
            lineHeight: 18,
            fontFamily: "Inter_400Regular",
          }}
        >
          {item.subtitle}
        </Text>
      </View>

      <ChevronRight size={20} color="#cbd5e1" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#FFFFFF", "#F5F5DC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        {/* <View
            style={{ alignItems: "center", marginBottom: 32, marginTop: 16 }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#059669",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                borderWidth: 4,
                borderColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <User2Icon color="white" size={32} />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: 4,
              }}
            >
              John Doe
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#64748b",
              }}
            >
              john.doe@example.com
            </Text>
          </View> */}

        {/* Menu Sections */}
        {menuSections.map((section, index) => (
          <View key={section.title} style={{ marginBottom: 18 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#0f172a",
                paddingHorizontal: 4,
                fontFamily: "Inter_700Bold",
              }}
            >
              {section.title}
            </Text>
            {section.items.map((item, itemIndex) => (
              <MenuItem key={itemIndex} item={item} />
            ))}
          </View>
        ))}

        {/* Logout Section */}
        <View style={{ marginTop: 5, marginBottom: 32 }}>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fef2f2",
              padding: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#fecaca",
              marginTop: 12,
            }}
          >
            <LogOut color="#dc2626" size={20} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#dc2626",
                marginLeft: 8,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Text
            style={{
              fontSize: 14,
              color: "#94a3b8",
              textAlign: "center",
            }}
          >
            Prayer App v1.0.0
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#cbd5e1",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Made with ❤️ for the community
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// import {
//   Bell,
//   Contact2Icon,
//   Earth,
//   HelpCircle,
//   Settings2Icon,
//   User2Icon,
//   UserX2,
// } from "lucide-react-native";
// import { Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Profile() {
//   return (
//     <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#f8fafc" }}>
//       <View>
//         <View>
//           <Text className="text-lg font-semibold">Account</Text>
//           <TouchableOpacity className="flex-row items-center bg-white mt-4 p-4 rounded-2xl shadow">
//             <View className="items-center justify-center bg-emerald/10 p-3 rounded-2xl mr-6">
//               <User2Icon color="#047857" size={32} />
//             </View>
//             <View>
//               <Text className="text-base font-semibold">Profile</Text>
//               <Text className="text-sm text-gray-500">
//                 Manage your profile information
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity className="flex-row items-center bg-white mt-4 p-4 rounded-2xl shadow">
//             <View className="items-center justify-center bg-emerald/10 p-3 rounded-2xl mr-6">
//               <Settings2Icon color="#047857" size={32} />
//             </View>
//             <View>
//               <Text className="text-base font-semibold">Security Settings</Text>
//               <Text className="text-sm text-gray-500">
//                 Update your password and secure your account
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View className="mt-8">
//           <Text className="text-lg font-semibold">Prefrences</Text>
//           <TouchableOpacity className="flex-row items-center bg-white mt-4 p-4 rounded-2xl shadow">
//             <View className="items-center justify-center bg-emerald/10 p-3 rounded-2xl mr-6">
//               <Bell color="#047857" size={32} />
//             </View>
//             <View>
//               <Text className="text-base font-semibold">Notifications</Text>
//               <Text className="text-sm text-gray-500">
//                 Manage your notification settings
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center bg-white mt-4 p-4 rounded-2xl shadow">
//             <View className="items-center justify-center bg-emerald/10 p-3 rounded-2xl mr-6">
//               <Earth color="#047857" size={32} />
//             </View>
//             <View>
//               <Text className="text-base font-semibold">Language</Text>
//               <Text className="text-sm text-gray-500">
//                 Select your preferred language
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity className="flex-row items-center bg-white mt-4 p-4 rounded-2xl shadow">
//             <View className="items-center justify-center bg-emerald/10 p-3 rounded-2xl mr-6">
//               <User2Icon color="#047857" size={32} />
//             </View>
//             <View>
//               <Text className="text-base font-semibold">Theme</Text>
//               <Text className="text-sm text-gray-500">
//                 Switch between light and dark mode
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View className="mt-8">
//           <Text className="text-lg font-semibold">Support</Text>
//           <TouchableOpacity className="flex-row items-center bg-white mt-4 p-4 rounded-2xl shadow">
//             <View className="items-center justify-center bg-emerald/10 p-3 rounded-2xl mr-6">
//               <HelpCircle color="#047857" size={32} />
//             </View>
//             <View>
//               <Text className="text-base font-semibold">Help Center</Text>
//               <Text className="text-sm text-gray-500">
//                 Get help with the App
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center bg-white mt-4 p-4 rounded-2xl shadow">
//             <View className="items-center justify-center bg-emerald/10 p-3 rounded-2xl mr-6">
//               <Contact2Icon color="#047857" size={32} />
//             </View>
//             <View>
//               <Text className="text-base font-semibold">Contact Us</Text>
//               <Text className="text-sm text-gray-500">
//                 Get in touch with our support team
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center bg-white mt-4 p-4 rounded-2xl shadow">
//             <View className="items-center justify-center bg-emerald/10 p-3 rounded-2xl mr-6">
//               <UserX2 color="#047857" size={32} />
//             </View>
//             <View>
//               <Text className="text-base font-semibold">FAQ</Text>
//               <Text className="text-sm text-gray-500">
//                 Frequently asked questions
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }
