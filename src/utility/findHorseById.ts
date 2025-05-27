import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase";

export const findHorsesById = async (id: string | undefined): Promise<any> => {
  let q;

  q = query(collection(db, "horses"), where("id", "==", id));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
