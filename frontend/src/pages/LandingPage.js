import Hero from "../components/LandingPage/Hero";
import Navbar from "../components/Navbar";
import Contact from "../components/ContactUs";
import Statistics from "../components/LandingPage/Statistics";
import Objectives from "../components/LandingPage/Objectives";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Navbar />
      <Hero />
      <Statistics />
      <Objectives />
      <Contact />
    </div>
  );
};

export default LandingPage;
