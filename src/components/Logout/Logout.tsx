import { logout } from "../../services/authService";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error durig logout", error);
    }
  };

  return (
    <h2 onClick={handleLogout} style={{ cursor: "pointer" }}>
      LOG OUT
    </h2>
  );
};

export default Logout;
