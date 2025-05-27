import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase";
import { Horse } from "../types/types";

export const findHorsesByIds = async (ids: string[]) => {
  if (ids.length === 0) return [];

  const horsesRef = collection(db, "horses");
  const batches = [];

  while (ids.length) {
    const chunk = ids.splice(0, 10);
    const q = query(horsesRef, where("id", "in", chunk));
    batches.push(getDocs(q));
  }

  const results = await Promise.all(batches);
  return results.flatMap((snapshot) =>
    snapshot.docs.map((doc) => doc.data() as Horse)
  );
};
