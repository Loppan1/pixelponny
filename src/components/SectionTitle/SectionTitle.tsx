import "./SectionTitle.css";

type SectionTitleProps = {
  title: string;
  smallTitle?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ title, smallTitle }) => {
  return (
    <div className="section-title">
      <h1>{title}</h1>
      <h2>{smallTitle}</h2>
    </div>
  );
};

export default SectionTitle;
