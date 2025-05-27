import { useEffect, useState } from "react";
import {
  collection,
  query as firestoreQuery,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../api/firebase";
import { Horse } from "../../types/types";
import "./SearchResults.css";
import { Link } from "react-router-dom";

type Inquiry = {
  name: string;
  gender: string;
  breed: string;
};

const SearchResults = ({ query }: { query: Inquiry }) => {
  const [results, setResults] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isEmptyQuery = !query.name && !query.gender && !query.breed;
    if (isEmptyQuery) return;

    const fetchResults = async () => {
      setLoading(true);

      try {
        const horsesRef = collection(db, "horses");
        const filters = [];

        if (query.name) {
          filters.push(where("name", ">=", query.name));
          filters.push(where("name", "<=", query.name + "\uf8ff"));
        }
        if (query.breed) {
          filters.push(where("breed", ">=", query.breed));
          filters.push(where("breed", "<=", query.breed + "\uf8ff"));
        }
        if (query.gender) {
          filters.push(where("gender", "==", query.gender));
        }

        const q =
          filters.length > 0
            ? firestoreQuery(horsesRef, ...filters)
            : horsesRef;
        const snapshot = await getDocs(q);
        const data: Horse[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Horse, "id">),
        }));

        setResults(data);
      } catch (error) {
        console.error("Error fetching horses:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      {loading ? (
        <p>Loading results...</p>
      ) : results.length === 0 ? (
        <p>No horses found.</p>
      ) : (
        <table className="search-results__horses">
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
            {results.map((horse) => (
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
      )}
    </div>
  );
};

export default SearchResults;
