import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import { useRef } from 'react';
import InitiativeDetails from '../components/Initiatives/InitiativePage';

const Initiatives = () => {
    const contactRef = useRef(null);

    return(
        <div className="initiatives md:mt-10">
            <Navbar contactRef={contactRef}/>
            <InitiativeDetails />
            <Contact ref={contactRef} />
        </div>
    );
}

export default Initiatives;