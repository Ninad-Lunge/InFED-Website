import Hero from '../components/LandingPage/Hero';
import Navbar from '../components/Navbar';

const LandingPage = () =>{
    return(
        <div className="LandingPage">
            <Navbar />
            <Hero />
        </div>
    );
}

export default LandingPage;