import Hero from "../components/LandingPage/Hero";
import Navbar from "../components/Navbar";
import Contact from "../components/ContactUs";
import Statistics from "../components/LandingPage/Statistics";
import Objectives from "../components/LandingPage/Objectives";
import Programme from "../components/LandingPage/Programme";
import Partners from "../components/LandingPage/Partners";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Navbar />
      <Hero />
      <Statistics />
      <Objectives />
      <Programme />
      <Partners />
      <Contact />
    </div>
  );
};

export default LandingPage;
