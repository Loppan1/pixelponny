import RegisterHorse from "../components/RegisterHorse/RegisterHorse";
import SectionTitle from "../components/SectionTitle/SectionTitle";

const RegisterPage = () => {
  return (
    <>
      <SectionTitle title="Register New Horse" />
      <div className="section-wrapper">
        <RegisterHorse />
      </div>
    </>
  );
};

export default RegisterPage;
