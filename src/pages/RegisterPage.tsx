import RegisterHorse from "../components/RegisterHorse/RegisterHorse";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import { usePageTitle } from "../hooks/usePageTitle";

const RegisterPage = () => {
  usePageTitle("Register");

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
