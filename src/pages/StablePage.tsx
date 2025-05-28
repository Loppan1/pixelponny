import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Horse, Stable } from "../types/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import { findHorsesByIds } from "../utility/findHorsesByIds";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

const StablePage = () => {
  const { name } = useParams<{ name: string }>();
  const [stable, setStable] = useState<Stable | null>(null);
  const [registeredHorses, setRegisteredHorses] = useState<Horse[]>([]);
  const [bredHorses, setBredHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeredPage, setRegisteredPage] = useState(1);
  const [bredPage, setBredPage] = useState(1);
  const pageSize = 10;
  const registeredHorseIds = stable?.registeredHorses ?? [];
  const bredHorseIds = stable?.bredHorses ?? [];
  const totalPagesReg = Math.ceil(registeredHorseIds.length / pageSize);
  const totalPagesBred = Math.ceil(bredHorseIds.length / pageSize);
  usePageTitle(name);

  useEffect(() => {
    const fetchStable = async () => {
      try {
        const q = query(collection(db, "stables"), where("name", "==", name));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as Stable;
          setStable(data);
        } else {
          setStable(null);
        }
      } catch (err) {
        console.error("Error fetching stable:", err);
        setStable(null);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchStable();
    }
  }, [name]);

  useEffect(() => {
    const fetchRegisteredHorses = async () => {
      if (!stable || !stable.registeredHorses?.length) return;
      const start = (registeredPage - 1) * pageSize;
      const end = start + pageSize;
      const ids = stable.registeredHorses.slice(start, end);
      const horses = await findHorsesByIds([...ids]);
      setRegisteredHorses(horses);
    };

    fetchRegisteredHorses();
  }, [stable, registeredPage]);

  useEffect(() => {
    const fetchBredHorses = async () => {
      if (!stable || !stable.bredHorses?.length) return;
      const start = (bredPage - 1) * pageSize;
      const end = start + pageSize;
      const ids = stable.bredHorses.slice(start, end);
      const horses = await findHorsesByIds([...ids]);
      setBredHorses(horses);
    };

    fetchBredHorses();
  }, [stable, bredPage]);

  if (loading) return <p>Loading...</p>;
  if (!stable) return <p> No stable found</p>;

  return (
    <div className="stable-page">
      <SectionTitle title={`Horses owned by ${stable.name}`} />
      <div className="section-wrapper">
        <table className="stable-page__horses">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Breed</th>
              <th>Color</th>
              <th>Sire</th>
              <th>Dam</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {registeredHorses.map((horse) => (
              <tr key={horse.id}>
                <td>
                  <Link to={`/horse/${horse.id}`}>{horse.name}</Link>
                </td>

                <td>{horse.gender}</td>
                <td>{horse.breed}</td>
                <td>{horse.color}</td>
                <td>{horse.sire}</td>
                <td>{horse.dam}</td>
                <td>{horse.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {registeredHorseIds.length > pageSize && (
          <div className="stable-page__pagination">
            {Array.from(
              { length: Math.min(totalPagesReg, 5) },
              (_, i) => i + 1
            ).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setRegisteredPage(pageNum)}
                className={
                  pageNum === registeredPage
                    ? "pagination-button active"
                    : "pagination-button"
                }
              >
                {pageNum}
              </button>
            ))}

            {totalPagesReg > 5 && <span>...</span>}
          </div>
        )}
      </div>
      <SectionTitle title={`Horses bred by ${stable.name}`} />
      <div className="section-wrapper">
        <table className="stable-page__horses">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Breed</th>
              <th>Color</th>
              <th>Sire</th>
              <th>Dam</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {bredHorses.map((horse) => (
              <tr key={horse.id}>
                <td>
                  <Link to={`/horse/${horse.id}`}>{horse.name}</Link>
                </td>

                <td>{horse.gender}</td>
                <td>{horse.breed}</td>
                <td>{horse.color}</td>
                <td>{horse.sire}</td>
                <td>{horse.dam}</td>
                <td>{horse.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {bredHorseIds.length > pageSize && (
          <div className="stable-page__pagination">
            {Array.from(
              { length: Math.min(totalPagesBred, 5) },
              (_, i) => i + 1
            ).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setBredPage(pageNum)}
                className={
                  pageNum === bredPage
                    ? "pagination-button active"
                    : "pagination-button"
                }
              >
                {pageNum}
              </button>
            ))}

            {totalPagesBred > 5 && <span>...</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StablePage;
