import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import EventGrid from '../components/EventPage/EventGrid';
import { useRef } from 'react';

const Event = () => {
    const contactRef = useRef(null);

    return(
        <div className="event mt-10">
            <Navbar contactRef={contactRef} />
            <div className="flex flex-col items-center">
                <h1 className='text-2xl text-left my-10'>InFED <span className="text-[#F7A221] font-bold"> Events</span></h1>
            </div>
            <EventGrid />
            <Contact ref={contactRef} />
        </div>
    );
}

export default Event;