import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase";
import { Stable } from "../types/types";
import { useAuth } from "../hooks/useAuth";
import SectionTitle from "../components/SectionTitle/SectionTitle";

const MyStablesPage = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [stables, setStables] = useState<Stable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsernameAndStables = async () => {
      if (!user?.email) return;

      try {
        const usernameQuery = query(
          collection(db, "usernames"),
          where("email", "==", user.email)
        );
        const usernameSnapshot = await getDocs(usernameQuery);

        if (usernameSnapshot.empty) {
          setUsername(null);
          setLoading(false);
          return;
        }

        const username = usernameSnapshot.docs[0].id;
        setUsername(username);

        const stablesQuery = query(
          collection(db, "stables"),
          where("owner", "==", username)
        );
        const stablesSnapshot = await getDocs(stablesQuery);

        const stablesData = stablesSnapshot.docs.map(
          (doc) => doc.data() as Stable
        );
        setStables(stablesData);
      } catch (err) {
        console.error("Error fetching stables:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsernameAndStables();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!username) return <p>No user data found.</p>;
  if (stables.length === 0) return <p>You don’t own any stables yet.</p>;

  return (
    <div className="my-stables-page">
      <SectionTitle title="My stables" />
      <div className="section-wrapper">
        <table className="my-stables__results">
          <thead>
            <tr>
              <th>Name</th>
              <th>Affix</th>
              <th>Registered Horses</th>
              <th>Bred Horses</th>
            </tr>
          </thead>
          <tbody>
            {stables.map((stable) => (
              <tr key={stable.name}>
                <td>{stable.name}</td>
                <td>
                  {Array.isArray(stable.affix)
                    ? stable.affix.join(", ")
                    : stable.affix}
                </td>
                <td>{stable.registeredHorses?.length ?? 0}</td>
                <td>{stable.bredHorses?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyStablesPage;
