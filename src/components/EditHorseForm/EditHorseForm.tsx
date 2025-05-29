import { useState, FormEvent } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { Horse } from "../../types/types";

interface EditableHorseFormProps {
  horse: Horse;
  horseId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditHorseForm = ({
  horse,
  horseId,
  onClose,
  onSuccess,
}: EditableHorseFormProps) => {
  const [formData, setFormData] = useState<Horse>(horse);

  const handleChange = (field: keyof Horse, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const horseRef = doc(db, "horses", horseId);
      await updateDoc(horseRef, formData);
      alert("Horse updated!");
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Failed to update horse:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="editable-horse-form">
      {[
        "name",
        "breed",
        "gender",
        "height",
        "color",
        "genotype",
        "created",
        "owner",
        "breeder",
        "url",
        "community",
      ].map((field) => (
        <div key={field}>
          <label>
            {field[0].toUpperCase() + field.slice(1)}:
            {field === "gender" ? (
              <select
                value={formData.gender ?? ""}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Stallion">Stallion</option>
                <option value="Mare">Mare</option>
                <option value="Gelding">Gelding</option>
              </select>
            ) : field === "height" ? (
              <input
                type="number"
                value={formData.height ?? ""}
                onChange={(e) => handleChange("height", e.target.value)}
              />
            ) : field === "created" ? (
              <input
                type="date"
                value={formData.created ?? ""}
                onChange={(e) => handleChange("created", e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={(formData as any)[field] ?? ""}
                onChange={(e) =>
                  handleChange(field as keyof Horse, e.target.value)
                }
              />
            )}
          </label>
        </div>
      ))}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditHorseForm;
