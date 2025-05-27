import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../api/firebase";

export const updateStableWithHorse = async (
  stableName: string,
  horseId: string,
  field: "registeredHorses" | "bredHorses"
) => {
  const stablesRef = collection(db, "stables");
  const q = query(stablesRef, where("name", "==", stableName));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, {
      [field]: arrayUnion(horseId),
    });
  } else {
    await addDoc(stablesRef, {
      name: stableName,
      [field]: [horseId],
    });
  }
};
