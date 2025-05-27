import { useEffect, useState } from "react";
import { Horse } from "../../types/types";
import SectionTitle from "../SectionTitle/SectionTitle";
import { findOffspring } from "../../utility/findOffspring";
import { Link } from "react-router-dom";
import "./HorseOffspring.css";

type HorseOffspringProps = {
  horse: Horse;
};

const HorseOffspring: React.FC<HorseOffspringProps> = ({ horse }) => {
  const [offspring, setOffspring] = useState<Horse[] | null>(null);

  useEffect(() => {
    const loadOffspring = async () => {
      if (!horse.id || !horse.gender) return;
      const isDam = horse.gender === "Mare";
      const results = await findOffspring(horse.id, isDam);
      setOffspring(results);
    };
    loadOffspring();
  }, [horse]);

  return (
    <>
      <SectionTitle title="Registered Offspring" />
      <div className="section-wrapper">
        {offspring === null ? (
          <div>Loading...</div>
        ) : offspring.length === 0 ? (
          <div className="horse-offspring__no-offspring">
            {horse.name} has no registered offspring
          </div>
        ) : (
          <table className="horse-offspring__horses">
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
              {offspring.map((foal) => (
                <tr key={foal.id}>
                  <td>
                    <Link to={`/horse/${foal.id}`}>{foal.name}</Link>
                  </td>
                  <td>{foal.gender}</td>
                  <td>{foal.breed}</td>
                  <td>{foal.color}</td>
                  <td>{foal.sire}</td>
                  <td>{foal.dam}</td>
                  <td>{foal.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default HorseOffspring;
