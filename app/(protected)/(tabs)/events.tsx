// import { getEvents } from "@/services/getEvent";
// import { Event, EventType } from "@/types/event";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   BookOpen,
//   Calendar,
//   ChevronRight,
//   Clock,
//   Filter,
//   Globe,
//   GraduationCap,
//   Heart,
//   Lock,
//   MapPin,
//   Repeat,
//   Search,
//   UserCheck,
//   Users,
//   Video,
// } from "lucide-react-native";
// import { useEffect, useState } from "react";
// import {
//   Dimensions,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");

// export default function EventsScreen() {
//   const [selectedFilter, setSelectedFilter] = useState<EventType | "all">(
//     "all"
//   );
//   const [events, setEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getEvents();
//       if (result.success) {
//         setEvents(result.data);
//       }
//     };
//     fetchData();
//   }, []);

//   // console.log("Fetched Events:", events);

//   const getEventIcon = (type: EventType) => {
//     const iconProps = { size: 20, color: "#10b981" };
//     switch (type) {
//       case "janazah":
//         return <Clock {...iconProps} />;
//       case "lecture":
//         return <BookOpen {...iconProps} />;
//       case "class":
//         return <Users {...iconProps} />;
//       case "iftar":
//         return <Heart {...iconProps} />;
//       case "other":
//         return <GraduationCap {...iconProps} />;
//       // case "celebration":
//       //   return <Sparkles {...iconProps} />;
//       // case "workshop":
//       //   return <Wrench {...iconProps} />;
//       // case "conference":
//       //   return <Presentation {...iconProps} />;
//       default:
//         return <Calendar {...iconProps} />;
//     }
//   };

//   const getEventTypeColor = (type: EventType) => {
//     switch (type) {
//       case "janazah":
//         return "#10b981";
//       case "lecture":
//         return "#3b82f6";
//       case "class":
//         return "#8b5cf6";
//       case "iftar":
//         return "#ef4444";
//       case "other":
//         return "#f59e0b";
//       // case "celebration":
//       //   return "#ec4899";
//       // case "workshop":
//       //   return "#06b6d4";
//       // case "conference":
//       //   return "#84cc16";
//       default:
//         return "#64748b";
//     }
//   };

//   const filteredEvents =
//     selectedFilter === "all"
//       ? events
//       : events.filter((event) => event.type === selectedFilter);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (timeString: string) => {
//     const [hours, minutes] = timeString.split(":");
//     const date = new Date();
//     date.setHours(parseInt(hours), parseInt(minutes));
//     return date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const getUpcomingEvents = () => {
//     return events.slice(0, 3);
//   };

//   const eventTypes: (EventType | "all")[] = [
//     "all",
//     "iftar",
//     "lecture",
//     "janazah",
//     "other",
//   ];

//   return (
//     <LinearGradient
//       colors={["#FFFFFF", "#F5F5DC"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={StyleSheet.absoluteFill}
//     >
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <StatusBar barStyle="light-content" />
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerTop}>
//             <View>
//               <Text style={styles.headerTitle}>Islamic Events</Text>
//               <Text style={styles.headerSubtitle}>
//                 Connect with your community
//               </Text>
//             </View>
//           </View>

//           {/* Search and Filter */}
//           <View style={styles.searchFilterRow}>
//             <TouchableOpacity
//               style={styles.searchButton}
//               className="bg-emerald/30"
//             >
//               <Search size={18} color="#0D1B2A" />
//               <Text style={styles.searchText}>Search events...</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.filterButton}>
//               <Filter size={18} color="#10b981" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Quick Stats */}
//         <View style={styles.statsContainer}>
//           <LinearGradient
//             colors={["#1e293b", "#0f172a"]}
//             style={styles.statCard}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//           >
//             <Calendar size={24} color="#10b981" />
//             <Text style={styles.statNumber}>12</Text>
//             <Text style={styles.statLabel}>This Month</Text>
//           </LinearGradient>

//           <LinearGradient
//             colors={["#065f46", "#064e3b"]}
//             style={styles.statCard}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//           >
//             <UserCheck size={24} color="#ffffff" />
//             <Text style={styles.statNumber}>5</Text>
//             <Text style={styles.statLabel}>Attending</Text>
//           </LinearGradient>

//           <LinearGradient
//             colors={["#7c2d12", "#991b1b"]}
//             style={styles.statCard}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//           >
//             <Users size={24} color="#ffffff" />
//             <Text style={styles.statNumber}>3</Text>
//             <Text style={styles.statLabel}>Hosting</Text>
//           </LinearGradient>
//         </View>

//         {/* Event Type Filters */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.filtersContainer}
//           contentContainerStyle={styles.filtersContent}
//         >
//           {eventTypes.map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.filterChip,
//                 selectedFilter === type && styles.filterChipActive,
//               ]}
//               onPress={() => setSelectedFilter(type)}
//             >
//               <Text
//                 style={[
//                   styles.filterChipText,
//                   selectedFilter === type && styles.filterChipTextActive,
//                 ]}
//               >
//                 {type === "all"
//                   ? "All Events"
//                   : type.charAt(0).toUpperCase() + type.slice(1)}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Upcoming Events Section */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Upcoming Events</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See All</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Event List */}
//         <View style={styles.eventsList}>
//           {filteredEvents.map((event) => (
//             <TouchableOpacity
//               key={event.id}
//               style={styles.eventCard}
//               className="bg-emerald/30"
//             >
//               <View style={styles.eventHeader}>
//                 <View style={styles.eventTypeContainer}>
//                   {getEventIcon(event.type)}
//                   <Text
//                     style={[
//                       styles.eventType,
//                       { color: getEventTypeColor(event.type) },
//                     ]}
//                   >
//                     {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
//                   </Text>
//                 </View>

//                 <View style={styles.eventMeta}>
//                   {event.isRecurring && <Repeat size={14} color="#64748b" />}
//                   {event.isPublic ? (
//                     <Globe size={14} color="#64748b" />
//                   ) : (
//                     <Lock size={14} color="#64748b" />
//                   )}
//                 </View>
//               </View>

//               <Text style={styles.eventTitle}>{event.title}</Text>
//               <Text
//                 style={styles.eventDescription}
//                 numberOfLines={2}
//                 className="text-midnight/80"
//               >
//                 {event.description}
//               </Text>

//               <View style={styles.eventDetails}>
//                 <View style={styles.eventDetailRow}>
//                   <Calendar size={16} color="#0D1B2A" />
//                   <Text style={styles.eventDetailText}>
//                     {formatDate(event.date)}
//                   </Text>
//                 </View>

//                 <View style={styles.eventDetailRow}>
//                   <Clock size={16} color="#0D1B2A" />
//                   <Text style={styles.eventDetailText}>
//                     {formatTime(event.startTime)}
//                     {event.endTime && ` - ${formatTime(event.endTime)}`}
//                   </Text>
//                 </View>

//                 <View style={styles.eventDetailRow}>
//                   <MapPin size={16} color="#0D1B2A" />
//                   <Text style={styles.eventDetailText} numberOfLines={1}>
//                     {event.location}
//                   </Text>
//                 </View>

//                 {event.meetingLink && (
//                   <View style={styles.eventDetailRow}>
//                     <Video size={16} color="#0D1B2A" />
//                     <Text style={styles.eventDetailText}>Virtual Meeting</Text>
//                   </View>
//                 )}
//               </View>

//               <View style={styles.eventFooter}>
//                 <View style={styles.attendeesInfo}>
//                   <Users size={16} color="#10b981" />
//                   <Text style={styles.attendeesText}>
//                     {event.rsvps.length} attending
//                     {event.maxAttendees && ` / ${event.maxAttendees} max`}
//                   </Text>
//                 </View>

//                 <ChevronRight size={20} color="#64748b" />
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Bottom Spacing */}
//         <View style={styles.bottomSpacing} />
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingBottom: 14,
//   },
//   headerTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   headerTitle: {
//     color: "#0D1B2A",
//     fontSize: 24,
//     fontFamily: "Inter_700Bold",
//   },
//   headerSubtitle: {
//     color: "#0D1B2A",
//     fontSize: 14,
//     marginTop: 2,
//     fontFamily: "Inter_400Regular",
//   },
//   createButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#10b981",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   searchFilterRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   searchButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",

//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: "rgba(30, 41, 59, 0.5)",
//   },
//   searchText: {
//     color: "#64748b",
//     fontSize: 14,
//     marginLeft: 12,
//     fontFamily: "Inter_400Regular",
//   },
//   filterButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     backgroundColor: "rgba(16, 185, 129, 0.1)",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "rgba(16, 185, 129, 0.2)",
//   },
//   statsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     marginBottom: 20,
//     gap: 12,
//   },
//   statCard: {
//     flex: 1,
//     padding: 16,
//     borderRadius: 16,
//     alignItems: "center",
//     borderWidth: 1,
//     // borderColor: "rgba(30, 41, 59, 0.9)",
//   },
//   statNumber: {
//     color: "#ffffff",
//     fontSize: 20,
//     fontFamily: "Inter_700Bold",
//     marginTop: 8,
//   },
//   statLabel: {
//     color: "#ffffff",
//     fontSize: 12,
//     opacity: 0.8,
//     marginTop: 4,
//     fontFamily: "Inter_400Regular",
//   },
//   filtersContainer: {
//     marginBottom: 20,
//   },
//   filtersContent: {
//     paddingHorizontal: 20,
//     gap: 12,
//   },
//   filterChip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "rgba(30, 41, 59, 0.5)",
//     borderWidth: 1,
//     borderColor: "rgba(30, 41, 59, 0.5)",
//   },
//   filterChipActive: {
//     backgroundColor: "rgba(16, 185, 129, 0.2)",
//     borderColor: "#10b981",
//   },
//   filterChipText: {
//     color: "#ffffff",
//     fontSize: 14,
//     fontFamily: "Inter_400Regular",
//   },
//   filterChipTextActive: {
//     color: "#10b981",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     color: "#0D1B2A",
//     fontSize: 18,
//     fontFamily: "Inter_600SemiBold",
//   },
//   seeAllText: {
//     color: "#10b981",
//     fontSize: 14,
//     fontFamily: "Inter_500Medium",
//   },
//   eventsList: {
//     paddingHorizontal: 20,
//     gap: 10,
//   },
//   eventCard: {
//     borderRadius: 16,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "rgba(30, 41, 59, 0.5)",
//   },
//   eventHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   eventTypeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   eventType: {
//     fontSize: 12,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   eventMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   eventTitle: {
//     color: "#0D1B2A",
//     fontSize: 18,
//     fontFamily: "Inter_600SemiBold",
//     marginBottom: 4,
//   },
//   eventDescription: {
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 10,
//     fontFamily: "Inter_400Regular",
//   },
//   eventDetails: {
//     gap: 8,
//     marginBottom: 14,
//   },
//   eventDetailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   eventDetailText: {
//     color: "#0D1B2A",
//     opacity: 80,
//     fontSize: 14,
//     marginLeft: 12,
//     flex: 1,
//     fontFamily: "Inter_400Regular",
//   },
//   eventFooter: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(30, 41, 59, 0.5)",
//   },
//   attendeesInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   attendeesText: {
//     color: "#10b981",
//     fontSize: 14,
//     fontFamily: "Inter_500Medium",
//     marginLeft: 8,
//   },
//   createEventButton: {
//     marginHorizontal: 20,
//     marginTop: 30,
//     borderRadius: 16,
//     overflow: "hidden",
//   },
//   createEventGradient: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 16,
//     gap: 8,
//   },
//   createEventText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontFamily: "Inter_600SemiBold",
//   },
//   bottomSpacing: {
//     height: 100,
//   },
// });

import ShimmerSkeleton from "@/components/ShimmerSkeleton";
import { subscribeToEvents } from "@/services/getEvent";
import { Event } from "@/types/event";
import {
  BookOpen,
  Calendar,
  CalendarClock,
  Filter,
  HandHeart,
  Search,
  Users,
  Utensils,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ Palette
const COLORS = {
  emerald: "#2E7D32",
  sand: "#F5F5DC",
  midnight: "#0D1B2A",
  gold: "#D4AF37",
};

const filters = ["All", "lecture", "janazah", "iftar", "class", "other"];

// const events = [
//   {
//     id: "1",
//     title: "Friday Congregational Prayer",
//     type: "Prayer",
//     attendees: 120,
//   },
//   {
//     id: "2",
//     title: "Community Iftar Gathering",
//     type: "Community",
//     attendees: 85,
//   },
//   {
//     id: "3",
//     title: "Qur’an Study Circle",
//     type: "Education",
//     attendees: 40,
//   },
// ];

export default function EventsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Subscribe to realtime events
    const unsubscribe = subscribeToEvents((newEvents) => {
      setEvents(newEvents);
      setLoading(false);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  // "janazah" | "lecture" | "iftar" | "class" | "other";

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "janazah":
        return COLORS.emerald;
      case "lecture":
        return COLORS.gold;
      case "iftar":
        return COLORS.midnight;
      case "other":
        return "#8B5CF6"; // Optional extra (purple accent)
      default:
        return COLORS.midnight;
    }
  };
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "janazah":
        return <HandHeart size={24} color={COLORS.emerald} />;
      case "lecture":
        return <Users size={24} color={COLORS.emerald} />;
      case "iftar":
        return <Utensils size={24} color={COLORS.emerald} />;
      case "class":
        return <BookOpen size={24} color={COLORS.emerald} />;
      case "other":
        return <Calendar size={24} color={COLORS.emerald} />;
      default:
        return <Calendar size={24} color={COLORS.emerald} />;
    }
  };

  const filteredEvents =
    selectedFilter === "All"
      ? events
      : events.filter((e) => e.type === selectedFilter);

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5DC" }}>
      {/* <StatusBar style="light" /> */}
      {/* Background */}

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upcoming Events</Text>
          <Text style={styles.headerSubtitle}>
            Stay connected with your community
          </Text>
        </View>

        {/* Search & Filter */}
        <View style={styles.searchFilterContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color={COLORS.midnight} />
            <Text style={styles.searchText}>Search events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={COLORS.emerald} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <FlatList
          horizontal
          data={filters}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === item && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(item)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === item && styles.filterChipTextActive,
                ]}
                className="capitalize w-full text-center"
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        <FlatList
          data={loading ? [] : filteredEvents} // empty while loading
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            loading ? (
              // Skeleton loaders while fetching
              <View style={{ gap: 12 }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <ShimmerSkeleton key={i} height={70} variant="circle" />
                ))}
              </View>
            ) : (
              // Message when no events found
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  color: COLORS.midnight,
                }}
              >
                No events found
              </Text>
            )
          }
          renderItem={({ item: event }) => (
            <View
              style={styles.eventCard}
              className=" border-emerald/25 px-5 py-2 flex-row items-center"
            >
              {/* Event Icon */}
              <TouchableOpacity className="items-center justify-center bg-emerald/25 p-3 rounded-2xl">
                {getEventTypeIcon(event.type)}
              </TouchableOpacity>

              {/* Event Info */}
              <View className="flex-1 ml-4">
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text
                    style={[
                      styles.eventType,
                      { color: getEventTypeColor(event.type) },
                    ]}
                    className="capitalize"
                  >
                    {event.type}
                  </Text>
                </View>

                <View style={styles.eventFooter}>
                  <View className="space-y-2">
                    <View className="flex-row items-center">
                      <Users size={16} color={COLORS.midnight} />
                      <Text style={styles.attendeesText}>
                        {event.rsvps.length} attending
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <CalendarClock size={16} color={COLORS.midnight} />
                      <Text style={styles.attendeesText}>
                        {event.date
                          ? new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "TBD"}{" "}
                        / {event.startTime || "TBD"} - {event.endTime || "TBD"}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity className="p-2 bg-emerald rounded-lg ">
                    <Text style={styles.seeAllText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    color: COLORS.midnight,
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  headerSubtitle: {
    color: COLORS.midnight,
    fontSize: 14,
    marginTop: 2,
    fontFamily: "Inter_400Regular",
  },
  searchFilterContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  searchButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.emerald,
    backgroundColor: "rgba(46, 125, 50, 0.05)",
    marginRight: 12,
  },
  searchText: {
    marginLeft: 8,
    color: COLORS.midnight,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(46, 125, 50, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.emerald,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fbfbf1",
    borderWidth: 1,
    borderColor: COLORS.emerald,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: COLORS.emerald,
    borderColor: COLORS.emerald,
  },
  filterChipText: {
    color: COLORS.midnight,
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  filterChipTextActive: {
    color: COLORS.sand,
  },
  eventCard: {
    borderRadius: 16,
    backgroundColor: "#fbfbf1",
    borderWidth: 1,
    marginBottom: 10,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  eventTitle: {
    color: COLORS.midnight,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  eventType: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attendees: {
    flexDirection: "column",
    alignItems: "center",
  },
  attendeesText: {
    color: COLORS.midnight,
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    marginLeft: 8,
  },
  seeAllText: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
});
