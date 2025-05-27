import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase";

export const generateCustomHorseId = async (): Promise<string> => {
  const now = new Date();
  const yymm = `${now.getFullYear().toString().slice(-2)}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;
  const prefix = `PP-${yymm}`;

  const tryGenerate = async (): Promise<string> => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const fullId = `${prefix}-${randomDigits}`;

    const q = query(collection(db, "horses"), where("customId", "==", fullId));
    const snapshot = await getDocs(q);

    return snapshot.empty ? fullId : await tryGenerate();
  };

  return await tryGenerate();
};
