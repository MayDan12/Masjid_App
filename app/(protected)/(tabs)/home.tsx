import MosqueIcon from "@/components/icons/MosqueIcon";
import {
  Bell,
  Calendar,
  Clock,
  Edit3Icon,
  Heart,
  MapPin,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
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

const data = [
  {
    icon: <MosqueIcon size={28} color="#fff" />,
    title: "Masjid Profiles",
    description: "Discover and connect with masjids in your area",
    link: "/dashboard/masjids",
    buttonText: "Explore Masjids",
    gradient: ["#059669", "#10b981"],
  },
  {
    icon: <Bell size={28} color="#fff" />,
    title: "Azan System",
    description: "Customize your azan notifications and preferences",
    link: "/dashboard/azan-settings",
    buttonText: "Azan Settings",
    gradient: ["#7c3aed", "#a855f7"],
  },
];

const data2 = [
  {
    icon: <Calendar size={28} color="#fff" />,
    title: "Events",
    description: "Stay updated with community events and gatherings",
    link: "/dashboard/events",
    buttonText: "View Events",
    gradient: ["#dc2626", "#ef4444"],
  },
  {
    icon: <Heart size={28} color="#fff" />,
    title: "Donations",
    description: "Support your local masjid with secure donations",
    link: "/dashboard/donate",
    buttonText: "Donate Now",
    gradient: ["#ea580c", "#f97316"],
  },
];

const recentActivities = [
  {
    id: 1,
    title: "Prayer time reminder set",
    description: "Fajr prayer at 5:30 AM",
    time: "2 hours ago",
    icon: <Bell size={16} color="#10b981" />,
  },
  {
    id: 2,
    title: "Donated to Al-Noor Masjid",
    description: "$25.00 contribution",
    time: "1 day ago",
    icon: <Heart size={16} color="#ef4444" />,
  },
  {
    id: 3,
    title: "Joined Friday Prayer",
    description: "Central Masjid Lagos",
    time: "3 days ago",
    icon: <MosqueIcon size={16} color="#7c3aed" />,
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
    image: "/beautiful-mosque-exterior.png",
    isOpen: true,
  },
  {
    id: 2,
    name: "Masjid Al-Furqan",
    location: "Ikeja, Lagos",
    distance: "2.1 km",
    congregation: "300+",
    nextPrayer: "Maghrib",
    nextPrayerTime: "6:45 PM",
    image: "/modern-mosque.png",
    isOpen: true,
  },
  {
    id: 3,
    name: "Lagos Central Mosque",
    location: "Lagos Island",
    distance: "3.5 km",
    congregation: "1000+",
    nextPrayer: "Maghrib",
    nextPrayerTime: "6:45 PM",
    image: "/placeholder-cp4jh.png",
    isOpen: true,
  },
  {
    id: 4,
    name: "Masjid At-Taqwa",
    location: "Surulere, Lagos",
    distance: "4.2 km",
    congregation: "250+",
    nextPrayer: "Maghrib",
    nextPrayerTime: "6:45 PM",
    image: "/community-mosque.png",
    isOpen: false,
  },
];

const { width } = Dimensions.get("window");

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
        { name: "Fajr", time: prayerTimes.Fajr, emoji: "🌅" },
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
      let nextEmoji = "🌅";

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
          nextEmoji = "🌅";
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Assalamu Alaikum</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <View>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#10b981" />
              <Text style={styles.locationText}>Lagos, Nigeria</Text>
            </View>
            <Text className="text-white text-sm mt-1 text-right ">
              {prayerData?.date.hijri.month.en} {prayerData?.date.hijri.year} AH
            </Text>
          </View>
        </View>

        <View style={styles.prayerTimeContainer}>
          {loading ? (
            <View style={styles.prayerTimeCard}>
              <Text style={styles.loadingText}>Loading prayer times...</Text>
            </View>
          ) : (
            <View style={styles.prayerTimeCard}>
              <View style={styles.currentPrayerSection}>
                <View style={styles.prayerInfo}>
                  <Text style={styles.currentPrayerLabel}>Current Prayer</Text>
                  <Text style={styles.currentPrayerText}>{currentPrayer}</Text>
                </View>
                <View style={styles.clockContainer}>
                  <Clock size={24} color="#10b981" />
                  <Text style={styles.currentTimeText}>{currentTime}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.nextPrayerSection}>
                <View style={styles.nextPrayerInfo}>
                  <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
                  <Text style={styles.nextPrayerText}>{nextPrayer}</Text>
                </View>
                <View style={styles.countdownContainer}>
                  <Text style={styles.countdownLabel}>in</Text>
                  <Text style={styles.countdownText}>{timeToNext}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Features</Text>
            <Edit3Icon size={18} color="#10b981" />
          </View>

          <View className="flex flex-row">
            <Carousel
              ref={ref}
              width={width / 2.2}
              height={200}
              data={data}
              loop
              autoPlay
              autoPlayInterval={4000}
              style={styles.carousel}
              renderItem={({ item }) => (
                <View style={styles.featureCard}>
                  <View
                    style={[
                      styles.iconWrapper,
                      { backgroundColor: item.gradient[0] },
                    ]}
                  >
                    {item.icon}
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  <TouchableOpacity
                    style={[
                      styles.cardButton,
                      { backgroundColor: item.gradient[0] },
                    ]}
                  >
                    <Text style={styles.cardButtonText}>{item.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Carousel
              ref={ref}
              width={width / 2.2}
              height={200}
              data={data2}
              loop
              autoPlay
              autoPlayInterval={4000}
              style={styles.carousel}
              renderItem={({ item }) => (
                <View style={styles.featureCard}>
                  <View
                    style={[
                      styles.iconWrapper,
                      { backgroundColor: item.gradient[0] },
                    ]}
                  >
                    {item.icon}
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  <TouchableOpacity
                    style={[
                      styles.cardButton,
                      { backgroundColor: item.gradient[0] },
                    ]}
                  >
                    <Text style={styles.cardButtonText}>{item.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Explore Masjid */}
        <View style={styles.masjidsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Masjids</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <Carousel
            width={width * 0.9}
            height={width * 0.5}
            data={masjidData}
            loop
            autoPlay
            autoPlayInterval={5000}
            style={styles.masjidCarousel}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.masjidCard}>
                <View style={styles.masjidImageContainer}>
                  <View style={styles.masjidImagePlaceholder}>
                    <MosqueIcon size={32} color="#10b981" />
                  </View>
                  <Image
                    source={require("@/assets/images/masjid1.jpg")}
                    style={styles.masjidImage}
                    resizeMode="cover"
                  />
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
                </View>

                <View style={styles.masjidInfo}>
                  <Text style={styles.masjidName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.masjidDetails}>
                    <View style={styles.locationRow}>
                      <MapPin size={12} color="#94a3b8" />
                      <Text style={styles.masjidLocation} numberOfLines={1}>
                        {item.location}
                      </Text>
                    </View>
                    <Text style={styles.masjidDistance}>{item.distance}</Text>
                  </View>

                  <View style={styles.masjidFooter}>
                    <View style={styles.congregationInfo}>
                      <Text style={styles.congregationText}>
                        {item.congregation} congregation
                      </Text>
                    </View>
                    <View style={styles.nextPrayerInfo}>
                      <Text style={styles.nextPrayerLabel}>Next: </Text>
                      <Text style={styles.nextPrayerTime}>
                        {item.nextPrayerTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Recent Activities */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {recentActivities.length > 0 ? (
            <View style={styles.activitiesList}>
              {recentActivities.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={styles.activityIcon}>{activity.icon}</View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityDescription}>
                      {activity.description}
                    </Text>
                  </View>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No recent activities</Text>
              <Text style={styles.emptyStateSubtext}>
                Your activities will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  dateText: {
    color: "#94a3b8",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationText: {
    color: "#10b981",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginLeft: 4,
  },
  prayerTimeContainer: {
    marginBottom: 10,
  },
  prayerTimeCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  currentPrayerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  prayerInfo: {
    flex: 1,
  },
  currentPrayerLabel: {
    color: "#94a3b8",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 4,
  },
  currentPrayerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#334155",
    marginVertical: 10,
  },
  nextPrayerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextPrayerInfo: {
    flex: 1,
  },
  nextPrayerLabel: {
    color: "#94a3b8",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 4,
  },
  nextPrayerText: {
    color: "#10b981",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  countdownContainer: {
    alignItems: "flex-end",
  },
  countdownLabel: {
    color: "#64748b",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 2,
  },
  countdownText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  featuresContainer: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  carousel: {
    marginTop: 4,
  },
  featureCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 6,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconWrapper: {
    padding: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    fontFamily: "Inter_400Regular",
  },
  cardButton: {
    paddingVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  activitiesContainer: {
    marginBottom: 20,
  },
  activitiesList: {
    marginTop: 16,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  activityIcon: {
    backgroundColor: "#0f172a",
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  activityDescription: {
    color: "#94a3b8",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  activityTime: {
    color: "#64748b",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  emptyState: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    marginTop: 16,
  },
  emptyStateText: {
    color: "#94a3b8",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  emptyStateSubtext: {
    color: "#64748b",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  clockContainer: {
    alignItems: "center",
    gap: 4,
  },
  currentTimeText: {
    color: "#10b981",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  masjidImage: {
    width: "100%",
    height: 120,
  },
  masjidCarousel: {
    marginTop: 4,
  },
  masjidCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    marginHorizontal: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  masjidImageContainer: {
    height: 80,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  masjidImagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
  },
  masjidInfo: {
    padding: 12,
  },
  masjidName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 6,
  },
  masjidDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  masjidLocation: {
    color: "#94a3b8",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginLeft: 4,
    flex: 1,
  },
  masjidDistance: {
    color: "#10b981",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  masjidFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  congregationInfo: {
    flex: 1,
  },
  congregationText: {
    color: "#64748b",
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  nextPrayerTime: {
    color: "#10b981",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  masjidsContainer: {
    marginBottom: 10,
  },
  viewAllText: {
    color: "#10b981",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
});
