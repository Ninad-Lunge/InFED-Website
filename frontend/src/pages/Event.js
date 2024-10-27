import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import { useRef } from 'react';

const Event = () => {
    const contactRef = useRef(null);

    return(
        <div className="event mt-10">
            <Navbar contactRef={contactRef} />
            <Contact ref={contactRef} />
        </div>
    );
}

export default Event;