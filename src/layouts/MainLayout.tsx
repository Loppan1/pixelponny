import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import "./layouts.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__wrapper">
        <div className="main-layout__navigation">
          <Navigation />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
      <div className="main-layout__footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
