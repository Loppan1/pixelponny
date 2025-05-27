import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../api/firebase";
import SectionTitle from "../components/SectionTitle/SectionTitle";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!username.trim() || !email.trim()) {
      setStatus("Please fill in both fields.");
      return;
    }

    try {
      await setDoc(doc(db, "usernames", username), {
        username: username.trim(),
        email: email.trim().toLowerCase(),
      });
      setStatus("User registered successfully!");
      setUsername("");
      setEmail("");
    } catch (err) {
      console.error("Error adding user:", err);
      setStatus("Failed to register user.");
    }
  };

  return (
    <div className="admin-page">
      <SectionTitle title="Admin: Register New User" />
      <div className="section-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
};

export default AdminPage;
