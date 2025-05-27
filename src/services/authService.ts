import { getDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, auth } from "../api/firebase";

export async function loginWithUsername(username: string, password: string) {
  const docRef = doc(db, "usernames", username);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Username not found");
  }

  const { email } = docSnap.data();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}
