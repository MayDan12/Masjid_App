import { Masjid } from "@/types/masjid";
import { useEffect, useState } from "react";

export const useMasjids = () => {
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMasjids = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const dummyMasjids: Masjid[] = [
          {
            id: "1",
            name: "Al-Noor Grand Mosque",
            address: "123 Main Street, Downtown",
            distance: 0.8,
            nextPrayer: "Maghrib",
            nextPrayerTime: "6:45 PM",
            congregation: 450,
            rating: 4.8,
            facilities: ["Parking", "Wudu Area", "Library", "Islamic School"],
            isOpen: true,
            image:
              "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=800",
            phone: "+1234567890",
            description:
              "A beautiful grand mosque serving the community for over 50 years.",
          },
          {
            id: "2",
            name: "Masjid Al-Hidayah",
            address: "456 Oak Avenue, Westside",
            distance: 1.2,
            nextPrayer: "Isha",
            nextPrayerTime: "8:15 PM",
            congregation: 280,
            rating: 4.6,
            facilities: ["Parking", "Islamic School", "Community Hall"],
            isOpen: true,
            image:
              "https://images.pexels.com/photos/1595846/pexels-photo-1595846.jpeg?auto=compress&cs=tinysrgb&w=800",
            phone: "+1234567891",
            description:
              "A welcoming community mosque with excellent educational programs.",
          },
          {
            id: "3",
            name: "Masjid As-Sabur",
            address: "789 Cedar Road, Eastside",
            distance: 2.1,
            nextPrayer: "Fajr",
            nextPrayerTime: "5:30 AM",
            congregation: 320,
            rating: 4.7,
            facilities: ["Parking", "Wudu Area", "Youth Center", "Gym"],
            isOpen: false,
            image:
              "https://images.pexels.com/photos/1058759/pexels-photo-1058759.jpeg?auto=compress&cs=tinysrgb&w=800",
            phone: "+1234567892",
            description:
              "Modern facilities with focus on youth development and fitness.",
          },
          {
            id: "4",
            name: "Masjid Ar-Rahman",
            address: "321 Pine Street, Northside",
            distance: 3.5,
            nextPrayer: "Dhuhr",
            nextPrayerTime: "12:30 PM",
            congregation: 180,
            rating: 4.5,
            facilities: ["Wudu Area", "Library", "Food Bank"],
            isOpen: true,
            image:
              "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800",
            phone: "+1234567893",
            description: "Small community mosque with strong social services.",
          },
        ];

        setMasjids(dummyMasjids);
        setError(null);
      } catch (err) {
        setError("Failed to load masjids. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMasjids();
  }, []);

  return { masjids, loading, error, setMasjids };
};
