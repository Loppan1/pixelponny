import { Horse } from "../../types/types";
import SectionTitle from "../SectionTitle/SectionTitle";

type HorseAchievementsProps = {
  horse: Horse;
};

const HorseAchievements: React.FC<HorseAchievementsProps> = ({ horse }) => {
  const hasAchievements = horse.achievements && horse.achievements.length > 0;

  return (
    <>
      <SectionTitle title="Achievements" />
      <div className="section-wrapper">
        {hasAchievements ? (
          <ul>
            {horse.achievements!.map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        ) : (
          <h3 style={{ textAlign: "center" }}>No achievements</h3>
        )}
      </div>
    </>
  );
};

export default HorseAchievements;
