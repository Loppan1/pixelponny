import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase";

export const findHorsesByName = async (
  name: string,
  genders: string[] = []
): Promise<any[]> => {
  let q;

  if (genders.length > 0) {
    q = query(
      collection(db, "horses"),
      where("name", "==", name),
      where("gender", "in", genders)
    );
  } else {
    q = query(collection(db, "horses"), where("name", "==", name));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
