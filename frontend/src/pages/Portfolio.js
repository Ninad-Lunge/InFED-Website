import Navbar from '../components/Navbar';
import StartupsGrid from '../components/Portfolio/StartupsGrid';
import Contact from '../components/ContactUs';
import { useRef } from 'react';

const Portfolio = () => {
    const contactRef = useRef(null);

    return(
        <div className="portfolio mt-10">
            <Navbar contactRef={contactRef} />
            <div className="flex flex-col items-center">
                <h1 className='text-2xl text-left my-10 '>Our Startup <span className="text-[#F7A221] font-bold"> Portfolio</span></h1>
            </div>
            <StartupsGrid />
            <Contact ref={contactRef} />
        </div>
    );
}

export default Portfolio;