import "./pages.css";
import banner from "../assets/banner.jpg";

const HomePage = () => {
  return (
    <div className="home-page">
      <img src={banner} />
      <div className="section-wrapper">
        <section className="home-page__card">
          <h1> Welcome </h1>
          <p>
            Welcome to PixelPonny, a registry for the Swedish SIM-horse
            community, open for everyone. The objective of this site is to
            collect data for SIM-horses from all around the globe. We collect
            the basic information of each horse here, as well as a URL to where
            you can find out more about them.
          </p>
          <h2>How do I use the registry?</h2>
          <p>
            Anyone can search for horses and stables but it is invite-only to be
            able to register. Anyone in the SIM-community, no matter what type
            of game you play, can ask for access to it. Unless you are the first
            from your specific community there will be an admin that can
            register an account for you.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
