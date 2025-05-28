import { useState, FormEvent } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../api/firebase";

interface AddStableFormProps {
  username: string;
  onSuccess?: () => void;
}

const AddStableForm = ({ username, onSuccess }: AddStableFormProps) => {
  const [name, setName] = useState("");
  const [affix, setAffix] = useState("");
  const [community, setCommunity] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedAffix = affix.trim();

    if (!trimmedName) {
      alert("Please enter a stable name.");
      return;
    }

    try {
      const stablesRef = collection(db, "stables");
      const nameQuery = query(stablesRef, where("name", "==", trimmedName));
      const querySnapshot = await getDocs(nameQuery);

      if (querySnapshot.empty) {
        const newStable: any = {
          name: trimmedName,
          owner: username,
          registeredHorses: [],
          bredHorses: [],
          community: community,
        };
        if (trimmedAffix) {
          newStable.affix = trimmedAffix.split(",").map((s) => s.trim());
        }

        await addDoc(stablesRef, newStable);
        alert("Stable created!");
      } else {
        const existingDoc = querySnapshot.docs[0];
        const stableData = existingDoc.data();

        if (!stableData.owner) {
          await updateDoc(doc(db, "stables", existingDoc.id), {
            owner: username,
          });
          alert("Stable claimed!");
        } else {
          alert("This stable already has an owner.");
        }
      }

      setName("");
      setAffix("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding or updating stable:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-stable-form">
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Affix (optional, comma-separated):
          <input
            type="text"
            value={affix}
            onChange={(e) => setAffix(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Community (optional):
          <input
            type="text"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Stable</button>
    </form>
  );
};

export default AddStableForm;
