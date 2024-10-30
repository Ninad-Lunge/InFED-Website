import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import EventCard from '../components/EventPage/EventCard';
import React,{useState} from 'react'

const Event = () => {
    return(
        <div className="event-page">
        <Navbar />

        <div className="event-filter">
            <h2>InFED Events</h2>
            <div className="filter-buttons">
                <button >
                    Upcoming
                </button>
                <button>
                    Past
                </button>
                <EventCard />
            </div>
        </div>

        <Contact />
    </div>
    );
}

export default Event;