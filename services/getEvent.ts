import { sanitizeData } from "@/constants/sanitize";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getEvents = async () => {
  try {
    const snapshot = await getDocs(collection(db, "events"));
    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...sanitizeData(doc.data()),
    }));

    return { success: true, data: events };
  } catch (error: any) {
    return { error: true, message: error.message || "Failed to fetch events" };
  }
};
