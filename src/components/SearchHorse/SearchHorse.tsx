import { useState } from "react";
import "./SearchHorse.css";

const SearchHorse = ({ setQuery }: { setQuery: Function }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery({ name, breed, gender });
  };

  return (
    <form className="search-horse" onSubmit={handleSubmit}>
      <div className="search-horse__input">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="search-horse__input-under">
          <input
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="">All genders</option>
            <option value="Stallion">Stallion</option>
            <option value="Mare">Mare</option>
            <option value="Gelding">Gelding</option>
          </select>
        </div>
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchHorse;
