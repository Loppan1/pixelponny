import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Logout from "../Logout/Logout";
import "./Navigation.css";
import logo from "../../assets/pixelponny-logo.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return user ? (
    <nav className="navigation">
      <Link to={"/"}>
        <img src={logo} />
      </Link>
      <div className="navigation__left">
        <Link to={"/search"}>
          <h2>SEARCH</h2>
        </Link>
        <Link to={"/register"}>
          <h2>REGISTER</h2>
        </Link>
        <Link to={"/stables"}>
          <h2>STABLES</h2>
        </Link>
      </div>
      <div className="navigation__right">
        <Link to={"/mystables"}>
          <h2>MY STABLES</h2>
        </Link>
        <div className="navigation__logout-button">
          <Logout />
        </div>
      </div>
    </nav>
  ) : (
    <nav className="navigation">
      <Link to={"/"}>
        <img src={logo} />
      </Link>
      <div className="navigation__left">
        <Link to={"/search"}>
          <h2>SEARCH</h2>
        </Link>
        <Link to={"/stables"}>
          <h2>STABLES</h2>
        </Link>
      </div>
      <div className="navigation__right">
        <h2>
          <Link to={"/login"}>LOGIN</Link>
        </h2>
      </div>
    </nav>
  );
};

export default Navigation;
