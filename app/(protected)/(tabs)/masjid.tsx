import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ErrorState } from "@/components/users/ErrorState";
import { LoadingState } from "@/components/users/LoadingState";
import { MasjidCard } from "@/components/users/MasjidCard";
import { SearchHeader } from "@/components/users/SearchHeader";
import { useMasjids } from "@/hooks/useMasjids";
import { FilterOption, Masjid } from "@/types/masjid";

export default function DiscoverScreen() {
  const { masjids, loading, error } = useMasjids();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  console.table("Masjids:", masjids);

  const filterOptions: FilterOption[] = [
    { value: "all", label: "All Masjids" },
    { value: "nearby", label: "Nearby (≤2km)" },
    { value: "open", label: "Open Now" },
    { value: "favorites", label: "Favorites" },
  ];

  // const filteredMasjids = useMemo(() => {
  //   return masjids.filter((masjid: Masjid) => {
  //     const matchesSearch =
  //       masjid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       masjid.address.toLowerCase().includes(searchQuery.toLowerCase());

  //     switch (selectedFilter) {
  //       case "nearby":
  //         return matchesSearch && masjid.distance <= 2;
  //       case "open":
  //         return matchesSearch && masjid.isOpen;
  //       case "favorites":
  //         return matchesSearch && favorites.has(masjid.id);
  //       default:
  //         return matchesSearch;
  //     }
  //   });
  // }, [masjids, searchQuery, selectedFilter, favorites]);

  // const filteredMasjids = useMemo(() => {
  //   if (!Array.isArray(masjids)) return []; // ✅ guard
  //   return masjids.filter((masjid: Masjid) => {
  //     const matchesSearch =
  //       masjid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       masjid.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       masjid.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       masjid.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       masjid.country.toLowerCase().includes(searchQuery.toLowerCase());

  //     switch (selectedFilter) {
  //       // case "topRated":
  //       // return matchesSearch && masjid.rating >= 4.5; // Example: only highly rated
  //       // case "popular":
  //       //   return matchesSearch && masjid.followersCount >= 100; // Example: has many followers
  //       // case "facilities":
  //       //   return matchesSearch && masjid.facilityTypes.length > 0; // Has facilities
  //       // case "favorites":
  //       //   return matchesSearch && masjid.isFavorite;
  //       default:
  //         return matchesSearch;
  //     }
  //   });
  // }, [masjids, searchQuery, selectedFilter]);

  const filteredMasjids = useMemo(() => {
    if (!Array.isArray(masjids)) return [];

    const normalizedQuery = (searchQuery ?? "").toLowerCase();

    return masjids.filter((masjid: Masjid) => {
      const matchesSearch =
        (masjid.name ?? "").toLowerCase().includes(normalizedQuery) ||
        (masjid.address ?? "").toLowerCase().includes(normalizedQuery) ||
        (masjid.city ?? "").toLowerCase().includes(normalizedQuery) ||
        (masjid.state ?? "").toLowerCase().includes(normalizedQuery) ||
        (masjid.country ?? "").toLowerCase().includes(normalizedQuery);

      switch (selectedFilter) {
        case "favorites":
          return matchesSearch && masjid.isFavorite;
        default:
          return matchesSearch;
      }
    });
  }, [masjids, searchQuery, selectedFilter]);

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

  // const handleGetDirections = useCallback((masjid: Masjid) => {
  //   const url = `https://maps.google.com/?q=${encodeURIComponent(
  //     masjid.address
  //   )}`;
  //   Linking.openURL(url).catch(() => {
  //     Alert.alert("Error", "Unable to open maps application");
  //   });
  // }, []);

  const renderMasjidCard = useCallback(
    ({ item, index }: { item: Masjid; index: number }) => {
      console.log("Rendering masjid:", item.name, "at index:", index); // 👈 log here
      return (
        <MasjidCard
          masjid={item}
          isFavorite={favorites.has(item.id)}
          onToggleFavorite={() => toggleFavorite(item.id)}
        />
      );
    },
    [favorites, toggleFavorite]
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

      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        filterOptions={filterOptions}
      />

      <FlatList
        data={filteredMasjids}
        renderItem={renderMasjidCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
  },
  listContainer: {
    padding: 16,
  },
});
