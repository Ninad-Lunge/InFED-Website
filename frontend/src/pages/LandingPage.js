import Hero from "../components/LandingPage/Hero";
import Navbar from "../components/Navbar";
import Contact from "../components/ContactUs";
import Statistics from "../components/LandingPage/Statistics";
import Objectives from "../components/LandingPage/Objectives";
import { useRef } from 'react';

const LandingPage = () => {

  const contactRef = useRef(null);

  return (
    <div className="LandingPage mt-10">
      <Navbar contactRef={contactRef} />
      <Hero />
      <Statistics />
      <Objectives />
      <Contact ref={contactRef} />
    </div>
  );
};

export default LandingPage;
