import Hero from "../components/LandingPage/Hero";
import Navbar from "../components/Navbar";
import Contact from "../components/ContactUs";
import Statistics from "../components/LandingPage/Statistics";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Navbar />
      <Hero />
      <Statistics />
      <Contact />
    </div>
  );
};

export default LandingPage;
