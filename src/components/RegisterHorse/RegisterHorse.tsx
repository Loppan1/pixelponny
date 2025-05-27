import { useState } from "react";
import { db } from "../../api/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./RegisterHorse.css";
import { generateCustomHorseId } from "../../utility/generateCustomHorseId";
import { findHorsesByName } from "../../utility/findHorsesByName";
import { useNavigate } from "react-router-dom";
import { updateStableWithHorse } from "../../utility/updateStableWithHorse";

const RegisterHorse = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(0);
  const [color, setColor] = useState("");
  const [genotype, setGenotype] = useState("");
  const [created, setCreated] = useState("");
  const [sire, setSire] = useState("");
  const [dam, setDam] = useState("");
  const [sireOptions, setSireOptions] = useState<any[]>([]);
  const [damOptions, setDamOptions] = useState<any[]>([]);
  const [selectedSire, setSelectedSire] = useState<string>("");
  const [selectedDam, setSelectedDam] = useState<string>("");
  const [owner, setOwner] = useState("");
  const [breeder, setBreeder] = useState("");
  const [url, setUrl] = useState("");
  const [community, setCommunity] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Name is required.");
      return;
    }

    try {
      const id = await generateCustomHorseId();

      const sireRef = selectedSire || sire;
      const damRef = selectedDam || dam;

      await addDoc(collection(db, "horses"), {
        id,
        name,
        breed,
        gender,
        height,
        color,
        genotype,
        created,
        sire,
        dam,
        sireRef,
        damRef,
        owner,
        breeder,
        url,
        community,
      });
      if (owner) await updateStableWithHorse(owner, id, "registeredHorses");
      if (breeder) await updateStableWithHorse(breeder, id, "bredHorses");

      setStatus("success");
      navigate(`/horse/${id}`);
    } catch (err) {
      console.error("Error registering horse:", err);
      setStatus("error");
    }
  };

  return (
    <form className="register-horse" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="breed">
        Breed
        <input
          id="breed"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </label>
      <label htmlFor="gender">
        Gender
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Stallion">Stallion</option>
          <option value="Mare">Mare</option>
          <option value="Gelding">Gelding</option>
        </select>
      </label>
      <label htmlFor="height">
        Height (cm)
        <input
          id="height"
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </label>
      <label htmlFor="color">
        Color
        <input
          id="color"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <label htmlFor="genotype">
        Genotype
        <input
          id="genotype"
          placeholder="Genotype"
          value={genotype}
          onChange={(e) => setGenotype(e.target.value)}
        />
      </label>
      <label className="register-horse__grid-two" htmlFor="created">
        Created
        <input
          id="created"
          type="date"
          placeholder="Created"
          value={created}
          onChange={(e) => setCreated(e.target.value)}
        />
      </label>
      <label className="register-horse__grid-two" htmlFor="sire">
        Sire
        <input
          id="sire"
          placeholder="Sire"
          value={sire}
          onChange={(e) => setSire(e.target.value)}
          onBlur={async () => {
            if (sire) {
              const results = await findHorsesByName(sire, [
                "Stallion",
                "Gelding",
              ]);
              setSireOptions(results);
              setSelectedSire("");
            }
          }}
        />
        {sireOptions.length > 0 && (
          <div className="radio-list">
            {sireOptions.map((horse) => (
              <label key={horse.id} className="radio-list__parent-option">
                <input
                  type="radio"
                  name="sire-selection"
                  value={horse.id}
                  checked={selectedSire === horse.id}
                  onChange={() => setSelectedSire(horse.id)}
                />
                {horse.name} — {horse.breed} — {horse.color}
              </label>
            ))}
            <label className="radio-list__parent-option">
              <input
                type="radio"
                name="sireRef"
                value={sire}
                checked={selectedSire === sire}
                onChange={() => setSelectedSire(sire)}
              />
              None of the above
            </label>
          </div>
        )}
      </label>
      <label className="register-horse__grid-two" htmlFor="dam">
        Dam
        <input
          id="dam"
          placeholder="Dam"
          value={dam}
          onChange={(e) => setDam(e.target.value)}
          onBlur={async () => {
            if (dam) {
              const results = await findHorsesByName(dam, ["Mare"]);
              setDamOptions(results);
              setSelectedDam("");
            }
          }}
        />
        {damOptions.length > 0 && (
          <div className="radio-list">
            {damOptions.map((horse) => (
              <label key={horse.id} className="radio-list__parent-option">
                <input
                  type="radio"
                  name="dam-selection"
                  value={horse.id}
                  checked={selectedDam === horse.id}
                  onChange={() => setSelectedDam(horse.id)}
                />
                {horse.name} — {horse.breed} — {horse.color}
              </label>
            ))}
            <label className="radio-list__parent-option">
              <input
                type="radio"
                name="damRef"
                value={dam}
                checked={selectedDam === dam}
                onChange={() => setSelectedDam(dam)}
              />
              None of the above
            </label>
          </div>
        )}
      </label>
      <label htmlFor="owner">
        Owner
        <input
          id="owner"
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </label>
      <label htmlFor="breeder">
        Breeder
        <input
          id="breeder"
          placeholder="Breeder"
          value={breeder}
          onChange={(e) => setBreeder(e.target.value)}
        />
      </label>
      <label htmlFor="url">
        URL
        <input
          id="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <label htmlFor="community">
        Community
        <input
          id="community"
          placeholder="Community"
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
        />
      </label>

      <button className="register-horse__grid-four" type="submit">
        Register Horse
      </button>

      {status === "success" && <p>Horse registered successfully!</p>}
      {status === "error" && (
        <p style={{ color: "red" }}>Failed to register horse.</p>
      )}
    </form>
  );
};

export default RegisterHorse;
