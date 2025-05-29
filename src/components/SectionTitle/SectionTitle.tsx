import "./SectionTitle.css";

type SectionTitleProps = {
  title: string;
  smallTitle?: string;
  editButton?: React.ReactNode;
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  smallTitle,
  editButton,
}) => {
  return (
    <div className="section-title">
      <h1>{title}</h1>
      {smallTitle && <h2>{smallTitle}</h2>}
      {editButton && <div className="section-title__edit">{editButton}</div>}
    </div>
  );
};

export default SectionTitle;
