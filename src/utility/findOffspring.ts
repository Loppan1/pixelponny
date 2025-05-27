import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase";
import { Horse } from "../types/types";

export const findOffspring = async (
  parentId: string,
  isDam: boolean
): Promise<Horse[]> => {
  const field = isDam ? "damRef" : "sireRef";
  const q = query(collection(db, "horses"), where(field, "==", parentId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Horse));
};
