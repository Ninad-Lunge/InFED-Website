import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import { useRef } from 'react';

const Reports = () => {
    const contactRef = useRef(null);

    return(
        <div className="reports mt-10">
            <Navbar />
            <Contact ref={contactRef} />
        </div>
    );
}

export default Reports;