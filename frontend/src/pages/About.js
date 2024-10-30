import Navbar from '../components/Navbar';
import AboutInFED from '../components/About/AboutInFED';
import Leadership from '../components/About/Leadership';
import Contact from '../components/ContactUs';
import PeopleGrid from '../components/About/PersonProfile';
import { useRef } from 'react';

const About = () => {
    const contactRef = useRef(null);

    return(
        <div className="about mt-10">
            <Navbar contactRef={contactRef} />
            <AboutInFED />
            <Leadership />
            <PeopleGrid />
            <Contact ref={contactRef} />
        </div>
    );
}

export default About;