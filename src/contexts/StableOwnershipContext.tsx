import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase";

type StableOwnershipContextType = {
  canEdit: boolean;
  loading: boolean;
};

const StableOwnershipContext = createContext<StableOwnershipContextType>({
  canEdit: false,
  loading: true,
});

type Props = {
  children: ReactNode;
  stableName: string;
};

export const StableOwnershipProvider = ({ children, stableName }: Props) => {
  const { user } = useContext(AuthContext);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOwnership = async () => {
      setLoading(true);
      setCanEdit(false);

      if (!user?.email || !stableName) {
        setLoading(false);
        return;
      }

      try {
        const usernameQuery = query(
          collection(db, "usernames"),
          where("email", "==", user.email)
        );
        const usernameSnapshot = await getDocs(usernameQuery);
        if (usernameSnapshot.empty) {
          setLoading(false);
          return;
        }

        const username = usernameSnapshot.docs[0].id;

        const stablesQuery = query(
          collection(db, "stables"),
          where("name", "==", stableName)
        );
        const stablesSnapshot = await getDocs(stablesQuery);
        if (stablesSnapshot.empty) {
          setLoading(false);
          return;
        }

        const stableData = stablesSnapshot.docs[0].data();
        const isOwner = stableData.owner && stableData.owner === username;
        setCanEdit(isOwner);
      } catch (err) {
        console.error("Ownership check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkOwnership();
  }, [user?.email, stableName]);

  return (
    <StableOwnershipContext.Provider value={{ canEdit, loading }}>
      {children}
    </StableOwnershipContext.Provider>
  );
};

export const useStableOwnership = () => useContext(StableOwnershipContext);
