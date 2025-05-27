import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Horse } from "../types/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase";
import HorseInfo from "../components/HorseInfo/HorseInfo";
import HorseAchievements from "../components/HorseAchievements/HorseAchievements";
import HorsePedigree from "../components/HorsePedigree/HorsePedigree";
import HorseOffspring from "../components/HorseOffspring/HorseOffspring";

const HorsePage = () => {
  const { id } = useParams<{ id: string }>();
  const [horse, setHorse] = useState<Horse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHorse = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "horses"), where("id", "==", id));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as Horse;
          setHorse(data);
        } else {
          setHorse(null);
        }
      } catch (err) {
        console.error("Error fetching horse:", err);
        setHorse(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHorse();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!horse) return <p> No horse found with id: {id}</p>;

  return (
    <div className="horse-page">
      <div className="horse-page__column-two">
        <HorseInfo horse={horse} />
      </div>
      <div className="horse-page__column-one">
        <HorseAchievements horse={horse} />
      </div>
      <div className="horse-page__column-three">
        <HorsePedigree horse={horse} />
      </div>
      <div className="horse-page__column-three">
        <HorseOffspring horse={horse} />
      </div>
    </div>
  );
};

export default HorsePage;
