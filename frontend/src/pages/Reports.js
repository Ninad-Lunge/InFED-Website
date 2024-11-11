import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import { useRef } from 'react';

const Reports = () => {
    const contactRef = useRef(null);

    return(
        <div className="reports mt-10">
            <Navbar contactRef={contactRef} />
            <div className="flex flex-col items-center">
                <h1 className='text-2xl text-left my-10 '>Our <span className="text-[#F7A221] font-bold"> Reports</span></h1>
            </div>
            <Contact ref={contactRef} />
        </div>
    );
}

export default Reports;