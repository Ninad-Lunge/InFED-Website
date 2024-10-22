import Hero from '../components/LandingPage/Hero';
import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';

const LandingPage = () =>{
    return(
        <div className="LandingPage">
            <Navbar />
            <Hero />
            <Contact />
        </div>
    );
}

export default LandingPage;