import { Link } from "react-router-dom";
import "./HorsePedigree.css";

type PedigreeCellProps = {
  name: string;
  id?: string;
  color?: string;
  breed?: string;
  gen: number;
};

const PedigreeCell: React.FC<PedigreeCellProps> = ({
  name,
  id,
  gen,
  color,
  breed,
}) => {
  const renderName = () =>
    id ? (
      <Link to={`/horse/${id}`}>
        <h3>{name}</h3>
      </Link>
    ) : (
      <h3>{name}</h3>
    );

  if (gen === 1) {
    return (
      <div className="pedigree-cell__gen-one">
        {renderName()}
        <div>
          {breed && <h4>{breed}</h4>}
          {color && <h4>{color}</h4>}
        </div>
      </div>
    );
  }

  if (gen === 2) {
    return <div className="pedigree-cell__gen-two">{renderName()}</div>;
  }

  return <div className="pedigree-cell__gen-three">{renderName()}</div>;
};

export default PedigreeCell;
