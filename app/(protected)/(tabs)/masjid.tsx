import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import { Alert, FlatList, Linking, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ErrorState } from "@/components/users/ErrorState";
import { LoadingState } from "@/components/users/LoadingState";
import { MasjidCard } from "@/components/users/MasjidCard";
import { SearchHeader } from "@/components/users/SearchHeader";
import { useMasjids } from "@/hooks/useMasjids";
import { FilterOption, Masjid } from "@/types/masjid";
import { LinearGradient } from "expo-linear-gradient";

export default function DiscoverScreen() {
  const { masjids, loading, error } = useMasjids();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filterOptions: FilterOption[] = [
    { value: "all", label: "All Masjids" },
    { value: "nearby", label: "Nearby (≤2km)" },
    { value: "open", label: "Open Now" },
    { value: "favorites", label: "Favorites" },
  ];

  const filteredMasjids = useMemo(() => {
    return masjids.filter((masjid: Masjid) => {
      const matchesSearch =
        masjid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        masjid.address.toLowerCase().includes(searchQuery.toLowerCase());

      switch (selectedFilter) {
        case "nearby":
          return matchesSearch && masjid.distance <= 2;
        case "open":
          return matchesSearch && masjid.isOpen;
        case "favorites":
          return matchesSearch && favorites.has(masjid.id);
        default:
          return matchesSearch;
      }
    });
  }, [masjids, searchQuery, selectedFilter, favorites]);

  const toggleFavorite = useCallback((masjidId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(masjidId)) {
        newFavorites.delete(masjidId);
      } else {
        newFavorites.add(masjidId);
      }
      return newFavorites;
    });
  }, []);

  const handleGetDirections = useCallback((masjid: Masjid) => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(
      masjid.address
    )}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Unable to open maps application");
    });
  }, []);

  const handleCall = useCallback((masjid: Masjid) => {
    if (masjid.phone) {
      Linking.openURL(`tel:${masjid.phone}`).catch(() => {
        Alert.alert("Error", "Unable to make phone call");
      });
    } else {
      Alert.alert(
        "No Phone Number",
        "Phone number not available for this masjid"
      );
    }
  }, []);

  const renderMasjidCard = useCallback(
    ({ item }: { item: Masjid }) => (
      <MasjidCard
        masjid={item}
        isFavorite={favorites.has(item.id)}
        onToggleFavorite={() => toggleFavorite(item.id)}
        onGetDirections={() => handleGetDirections(item)}
        onCall={() => handleCall(item)}
      />
    ),
    [favorites, toggleFavorite, handleGetDirections, handleCall]
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#FFFFFF", "#F5F5DC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      >
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          filterOptions={filterOptions}
          resultsCount={filteredMasjids.length}
        />

        <FlatList
          data={filteredMasjids}
          renderItem={renderMasjidCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
});
