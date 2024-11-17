import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import { useRef } from 'react';
import Initiative from '../components/Initiatives/InitiativesCard';

const Initiatives = () => {
    const contactRef = useRef(null);

    return(
        <div className="initiatives mt-10">
            <Navbar contactRef={contactRef}/>
            <Initiative/>
            <Contact ref={contactRef} />
        </div>
    );
}

export default Initiatives;