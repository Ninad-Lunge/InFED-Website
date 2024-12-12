import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import ProgramGrid from '../components/Program/ProgramsGrid';
import { useRef } from 'react';

const Program = () => {
    const contactRef = useRef(null);

    return(
        <div className="event md:mt-10">
            <Navbar contactRef={contactRef} />
            <div className="flex flex-col items-center">
                <h1 className='text-2xl text-left my-10 '>Our <span className="text-[#F7A221] font-bold"> Programs</span></h1>
            </div>
            <ProgramGrid />
            <Contact ref={contactRef} />
        </div>
    );
}

export default Program;