import MosqueIcon from "@/components/icons/MosqueIcon";
import PrayerTimeIcon from "@/components/icons/PrayerTime";
import QiblaIcon from "@/components/icons/QiblaIcon";
import ShimmerSkeleton from "@/components/ShimmerSkeleton";
import { getAllMasjids } from "@/services/getMasjids";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Bell,
  CalendarClock,
  ChevronRight,
  Clock,
  Compass,
  Heart,
  MapPin,
  Music,
  Star,
  Stars,
  UserCog,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  type ICarouselInstance,
} from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

// Constants
const { width } = Dimensions.get("window");
const QUICK_ACTIONS = [
  {
    id: 1,
    icon: <Stars size={24} color="#D4AF37" />,
    title: "Go Premium",
    route: "/premium",
    bgColor: "rgba(212, 175, 55, 0.1)",
  },
  {
    id: 2,
    icon: <Music size={24} color="#059669" />,
    title: "Azan",
    route: "/user/tasbih",
    bgColor: "rgba(5, 150, 105, 0.1)",
  },
  {
    id: 3,
    icon: <MosqueIcon size={24} color="#7C3AED" />,
    title: "Masjids",
    route: "/dashboard/masjids",
    bgColor: "rgba(124, 58, 237, 0.1)",
  },
  {
    id: 4,
    icon: <CalendarClock size={24} color="#DC2626" />,
    title: "Events",
    route: "/dashboard/events",
    bgColor: "rgba(220, 38, 38, 0.1)",
  },
  {
    id: 5,
    icon: <PrayerTimeIcon size={24} color="#2563EB" />,
    title: "Prayer Time",
    route: "/prayer-times",
    bgColor: "rgba(37, 99, 235, 0.1)",
  },
  {
    id: 6,
    icon: <UserCog size={24} color="#7C2D12" />,
    title: "Profile",
    route: "/profile",
    bgColor: "rgba(124, 45, 18, 0.1)",
  },
  {
    id: 7,
    icon: <QiblaIcon size={24} color="#059669" />,
    title: "Qibla",
    route: "/qibla",
    bgColor: "rgba(5, 150, 105, 0.1)",
  },
  {
    id: 8,
    icon: <Compass size={24} color="#7C3AED" />,
    title: "More",
    route: "/more",
    bgColor: "rgba(124, 58, 237, 0.1)",
  },
];

const masjidData = [
  {
    id: 1,
    name: "Al-Noor Central Masjid",
    location: "Victoria Island, Lagos",
    distance: "0.8 km",
    congregation: "500+",
    nextPrayer: "Maghrib",
    nextPrayerTime: "6:45 PM",
    image: require("@/assets/images/masjid1.jpg"),
    isOpen: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Masjid Al-Furqan",
    location: "Ikeja, Lagos",
    distance: "2.1 km",
    congregation: "300+",
    nextPrayer: "Maghrib",
    nextPrayerTime: "6:45 PM",
    image: require("@/assets/images/tryit.jpg"),
    isOpen: true,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Lagos Central Mosque",
    location: "Lagos Island",
    distance: "3.5 km",
    congregation: "1000+",
    nextPrayer: "Maghrib",
    nextPrayerTime: "6:45 PM",
    image: require("@/assets/images/tryit2.jpg"),
    isOpen: true,
    rating: 4.9,
  },
];

const recentActivities = [
  {
    id: 1,
    title: "Prayer time reminder set",
    description: "Fajr prayer at 5:30 AM",
    time: "2 hours ago",
    icon: <Bell size={16} color="#10b981" />,
    type: "prayer",
  },
  {
    id: 2,
    title: "Donated to Al-Noor Masjid",
    description: "$25.00 contribution",
    time: "1 day ago",
    icon: <Heart size={16} color="#ef4444" />,
    type: "donation",
  },
  {
    id: 3,
    title: "Joined Friday Prayer",
    description: "Central Masjid Lagos",
    time: "3 days ago",
    icon: <MosqueIcon size={16} color="#7c3aed" />,
    type: "prayer",
  },
];

export default function HomeScreen() {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [prayerData, setPrayerData] = useState<any>(null);
  const [currentPrayer, setCurrentPrayer] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [timeToNext, setTimeToNext] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [masjids, setMasjids] = useState<any[]>([]);
  const router = useRouter();

  const today = new Date();
  const day = today.toLocaleDateString("en-US", { day: "numeric" });
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const year = today.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Lagos&country=Nigeria&method=2"
        );
        const data = await response.json();
        setPrayerTimes(data.data.timings);
        setPrayerData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateCurrentTime();
    const timeInterval = setInterval(updateCurrentTime, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;

    const updateCurrentAndNextPrayer = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const prayers = [
        { name: "Fajr", time: prayerTimes.Fajr, emoji: "🌥️" },
        { name: "Dhuhr", time: prayerTimes.Dhuhr, emoji: "☀️" },
        { name: "Asr", time: prayerTimes.Asr, emoji: "🌤️" },
        { name: "Maghrib", time: prayerTimes.Maghrib, emoji: "🌅" },
        { name: "Isha", time: prayerTimes.Isha, emoji: "🌙" },
      ];

      const prayerMinutes = prayers.map((prayer) => {
        const [hours, minutes] = prayer.time.split(":").map(Number);
        return {
          ...prayer,
          minutes: hours * 60 + minutes,
        };
      });

      let current = "Isha";
      let next = "Fajr";
      let currentEmoji = "🌙";
      let nextEmoji = "🌥️";

      for (let i = 0; i < prayerMinutes.length; i++) {
        if (currentTime < prayerMinutes[i].minutes) {
          next = prayerMinutes[i].name;
          nextEmoji = prayerMinutes[i].emoji;
          if (i > 0) {
            current = prayerMinutes[i - 1].name;
            currentEmoji = prayerMinutes[i - 1].emoji;
          } else {
            current = "Isha";
            currentEmoji = "🌙";
          }
          break;
        }
        if (i === prayerMinutes.length - 1) {
          current = prayerMinutes[i].name;
          currentEmoji = prayerMinutes[i].emoji;
          next = "Fajr";
          nextEmoji = "🌥️";
        }
      }

      setCurrentPrayer(`${currentEmoji} ${current}`);
      setNextPrayer(`${nextEmoji} ${next}`);

      const nextPrayerTime =
        prayerMinutes.find((p) => p.name === next)?.minutes ||
        prayerMinutes[0].minutes;
      let minutesToNext = nextPrayerTime - currentTime;
      if (minutesToNext <= 0) {
        minutesToNext += 24 * 60;
      }

      const hoursToNext = Math.floor(minutesToNext / 60);
      const minsToNext = minutesToNext % 60;
      setTimeToNext(`${hoursToNext}h ${minsToNext}m`);
    };

    updateCurrentAndNextPrayer();
    const interval = setInterval(updateCurrentAndNextPrayer, 60000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllMasjids();
      if (result.success) {
        setMasjids(result.data);
      } else {
        console.error(result.message);
      }
    };

    fetchData();
  }, []);

  const QuickAction = ({ item }: { item: (typeof QUICK_ACTIONS)[0] }) => (
    <TouchableOpacity
      style={styles.quickAction}
      onPress={() => router.push(item.route)}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: item.bgColor }]}>
        {item.icon}
      </View>
      <Text style={styles.quickActionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const PrayerTimeCard = () => {
    if (loading) {
      return (
        <View style={styles.prayerTimeCard}>
          <ShimmerSkeleton
            height={40}
            variant="rect"
            style={{ marginBottom: 12 }}
          />
          <ShimmerSkeleton height={20} width="80%" variant="text" />
          <ShimmerSkeleton
            height={16}
            width="60%"
            variant="text"
            style={{ marginTop: 8 }}
          />
        </View>
      );
    }

    return (
      <LinearGradient
        colors={["#059669", "#10b981", "#34d399"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.prayerTimeCard}
      >
        <View style={styles.prayerHeader}>
          <View>
            <Text style={styles.currentPrayerLabel}>Current Prayer</Text>
            <Text style={styles.currentPrayerText}>{currentPrayer}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={20} color="#F5F5DC" />
            <Text style={styles.currentTimeText}>{currentTime}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.prayerFooter}>
          <View>
            <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
            <Text style={styles.nextPrayerText}>{nextPrayer}</Text>
          </View>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownLabel}>in</Text>
            <Text style={styles.countdownText}>{timeToNext}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  const MasjidCard = ({ item }: { item: (typeof masjidData)[0] }) => (
    <TouchableOpacity style={styles.masjidCard}>
      <ImageBackground
        source={item.image}
        style={styles.masjidImage}
        imageStyle={styles.masjidImageStyle}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.masjidGradient}
        >
          <View style={styles.masjidHeader}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: item.isOpen ? "#10b981" : "#ef4444" },
              ]}
            >
              <Text style={styles.statusText}>
                {item.isOpen ? "Open" : "Closed"}
              </Text>
            </View>
            <View style={styles.ratingBadge}>
              <Star size={12} color="#FBBF24" fill="#FBBF24" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <View style={styles.masjidInfo}>
            <Text style={styles.masjidName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={12} color="#F5F5DC" />
              <Text style={styles.masjidLocation} numberOfLines={1}>
                {item.location}
              </Text>
            </View>

            <View style={styles.masjidFooter}>
              <View style={styles.masjidDetails}>
                <Text style={styles.congregationText}>{item.congregation}</Text>
                <Text style={styles.distanceText}>{item.distance}</Text>
              </View>
              <View style={styles.nextPrayerBadge}>
                <Text style={styles.nextPrayerLabel}>
                  Next: {item.nextPrayerTime}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  const ActivityItem = ({ item }: { item: (typeof recentActivities)[0] }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>{item.icon}</View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityDescription}>{item.description}</Text>
      </View>
      <Text style={styles.activityTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>As-salamu alaykum</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#059669" />
            <Text style={styles.locationText}>Lagos, Nigeria</Text>
          </View>
        </View>

        {/* Prayer Time Card */}
        <PrayerTimeCard />

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((item) => (
              <QuickAction key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Nearby Masjids */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Masjids</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#059669" />
            </TouchableOpacity>
          </View>

          <Carousel
            width={width - 32}
            height={180}
            data={masjidData}
            loop
            autoPlay={true}
            autoPlayInterval={4000}
            mode="parallax"
            style={styles.carousel}
            renderItem={({ item }) => <MasjidCard item={item} />}
          />
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
          </View>

          <View style={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} item={activity} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5F5DC",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  greeting: {
    color: "#0D1B2A",
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  dateText: {
    color: "#64748b",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationText: {
    color: "#059669",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginLeft: 6,
  },
  prayerTimeCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#04302123",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  prayerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  currentPrayerLabel: {
    color: "rgba(245, 245, 220, 0.8)",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 4,
  },
  currentPrayerText: {
    color: "#F5F5DC",
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  timeContainer: {
    alignItems: "center",
  },
  currentTimeText: {
    color: "#F5F5DC",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginVertical: 12,
  },
  prayerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextPrayerLabel: {
    color: "rgba(245, 245, 220, 0.8)",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 4,
  },
  nextPrayerText: {
    color: "#F5F5DC",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  countdownContainer: {
    alignItems: "flex-end",
  },
  countdownLabel: {
    color: "rgba(245, 245, 220, 0.8)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 4,
  },
  countdownText: {
    color: "#F5F5DC",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    color: "#0D1B2A",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    color: "#059669",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginRight: 4,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickAction: {
    width: "23%",
    alignItems: "center",
    marginBottom: 16,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    color: "#0D1B2A",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  carousel: {
    marginTop: 8,
  },
  masjidCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginHorizontal: 4,
  },
  masjidImage: {
    height: 180,
    justifyContent: "space-between",
  },
  masjidImageStyle: {
    borderRadius: 16,
  },
  masjidGradient: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  masjidHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    marginLeft: 4,
  },
  masjidInfo: {
    marginTop: "auto",
  },
  masjidName: {
    color: "#F5F5DC",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  masjidLocation: {
    color: "#F5F5DC",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 6,
    flex: 1,
  },
  masjidFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  masjidDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  congregationText: {
    color: "#F5F5DC",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginRight: 12,
  },
  distanceText: {
    color: "#10b981",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  nextPrayerBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  nextPrayerLabels: {
    color: "#F5F5DC",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  activitiesList: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: "#0D1B2A",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  activityDescription: {
    color: "#64748b",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  activityTime: {
    color: "#94a3b8",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
});

// import MosqueIcon from "@/components/icons/MosqueIcon";
// import PrayerTimeIcon from "@/components/icons/PrayerTime";
// import QiblaIcon from "@/components/icons/QiblaIcon";
// import ShimmerSkeleton from "@/components/ShimmerSkeleton";
// import { getAllMasjids } from "@/services/getMasjids";
// import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import {
//   Bell,
//   BookOpen,
//   Calendar,
//   CalendarClock,
//   Clock,
//   Clock1,
//   Heart,
//   MapPin,
//   Music,
//   Settings2,
//   Stars,
//   UserCog,
// } from "lucide-react-native";
// import { useEffect, useRef, useState } from "react";
// import {
//   Dimensions,
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useSharedValue } from "react-native-reanimated";
// import Carousel, {
//   type ICarouselInstance,
// } from "react-native-reanimated-carousel";
// import { SafeAreaView } from "react-native-safe-area-context";

// const data = [
//   {
//     icon: <MosqueIcon size={28} color="#fff" />,
//     title: "Masjid Profiles",
//     description: "Discover and connect with masjids in your area",
//     link: "/dashboard/masjids",
//     buttonText: "Explore Masjids",
//     gradient: ["#059669", "#10b981"],
//   },
//   {
//     icon: <Bell size={28} color="#fff" />,
//     title: "Azan System",
//     description: "Customize your azan notifications and preferences",
//     link: "/dashboard/azan-settings",
//     buttonText: "Azan Settings",
//     gradient: ["#6d28d9", "#8b5cf6"],
//   },
//   {
//     icon: <Calendar size={28} color="#fff" />,
//     title: "Events",
//     description: "Stay updated with community events and gatherings",
//     link: "/dashboard/events",
//     buttonText: "View Events",
//     gradient: ["#b91c1c", "#ef4444"],
//   },
//   {
//     icon: <Heart size={28} color="#fff" />,
//     title: "Donations",
//     description: "Support your local masjid with secure donations",
//     link: "/dashboard/donate",
//     buttonText: "Donate Now",
//     gradient: ["#c2410c", "#f97316"],
//   },
// ];

// const data2 = [
//   {
//     icon: <Clock1 size={28} color="#fff" />,
//     title: "Real-Time Azan",
//     description: "Receive real-time azan notifications based on your location",
//     link: "/dashboard/azan",
//     buttonText: "Enable Alerts",
//     gradient: ["#1d4ed8", "#3b82f6"],
//   },
//   {
//     icon: <Settings2 size={28} color="#fff" />,
//     title: "Custom Preferences",
//     description: "Toggle alerts per prayer & personalize your azan experience",
//     link: "/dashboard/azan-preferences",
//     buttonText: "Set Preferences",
//     gradient: ["#7c3aed", "#a855f7"],
//   },
//   {
//     icon: <Music size={28} color="#fff" />,
//     title: "Azan Voices",
//     description:
//       "Choose from free & premium azan voices like Mecca, Medina, and Egypt",
//     link: "/dashboard/azan-voices",
//     buttonText: "Select Voice",
//     gradient: ["#15803d", "#22c55e"],
//   },
// ];

// const recentActivities = [
//   {
//     id: 1,
//     title: "Prayer time reminder set",
//     description: "Fajr prayer at 5:30 AM",
//     time: "2 hours ago",
//     icon: <Bell size={16} color="#10b981" />,
//   },
//   {
//     id: 2,
//     title: "Donated to Al-Noor Masjid",
//     description: "$25.00 contribution",
//     time: "1 day ago",
//     icon: <Heart size={16} color="#ef4444" />,
//   },
//   {
//     id: 3,
//     title: "Joined Friday Prayer",
//     description: "Central Masjid Lagos",
//     time: "3 days ago",
//     icon: <MosqueIcon size={16} color="#7c3aed" />,
//   },
// ];

// const masjidData = [
//   {
//     id: 1,
//     name: "Al-Noor Central Masjid",
//     location: "Victoria Island, Lagos",
//     distance: "0.8 km",
//     congregation: "500+",
//     nextPrayer: "Maghrib",
//     nextPrayerTime: "6:45 PM",
//     image: require("@/assets/images/masjid1.jpg"),
//     isOpen: true,
//   },
//   {
//     id: 2,
//     name: "Masjid Al-Furqan",
//     location: "Ikeja, Lagos",
//     distance: "2.1 km",
//     congregation: "300+",
//     nextPrayer: "Maghrib",
//     nextPrayerTime: "6:45 PM",
//     image: require("@/assets/images/tryit.jpg"),
//     isOpen: true,
//   },
//   {
//     id: 3,
//     name: "Lagos Central Mosque",
//     location: "Lagos Island",
//     distance: "3.5 km",
//     congregation: "1000+",
//     nextPrayer: "Maghrib",
//     nextPrayerTime: "6:45 PM",
//     image: require("@/assets/images/tryit2.jpg"),
//     isOpen: true,
//   },
//   {
//     id: 4,
//     name: "Masjid At-Taqwa",
//     location: "Surulere, Lagos",
//     distance: "4.2 km",
//     congregation: "250+",
//     nextPrayer: "Maghrib",
//     nextPrayerTime: "6:45 PM",
//     image: require("@/assets/images/masjid1.jpg"),
//     isOpen: false,
//   },
// ];

// const { width } = Dimensions.get("window");

// export default function HomeScreen() {
//   const ref = useRef<ICarouselInstance>(null);
//   const progress = useSharedValue<number>(0);
//   const [prayerTimes, setPrayerTimes] = useState<any>(null);
//   const [prayerData, setPrayerData] = useState<any>(null);
//   const [currentPrayer, setCurrentPrayer] = useState<string>("");
//   const [nextPrayer, setNextPrayer] = useState<string>("");
//   const [timeToNext, setTimeToNext] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [currentTime, setCurrentTime] = useState<string>("");
//   const [masjids, setMasjids] = useState<any[]>([]);
//   const router = useRouter();

//   const today = new Date();
//   const day = today.toLocaleDateString("en-US", { day: "numeric" });
//   const month = today.toLocaleDateString("en-US", { month: "long" });
//   const year = today.getFullYear();
//   const formattedDate = `${day} ${month}, ${year}`;

//   useEffect(() => {
//     const fetchPrayerTimes = async () => {
//       try {
//         const response = await fetch(
//           "https://api.aladhan.com/v1/timingsByCity?city=Lagos&country=Nigeria&method=2"
//         );
//         const data = await response.json();
//         setPrayerTimes(data.data.timings);
//         setPrayerData(data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching prayer times:", error);
//         setLoading(false);
//       }
//     };

//     fetchPrayerTimes();
//   }, []);

//   useEffect(() => {
//     const updateCurrentTime = () => {
//       const now = new Date();
//       const timeString = now.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//       });
//       setCurrentTime(timeString);
//     };

//     updateCurrentTime();
//     const timeInterval = setInterval(updateCurrentTime, 60000);

//     return () => clearInterval(timeInterval);
//   }, []);

//   useEffect(() => {
//     if (!prayerTimes) return;

//     const updateCurrentAndNextPrayer = () => {
//       const now = new Date();
//       const currentTime = now.getHours() * 60 + now.getMinutes();

//       const prayers = [
//         { name: "Fajr", time: prayerTimes.Fajr, emoji: "🌥️" },
//         { name: "Dhuhr", time: prayerTimes.Dhuhr, emoji: "☀️" },
//         { name: "Asr", time: prayerTimes.Asr, emoji: "🌤️" },
//         { name: "Maghrib", time: prayerTimes.Maghrib, emoji: "🌅" },
//         { name: "Isha", time: prayerTimes.Isha, emoji: "🌙" },
//       ];

//       const prayerMinutes = prayers.map((prayer) => {
//         const [hours, minutes] = prayer.time.split(":").map(Number);
//         return {
//           ...prayer,
//           minutes: hours * 60 + minutes,
//         };
//       });

//       let current = "Isha";
//       let next = "Fajr";
//       let currentEmoji = "🌙";
//       let nextEmoji = "🌥️";

//       for (let i = 0; i < prayerMinutes.length; i++) {
//         if (currentTime < prayerMinutes[i].minutes) {
//           next = prayerMinutes[i].name;
//           nextEmoji = prayerMinutes[i].emoji;
//           if (i > 0) {
//             current = prayerMinutes[i - 1].name;
//             currentEmoji = prayerMinutes[i - 1].emoji;
//           } else {
//             current = "Isha";
//             currentEmoji = "🌙";
//           }
//           break;
//         }
//         if (i === prayerMinutes.length - 1) {
//           current = prayerMinutes[i].name;
//           currentEmoji = prayerMinutes[i].emoji;
//           next = "Fajr";
//           nextEmoji = "🌥️";
//         }
//       }

//       setCurrentPrayer(`${currentEmoji} ${current}`);
//       setNextPrayer(`${nextEmoji} ${next}`);

//       const nextPrayerTime =
//         prayerMinutes.find((p) => p.name === next)?.minutes ||
//         prayerMinutes[0].minutes;
//       let minutesToNext = nextPrayerTime - currentTime;
//       if (minutesToNext <= 0) {
//         minutesToNext += 24 * 60;
//       }

//       const hoursToNext = Math.floor(minutesToNext / 60);
//       const minsToNext = minutesToNext % 60;
//       setTimeToNext(`${hoursToNext}h ${minsToNext}m`);
//     };

//     updateCurrentAndNextPrayer();
//     const interval = setInterval(updateCurrentAndNextPrayer, 60000);

//     return () => clearInterval(interval);
//   }, [prayerTimes]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getAllMasjids();
//       if (result.success) {
//         setMasjids(result.data);
//       } else {
//         console.error(result.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <ImageBackground
//       source={require("@/assets/images/pattern2.png")}
//       style={{ flex: 1, width: "100%", height: "100%" }}
//       imageStyle={{ opacity: 0.7 }}
//     >
//       <SafeAreaView
//         style={styles.container}
//         edges={["right", "bottom", "left"]}
//       >
//         <StatusBar style="dark" backgroundColor="#F5F5DC" />
//         <ScrollView
//           style={styles.scrollView}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           <View style={styles.header}>
//             <View>
//               <Text style={styles.dateText}>{formattedDate}</Text>
//             </View>
//             <View>
//               <View style={styles.locationContainer}>
//                 <MapPin size={16} color="#F5F5DC" />
//                 <Text style={styles.locationText}>Lagos, Nigeria</Text>
//               </View>
//               <Text style={styles.hijriDate}>
//                 {prayerData?.date.hijri.month.en} {prayerData?.date.hijri.year}{" "}
//                 AH
//               </Text>
//             </View>
//           </View>

//           <View style={styles.prayerTimeContainer}>
//             {loading ? (
//               <View>
//                 <ShimmerSkeleton
//                   height={40}
//                   variant="rect"
//                   style={{ marginBottom: 4 }}
//                 />
//                 <ShimmerSkeleton
//                   height={14}
//                   width="60%"
//                   lines={3}
//                   variant="text"
//                 />
//               </View>
//             ) : (
//               <ImageBackground
//                 source={require("@/assets/images/pattern2.jpg")}
//                 style={styles.prayerTimeCard}
//                 imageStyle={styles.prayerTimeImage}
//               >
//                 <View style={styles.prayerOverlay} />
//                 <View style={styles.currentPrayerSection}>
//                   <View style={styles.prayerInfo}>
//                     <Text style={styles.currentPrayerLabel}>
//                       Current Prayer
//                     </Text>
//                     <Text style={styles.currentPrayerText}>
//                       {currentPrayer}
//                     </Text>
//                   </View>
//                   <View style={styles.clockContainer}>
//                     <Clock size={24} color="#F5F5DC" />
//                     <Text style={styles.currentTimeText}>{currentTime}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.divider} />

//                 <View style={styles.nextPrayerSection}>
//                   <View style={styles.nextPrayerInfo}>
//                     <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
//                     <Text style={styles.nextPrayerText}>{nextPrayer}</Text>
//                   </View>
//                   <View style={styles.countdownContainer}>
//                     <Text style={styles.countdownLabel}>in</Text>
//                     <Text style={styles.countdownText}>{timeToNext}</Text>
//                   </View>
//                 </View>
//               </ImageBackground>
//             )}
//           </View>

//           <View>
//             <Text
//               className="text-midnight mb-2 text-lg"
//               style={{ fontFamily: "Inter_600SemiBold" }}
//             >
//               All Features
//             </Text>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               // style={styles.filtersContainer}
//               // contentContainerStyle={styles.filtersContent}
//               className="mb-4"
//             >
//               <View className=" flex-col gap-2 items-center justify-center mr-4">
//                 <TouchableOpacity className="items-center justify-center bg-emerald/30 p-3 rounded-2xl">
//                   <View className="bg-emerald p-2 rounded-xl mx-auto">
//                     <Stars size={24} color="#D4AF37" className="" />
//                   </View>
//                 </TouchableOpacity>
//                 <Text
//                   className="text-midnight"
//                   style={{ fontFamily: "Inter_600SemiBold" }}
//                 >
//                   Go Premium
//                 </Text>
//               </View>
//               <View className=" flex-col gap-1 items-center justify-center mr-4">
//                 <TouchableOpacity
//                   onPress={() => {
//                     router.push("/user/tasbih");
//                   }}
//                   className="items-center justify-center bg-emerald/30 p-3 rounded-2xl"
//                 >
//                   <View className="bg-emerald p-2 rounded-xl mx-auto">
//                     <BookOpen size={24} color="#fff" className="" />
//                   </View>
//                 </TouchableOpacity>
//                 <Text
//                   className="text-midnight"
//                   style={{ fontFamily: "Inter_600SemiBold" }}
//                 >
//                   Quran
//                 </Text>
//               </View>
//               <View className=" flex-col gap-1 items-center justify-center mr-4">
//                 <TouchableOpacity className="items-center justify-center bg-emerald/30 p-3 rounded-2xl">
//                   <View className="bg-emerald p-2 rounded-xl mx-auto">
//                     <MosqueIcon size={24} color="#fff" />
//                   </View>
//                 </TouchableOpacity>
//                 <Text
//                   className="text-midnight"
//                   style={{ fontFamily: "Inter_600SemiBold" }}
//                 >
//                   Masjids
//                 </Text>
//               </View>
//               <View className=" flex-col gap-1 items-center justify-center mr-4">
//                 <TouchableOpacity className="items-center justify-center bg-emerald/30 p-3 rounded-2xl">
//                   <View className="bg-emerald p-2 rounded-xl mx-auto">
//                     <CalendarClock size={24} color="#fff" className="" />
//                   </View>
//                 </TouchableOpacity>
//                 <Text
//                   className="text-midnight"
//                   style={{ fontFamily: "Inter_600SemiBold" }}
//                 >
//                   Events
//                 </Text>
//               </View>
//               <View className=" flex-col gap-1 items-center justify-center mr-4">
//                 <TouchableOpacity className="items-center justify-center bg-emerald/30 p-3 rounded-2xl">
//                   <View className="bg-emerald p-2 rounded-xl mx-auto">
//                     <PrayerTimeIcon size={24} color="#fff" />
//                   </View>
//                 </TouchableOpacity>
//                 <Text
//                   className="text-midnight"
//                   style={{ fontFamily: "Inter_600SemiBold" }}
//                 >
//                   Prayer Time
//                 </Text>
//               </View>
//               <View className=" flex-col gap-1 items-center justify-center mr-4">
//                 <TouchableOpacity className="items-center justify-center bg-emerald/30 p-3 rounded-2xl">
//                   <View className="bg-emerald p-2 rounded-xl mx-auto">
//                     <UserCog size={24} color="#fff" className="" />
//                   </View>
//                 </TouchableOpacity>
//                 <Text
//                   className="text-midnight"
//                   style={{ fontFamily: "Inter_600SemiBold" }}
//                 >
//                   Profile
//                 </Text>
//               </View>
//               <View className=" flex-col gap-1 items-center justify-center mr-4">
//                 <TouchableOpacity className="items-center justify-center bg-emerald/30 p-3 rounded-2xl">
//                   <View className="bg-emerald p-2 rounded-xl mx-auto">
//                     <QiblaIcon size={24} color="#fff" />
//                   </View>
//                 </TouchableOpacity>
//                 <Text
//                   className="text-midnight"
//                   style={{ fontFamily: "Inter_600SemiBold" }}
//                 >
//                   Qibla
//                 </Text>
//               </View>
//             </ScrollView>
//           </View>

//           {/* <View style={styles.featuresContainer}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Features</Text>
//               <Edit3Icon size={18} color="#10b981" />
//             </View>

//             <View style={styles.carouselContainer}>
//               <Carousel
//                 ref={ref}
//                 width={width / 2.2}
//                 height={240}
//                 data={data}
//                 loop
//                 autoPlay
//                 autoPlayInterval={4000}
//                 style={styles.carousel}
//                 renderItem={({ item }) => (
//                   <ImageBackground
//                     source={require("@/assets/images/pattern.jpg")}
//                     style={styles.featureCard}
//                     imageStyle={styles.featureCardImage}
//                   >
//                     <View style={styles.cardOverlay} />
//                     <View style={styles.iconWrapper}>{item.icon}</View>
//                     <Text style={styles.cardTitle}>{item.title}</Text>
//                     <Text style={styles.cardDescription}>
//                       {item.description}
//                     </Text>
//                     <TouchableOpacity
//                       style={[
//                         styles.cardButton,
//                         { backgroundColor: item.gradient[0] },
//                       ]}
//                     >
//                       <Text style={styles.cardButtonText}>
//                         {item.buttonText}
//                       </Text>
//                     </TouchableOpacity>
//                   </ImageBackground>
//                 )}
//               />
//               <Carousel
//                 ref={ref}
//                 width={width / 2.2}
//                 height={240}
//                 data={data2}
//                 loop
//                 autoPlay
//                 autoPlayInterval={4000}
//                 style={styles.carousel}
//                 renderItem={({ item }) => (
//                   <ImageBackground
//                     source={require("@/assets/images/pattern.jpg")}
//                     style={styles.featureCard}
//                     imageStyle={styles.featureCardImage}
//                   >
//                     <View style={styles.cardOverlay} />
//                     <View style={styles.iconWrapper}>{item.icon}</View>
//                     <Text style={styles.cardTitle}>{item.title}</Text>
//                     <Text style={styles.cardDescription}>
//                       {item.description}
//                     </Text>
//                     <TouchableOpacity
//                       style={[
//                         styles.cardButton,
//                         { backgroundColor: item.gradient[0] },
//                       ]}
//                     >
//                       <Text style={styles.cardButtonText}>
//                         {item.buttonText}
//                       </Text>
//                     </TouchableOpacity>
//                   </ImageBackground>
//                 )}
//               />
//             </View>
//           </View> */}

//           <View style={styles.divider} />

//           <View style={styles.masjidsContainer}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Explore Masjids</Text>
//               <TouchableOpacity>
//                 <Text style={styles.viewAllText}>View All</Text>
//               </TouchableOpacity>
//             </View>

//             <Carousel
//               width={width * 0.9}
//               height={width * 0.65}
//               data={masjidData}
//               loop
//               autoPlay={true}
//               autoPlayInterval={5000}
//               mode="parallax"
//               style={styles.masjidCarousel}
//               renderItem={({ item }) => (
//                 <TouchableOpacity style={styles.masjidCard}>
//                   <ImageBackground
//                     source={item.image}
//                     style={styles.masjidImageContainer}
//                     imageStyle={styles.masjidImage}
//                   >
//                     <View style={styles.masjidOverlay} />
//                     <View style={styles.masjidImagePlaceholder}>
//                       <MosqueIcon size={32} color="#10b981" />
//                     </View>
//                     <View
//                       style={[
//                         styles.statusBadge,
//                         {
//                           backgroundColor: item.isOpen ? "#10b981" : "#ef4444",
//                         },
//                       ]}
//                     >
//                       <Text style={styles.statusText}>
//                         {item.isOpen ? "Open" : "Closed"}
//                       </Text>
//                     </View>
//                   </ImageBackground>

//                   <View style={styles.masjidInfo}>
//                     <Text style={styles.masjidName} numberOfLines={1}>
//                       {item.name}
//                     </Text>
//                     <View style={styles.masjidDetails}>
//                       <View style={styles.locationRow}>
//                         <MapPin size={12} color="#F5F5DC" />
//                         <Text style={styles.masjidLocation} numberOfLines={1}>
//                           {item.location}
//                         </Text>
//                       </View>
//                       <Text style={styles.masjidDistance}>{item.distance}</Text>
//                     </View>

//                     <View style={styles.masjidFooter}>
//                       <View style={styles.congregationInfo}>
//                         <Text style={styles.congregationText}>
//                           {item.congregation} congregation
//                         </Text>
//                       </View>
//                       <View style={styles.nextPrayerInfo}>
//                         <Text style={styles.nextPrayerLabel}>Next: </Text>
//                         <Text style={styles.nextPrayerTime}>
//                           {item.nextPrayerTime}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>

//           <View style={styles.activitiesContainer}>
//             <Text style={styles.sectionTitle}>Recent Activities</Text>
//             {recentActivities.length > 0 ? (
//               <View style={styles.activitiesList}>
//                 {recentActivities.map((activity) => (
//                   <View key={activity.id} style={styles.activityItem}>
//                     <View style={styles.activityIcon}>{activity.icon}</View>
//                     <View style={styles.activityContent}>
//                       <Text style={styles.activityTitle}>{activity.title}</Text>
//                       <Text style={styles.activityDescription}>
//                         {activity.description}
//                       </Text>
//                     </View>
//                     <Text style={styles.activityTime}>{activity.time}</Text>
//                   </View>
//                 ))}
//               </View>
//             ) : (
//               <View style={styles.emptyState}>
//                 <Text style={styles.emptyStateText}>No recent activities</Text>
//                 <Text style={styles.emptyStateSubtext}>
//                   Your activities will appear here
//                 </Text>
//               </View>
//             )}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 30,
//     backgroundColor: "#F5F5DC", // Darker, semi-transparent base
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 48,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 16,
//   },
//   dateText: {
//     color: "#0D1B2A",
//     fontSize: 18,
//     fontFamily: "Inter_700Bold",
//     letterSpacing: 0.5,
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0D1B2A",
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   locationText: {
//     color: "#F5F5DC",
//     fontSize: 14,
//     fontFamily: "Inter_600SemiBold",
//     marginLeft: 6,
//   },
//   hijriDate: {
//     color: "#0D1B2A",
//     fontSize: 14,
//     fontFamily: "Inter_500Medium",
//     textAlign: "right",
//     marginTop: 6,
//   },
//   prayerTimeContainer: {
//     marginBottom: 16,
//   },
//   prayerTimeCard: {
//     borderRadius: 20,
//     padding: 20,
//     marginTop: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 10,
//     overflow: "hidden",
//   },
//   prayerTimeImage: {
//     borderRadius: 20,
//     opacity: 0.9,
//   },
//   prayerOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(15, 23, 42, 0.5)", // Subtle overlay for readability
//   },
//   loadingText: {
//     color: "#94a3b8",
//     fontSize: 16,
//     fontFamily: "Inter_500Medium",
//     textAlign: "center",
//   },
//   currentPrayerSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   prayerInfo: {
//     flex: 1,
//   },
//   currentPrayerLabel: {
//     color: "#e2e8f0",
//     fontSize: 14,
//     fontFamily: "Inter_500Medium",
//     marginBottom: 4,
//   },
//   currentPrayerText: {
//     color: "#F5F5DC",
//     fontSize: 22,
//     fontFamily: "Inter_700Bold",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     marginVertical: 12,
//   },
//   nextPrayerSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   nextPrayerInfo: {
//     flex: 1,
//   },
//   nextPrayerLabel: {
//     color: "#e2e8f0",
//     fontSize: 14,
//     fontFamily: "Inter_500Medium",
//     marginBottom: 4,
//   },
//   nextPrayerText: {
//     color: "#F5F5DC",
//     fontSize: 20,
//     fontFamily: "Inter_700Bold",
//   },
//   countdownContainer: {
//     alignItems: "flex-end",
//   },
//   countdownLabel: {
//     color: "#e2e8f0",
//     fontSize: 12,
//     fontFamily: "Inter_400Regular",
//     marginBottom: 4,
//   },
//   countdownText: {
//     color: "#F5F5DC",
//     fontSize: 18,
//     fontFamily: "Inter_700Bold",
//   },
//   featuresContainer: {
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   sectionTitle: {
//     color: "#0D1B2A",
//     fontSize: 18,
//     fontFamily: "Inter_700Bold",
//     letterSpacing: 0.5,
//   },
//   carouselContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   carousel: {
//     marginTop: 4,
//   },
//   featureCard: {
//     borderRadius: 16,
//     padding: 16,
//     marginHorizontal: 6,
//     justifyContent: "space-between",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 10,
//     overflow: "hidden",
//   },
//   featureCardImage: {
//     borderRadius: 16,
//     opacity: 0.8,
//   },
//   cardOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(15, 23, 42, 0.5)", // Subtle overlay for cards
//   },
//   iconWrapper: {
//     padding: 8,
//     borderRadius: 12,
//     alignSelf: "flex-start",
//     marginBottom: 8,
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//   },
//   cardTitle: {
//     color: "#fff",
//     fontSize: 20,
//     fontFamily: "Inter_700Bold",
//     marginBottom: 6,
//   },
//   cardDescription: {
//     color: "#d1d5db",
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 12,
//     fontFamily: "Inter_400Regular",
//   },
//   cardButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   cardButtonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 14,
//     fontFamily: "Inter_600SemiBold",
//   },
//   activitiesContainer: {
//     marginBottom: 24,
//   },
//   activitiesList: {
//     marginTop: 16,
//   },
//   activityItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0D1B2A",
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 6,
//   },
//   activityIcon: {
//     backgroundColor: "rgba(15, 23, 42, 0.8)",
//     padding: 10,
//     borderRadius: 12,
//     marginRight: 12,
//   },
//   activityContent: {
//     flex: 1,
//   },
//   activityTitle: {
//     color: "#e2e8f0",
//     fontSize: 16,
//     fontFamily: "Inter_600SemiBold",
//     marginBottom: 4,
//   },
//   activityDescription: {
//     color: "#94a3b8",
//     fontSize: 14,
//     fontFamily: "Inter_400Regular",
//   },
//   activityTime: {
//     color: "#6b7280",
//     fontSize: 12,
//     fontFamily: "Inter_500Medium",
//   },
//   emptyState: {
//     alignItems: "center",
//     padding: 32,
//     backgroundColor: "rgba(30, 41, 59, 0.9)",
//     borderRadius: 16,
//     marginTop: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   emptyStateText: {
//     color: "#94a3b8",
//     fontSize: 16,
//     fontFamily: "Inter_600SemiBold",
//     marginBottom: 4,
//   },
//   emptyStateSubtext: {
//     color: "#6b7280",
//     fontSize: 14,
//     fontFamily: "Inter_400Regular",
//   },
//   clockContainer: {
//     alignItems: "center",
//     gap: 6,
//   },
//   currentTimeText: {
//     color: "#F5F5Dc",
//     fontSize: 16,
//     fontFamily: "Inter_700Bold",
//   },
//   masjidCarousel: {
//     marginTop: 0,
//   },
//   masjidCard: {
//     backgroundColor: "#0D1B2A",
//     borderRadius: 16,
//     marginHorizontal: 8,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   masjidImageContainer: {
//     height: 140,
//     backgroundColor: "rgba(15, 23, 42, 0.8)",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   masjidImage: {
//     width: "100%",
//     height: "100%",
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     opacity: 0.9,
//   },
//   masjidOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(15, 23, 42, 0.4)", // Subtle overlay for masjid cards
//   },
//   masjidImagePlaceholder: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//     opacity: 0.5,
//   },
//   statusBadge: {
//     position: "absolute",
//     top: 12,
//     right: 12,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   statusText: {
//     color: "#fff",
//     fontSize: 12,
//     fontFamily: "Inter_600SemiBold",
//   },
//   masjidInfo: {
//     padding: 16,
//   },
//   masjidName: {
//     color: "#F5F5DC",
//     fontSize: 18,
//     fontFamily: "Inter_700Bold",
//     marginBottom: 8,
//   },
//   masjidDetails: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   masjidLocation: {
//     color: "#F5F5DC",
//     fontSize: 13,
//     fontFamily: "Inter_400Regular",
//     marginLeft: 6,
//     flex: 1,
//   },
//   masjidDistance: {
//     color: "#10b981",
//     fontSize: 13,
//     fontFamily: "Inter_600SemiBold",
//   },
//   masjidFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   congregationInfo: {
//     flex: 1,
//   },
//   congregationText: {
//     color: "#F5F5DC",
//     fontSize: 12,
//     fontFamily: "Inter_400Regular",
//   },
//   nextPrayerInfos: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   nextPrayerLabels: {
//     color: "#F5F5DC",
//     fontSize: 12,
//     fontFamily: "Inter_400Regular",
//   },
//   nextPrayerTime: {
//     color: "#10b981",
//     fontSize: 12,
//     fontFamily: "Inter_600SemiBold",
//   },
//   masjidsContainer: {
//     marginBottom: 10,
//   },
//   viewAllText: {
//     color: "#10b981",
//     fontSize: 14,
//     fontFamily: "Inter_600SemiBold",
//     textDecorationLine: "underline",
//   },
// });
