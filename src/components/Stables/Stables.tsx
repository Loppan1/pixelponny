import { useEffect, useState } from "react";
import { Stable } from "../../types/types";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../api/firebase";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./Stables.css";

const Stables = ({}: {}) => {
  const [results, setResults] = useState<Stable[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStables = async () => {
      setLoading(true);
      try {
        const stablesRef = collection(db, "stables");
        const q = query(stablesRef, orderBy("name"));
        const querySnapshot = await getDocs(q);
        const stablesData = querySnapshot.docs.map(
          (doc) => doc.data() as Stable
        );
        setResults(stablesData);
      } catch (err) {
        console.error("Error fetching stables:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStables();
  }, []);

  return (
    <div>
      <SectionTitle title="Stables" />
      <div className="section-wrapper">
        {loading ? (
          <p>Loading results...</p>
        ) : results.length === 0 ? (
          <p>No stables found.</p>
        ) : (
          <table className="stables__results">
            <thead>
              <tr>
                <th>Name</th>
                <th>Affix</th>
                <th>Owner</th>
                <th>Registered horses</th>
                <th>Bred horses</th>
                <th>Community</th>
              </tr>
            </thead>
            <tbody>
              {results.map((stable) => (
                <tr key={stable.name}>
                  <td>
                    <Link to={`/stables/${stable.name}`}>{stable.name}</Link>
                  </td>
                  <td>{stable.affix?.join(", ") ?? ""}</td>
                  <td>{stable.owner}</td>
                  <td>{stable.registeredHorses?.length ?? 0}</td>
                  <td>{stable.bredHorses?.length ?? 0}</td>
                  <td>{stable.community}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Stables;
