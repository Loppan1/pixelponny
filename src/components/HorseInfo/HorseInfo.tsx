import { Horse } from "../../types/types";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./HorseInfo.css";

type HorseInfoProps = {
  horse: Horse;
};

const HorseInfo: React.FC<HorseInfoProps> = ({ horse }) => {
  return (
    <>
      <SectionTitle title={horse.name} smallTitle={horse.id} />
      <div className="horse-info section-wrapper">
        <div className="horse-info__info-section">
          <h3>Breed: {horse.breed}</h3>
          <h3>Gender: {horse.gender}</h3>
          <h3>Height: {horse.height} cm</h3>
        </div>
        <div className="horse-info__info-section">
          <h3>Color: {horse.color}</h3>
          <h3>Genotype: {horse.genotype}</h3>
        </div>
        <div className="horse-info__info-section">
          <h3>Created: {horse.created}</h3>
          <h3>Owner: {horse.owner}</h3>
          <h3>Breeder: {horse.breeder}</h3>
          <h3>Community: {horse.community}</h3>
        </div>
      </div>
    </>
  );
};

export default HorseInfo;
