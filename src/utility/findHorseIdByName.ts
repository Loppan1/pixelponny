import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase";

export const findHorseIdByName = async (
  name: string
): Promise<string | null> => {
  const q = query(collection(db, "horses"), where("name", "==", name));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const horseDoc = snapshot.docs[0];
    return horseDoc.data().id || null;
  }

  return null;
};
