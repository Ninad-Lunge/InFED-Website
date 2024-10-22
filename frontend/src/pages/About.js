import Navbar from '../components/Navbar';
import AboutInFED from '../components/About/AboutInFED';
import Leadership from '../components/About/Leadership';
import Contact from '../components/ContactUs';
import PeopleGrid from '../components/About/PersonProfile';

const About = () => {
    return(
        <div className="about">
            <Navbar />
            <AboutInFED />
            <Leadership />
            <PeopleGrid />
            <Contact />
        </div>
    );
}

export default About;