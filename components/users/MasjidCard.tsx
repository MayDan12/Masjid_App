import { Masjid } from "@/types/masjid";
import {
  Clock,
  Heart,
  MapPin,
  Navigation,
  Phone,
  Star,
  Users,
} from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MasjidCardProps {
  masjid: Masjid;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onGetDirections: () => void;
  onCall: () => void;
}

const { width } = Dimensions.get("window");
const cardWidth = width - 32;

export const MasjidCard: React.FC<MasjidCardProps> = ({
  masjid,
  isFavorite,
  onToggleFavorite,
  onGetDirections,
  onCall,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: masjid.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={styles.favoriteButton}
        >
          <Heart
            size={20}
            color={isFavorite ? "#EF4444" : "#6B7280"}
            fill={isFavorite ? "#EF4444" : "transparent"}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.statusBadge,
            masjid.isOpen ? styles.openBadge : styles.closedBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {masjid.isOpen ? "Open" : "Closed"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {masjid.name}
          </Text>
          <View style={styles.rating}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{masjid.rating}</Text>
          </View>
        </View>

        <View style={styles.addressRow}>
          <MapPin size={14} color="#fff" />
          <Text style={styles.address} numberOfLines={1}>
            {masjid.address}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Navigation size={14} color="#fff" />
            <Text style={styles.statText}>{masjid.distance} km</Text>
          </View>
          <View style={styles.stat}>
            <Users size={14} color="#fff" />
            <Text style={styles.statText}>{masjid.congregation}</Text>
          </View>
        </View>

        <View style={styles.prayerInfo}>
          <View style={styles.prayerHeader}>
            <Clock size={14} color="#3B82F6" />
            <Text style={styles.prayerLabel}>Next Prayer</Text>
          </View>
          <View style={styles.prayerDetails}>
            <Text style={styles.prayerName}>{masjid.nextPrayer}</Text>
            <Text style={styles.prayerTime}>{masjid.nextPrayerTime}</Text>
          </View>
        </View>

        <View style={styles.facilities}>
          {masjid.facilities.slice(0, 3).map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Text style={styles.facilityText}>{facility}</Text>
            </View>
          ))}
          {masjid.facilities.length > 3 && (
            <View style={styles.facilityTag}>
              <Text style={styles.facilityText}>
                +{masjid.facilities.length - 3}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onGetDirections}
          >
            <Navigation size={16} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onCall}>
            <Phone size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: "#334155",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openBadge: {
    backgroundColor: "#10B981",
  },
  closedBadge: {
    backgroundColor: "#EF4444",
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  name: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
    marginRight: 8,
    fontFamily: "Inter_700Bold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#92400E",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  address: {
    flex: 1,
    marginLeft: 6,
    fontSize: 14,
    color: "#fff",
    fontFamily: "Inter_400Regular",
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#fff",
    fontFamily: "Inter_400Regular",
  },
  prayerInfo: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 10,
    marginBottom: 6,
  },
  prayerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  prayerLabel: {
    marginLeft: 6,
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
    fontFamily: "Inter_400Regular",
  },
  prayerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prayerName: {
    fontSize: 16,
    color: "#1E40AF",
    fontFamily: "Inter_600SemiBold",
  },
  prayerTime: {
    fontSize: 14,
    color: "#1E40AF",
  },
  facilities: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  facilityTag: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  facilityText: {
    fontSize: 12,
    color: "#4B5563",
    fontFamily: "Inter_400Regular",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  secondaryButton: {
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
});
