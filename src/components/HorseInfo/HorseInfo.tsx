import { useState } from "react";
import { Horse } from "../../types/types";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./HorseInfo.css";
import EditHorseForm from "../EditHorseForm/EditHorseForm";
import Modal from "../Modal/Modal";

type HorseInfoProps = {
  horse: Horse;
};

const HorseInfo: React.FC<HorseInfoProps> = ({ horse }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <SectionTitle
        title={horse.name}
        smallTitle={horse.id}
        editButton={<button onClick={() => setEditing(true)}>Edit</button>}
      />
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
      <Modal isOpen={!!editing} onClose={() => setEditing(false)}>
        {editing && (
          <>
            <h2>Edit Horse</h2>
            <EditHorseForm
              horse={horse}
              horseId={horse.id}
              onClose={() => setEditing(false)}
              onSuccess={() => {
                window.location.reload();
              }}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default HorseInfo;
