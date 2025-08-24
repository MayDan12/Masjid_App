import { Event, EventType } from "@/types/event";
import { LinearGradient } from "expo-linear-gradient";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  Globe,
  GraduationCap,
  Heart,
  Lock,
  MapPin,
  Plus,
  Presentation,
  Repeat,
  Search,
  Sparkles,
  UserCheck,
  Users,
  Video,
  Wrench,
} from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ImamEventsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<EventType | "all">(
    "all"
  );
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getEventIcon = (type: EventType) => {
    const iconProps = { size: 20, color: "#10b981" };
    switch (type) {
      case "prayer":
        return <Clock {...iconProps} />;
      case "lecture":
        return <BookOpen {...iconProps} />;
      case "community":
        return <Users {...iconProps} />;
      case "charity":
        return <Heart {...iconProps} />;
      case "education":
        return <GraduationCap {...iconProps} />;
      case "celebration":
        return <Sparkles {...iconProps} />;
      case "workshop":
        return <Wrench {...iconProps} />;
      case "conference":
        return <Presentation {...iconProps} />;
      default:
        return <Calendar {...iconProps} />;
    }
  };

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case "prayer":
        return "#10b981";
      case "lecture":
        return "#3b82f6";
      case "community":
        return "#8b5cf6";
      case "charity":
        return "#ef4444";
      case "education":
        return "#f59e0b";
      case "celebration":
        return "#ec4899";
      case "workshop":
        return "#06b6d4";
      case "conference":
        return "#84cc16";
      default:
        return "#64748b";
    }
  };

  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Friday Jummah Prayer",
      description: "Weekly congregational prayer with Khutbah by Imam Abdullah",
      date: "2024-01-26",
      startTime: "13:00",
      endTime: "14:00",
      location: "Central Mosque, Lagos",
      type: "prayer",
      isRecurring: true,
      recurringFrequency: "weekly",
      isPublic: true,
      maxAttendees: "500",
      rsvps: ["user1", "user2", "user3"],
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
      createdBy: "imam1",
    },
    {
      id: "2",
      title: "Islamic Finance Workshop",
      description:
        "Learn about Halal investment strategies and Islamic banking principles",
      date: "2024-01-28",
      startTime: "15:00",
      endTime: "18:00",
      location: "Community Center Hall A",
      type: "workshop",
      isRecurring: false,
      isPublic: true,
      maxAttendees: "50",
      rsvps: ["user1", "user4", "user5", "user6"],
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T09:00:00Z",
      createdBy: "organizer1",
      meetingLink: "https://zoom.us/j/123456789",
    },
    {
      id: "3",
      title: "Quran Study Circle",
      description: "Weekly Tafseer session focusing on Surah Al-Baqarah",
      date: "2024-01-27",
      startTime: "19:00",
      endTime: "20:30",
      location: "Masjid An-Nur",
      type: "education",
      isRecurring: true,
      recurringFrequency: "weekly",
      isPublic: true,
      maxAttendees: "30",
      rsvps: ["user2", "user7", "user8"],
      createdAt: "2024-01-10T14:00:00Z",
      updatedAt: "2024-01-10T14:00:00Z",
      createdBy: "teacher1",
    },
    {
      id: "4",
      title: "Charity Drive for Orphans",
      description: "Collecting donations and supplies for local orphanage",
      date: "2024-01-29",
      startTime: "09:00",
      endTime: "17:00",
      location: "Masjid Parking Lot",
      type: "charity",
      isRecurring: false,
      isPublic: true,
      rsvps: ["user1", "user3", "user9", "user10", "user11"],
      createdAt: "2024-01-18T11:00:00Z",
      updatedAt: "2024-01-18T11:00:00Z",
      createdBy: "volunteer1",
    },
    {
      id: "5",
      title: "Eid Celebration Planning",
      description: "Community meeting to organize upcoming Eid festivities",
      date: "2024-01-30",
      startTime: "20:00",
      endTime: "21:30",
      location: "Virtual Meeting",
      type: "celebration",
      isRecurring: false,
      isPublic: false,
      maxAttendees: "20",
      rsvps: ["user2", "user4", "user12"],
      createdAt: "2024-01-19T16:00:00Z",
      updatedAt: "2024-01-19T16:00:00Z",
      createdBy: "committee1",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
  ];

  const filteredEvents =
    selectedFilter === "all"
      ? mockEvents
      : mockEvents.filter((event) => event.type === selectedFilter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getUpcomingEvents = () => {
    return mockEvents.slice(0, 3);
  };

  const eventTypes: (EventType | "all")[] = [
    "all",
    "prayer",
    "lecture",
    "community",
    "charity",
    "education",
    "celebration",
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Islamic Events</Text>
            <Text style={styles.headerSubtitle}>
              Connect with your community
            </Text>
          </View>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Plus size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchFilterRow}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={18} color="#64748b" />
            <Text style={styles.searchText}>Search events...</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color="#10b981" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <LinearGradient
          colors={["#1e293b", "#0f172a"]}
          style={styles.statCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Calendar size={24} color="#10b981" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </LinearGradient>

        <LinearGradient
          colors={["#065f46", "#064e3b"]}
          style={styles.statCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <UserCheck size={24} color="#ffffff" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Attending</Text>
        </LinearGradient>

        <LinearGradient
          colors={["#7c2d12", "#991b1b"]}
          style={styles.statCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Users size={24} color="#ffffff" />
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Hosting</Text>
        </LinearGradient>
      </View>

      {/* Event Type Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {eventTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterChip,
              selectedFilter === type && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(type)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === type && styles.filterChipTextActive,
              ]}
            >
              {type === "all"
                ? "All Events"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Upcoming Events Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Event List */}
      <View style={styles.eventsList}>
        {filteredEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventTypeContainer}>
                {getEventIcon(event.type)}
                <Text
                  style={[
                    styles.eventType,
                    { color: getEventTypeColor(event.type) },
                  ]}
                >
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Text>
              </View>

              <View style={styles.eventMeta}>
                {event.isRecurring && <Repeat size={14} color="#64748b" />}
                {event.isPublic ? (
                  <Globe size={14} color="#64748b" />
                ) : (
                  <Lock size={14} color="#64748b" />
                )}
              </View>
            </View>

            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription} numberOfLines={2}>
              {event.description}
            </Text>

            <View style={styles.eventDetails}>
              <View style={styles.eventDetailRow}>
                <Calendar size={16} color="#64748b" />
                <Text style={styles.eventDetailText}>
                  {formatDate(event.date)}
                </Text>
              </View>

              <View style={styles.eventDetailRow}>
                <Clock size={16} color="#64748b" />
                <Text style={styles.eventDetailText}>
                  {formatTime(event.startTime)}
                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                </Text>
              </View>

              <View style={styles.eventDetailRow}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.eventDetailText} numberOfLines={1}>
                  {event.location}
                </Text>
              </View>

              {event.meetingLink && (
                <View style={styles.eventDetailRow}>
                  <Video size={16} color="#64748b" />
                  <Text style={styles.eventDetailText}>Virtual Meeting</Text>
                </View>
              )}
            </View>

            <View style={styles.eventFooter}>
              <View style={styles.attendeesInfo}>
                <Users size={16} color="#10b981" />
                <Text style={styles.attendeesText}>
                  {event.rsvps.length} attending
                  {event.maxAttendees && ` / ${event.maxAttendees} max`}
                </Text>
              </View>

              <ChevronRight size={20} color="#64748b" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create Event Button */}
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={() => setShowCreateModal(true)}
      >
        <LinearGradient
          colors={["#10b981", "#059669"]}
          style={styles.createEventGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Plus size={20} color="#ffffff" />
          <Text style={styles.createEventText}>Create New Event</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 2,
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
  },
  searchText: {
    color: "#64748b",
    fontSize: 14,
    marginLeft: 12,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 25,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
  },
  statNumber: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  statLabel: {
    color: "#ffffff",
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  filtersContainer: {
    marginBottom: 25,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
  },
  filterChipActive: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "#10b981",
  },
  filterChipText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#10b981",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  seeAllText: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "500",
  },
  eventsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  eventCard: {
    backgroundColor: "rgba(30, 41, 59, 0.3)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  eventTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventType: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 8,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  eventDescription: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  eventDetails: {
    gap: 8,
    marginBottom: 16,
  },
  eventDetailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDetailText: {
    color: "#64748b",
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  eventFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(30, 41, 59, 0.5)",
  },
  attendeesInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendeesText: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  createEventButton: {
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 16,
    overflow: "hidden",
  },
  createEventGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  createEventText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 100,
  },
});
