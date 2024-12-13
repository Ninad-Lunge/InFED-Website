import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

const EventGrid = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('upcoming');

  useEffect(() => {
    fetch('https://infed-website-kkva.onrender.com/api/get-events')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        filterEvents(data, 'upcoming');
      })
      .catch((error) => console.error("Error fetching Events", error));
  }, []);

  const filterEvents = (eventsData, filter) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const filtered = eventsData.filter((event) => {
      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0);
      
      if (filter === 'upcoming') {
        return eventDate >= today;
      } else {
        return eventDate < today;
      }
    });
  
    // Sort upcoming events in ascending order (earliest first)
    if (filter === 'upcoming') {
      filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } 
    // Sort past events in descending order (most recent first)
    else {
      filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    }
  
    setFilteredEvents(filtered);
    setActiveFilter(filter);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 flex gap-4 mx-12">
        <div className="pt-2 text-gray-600">Filter Events:</div>
        <button
          onClick={() => filterEvents(events, 'upcoming')}
          className={`px-4 py-2 rounded-md ${
            activeFilter === 'upcoming'
              ? 'bg-[#F7A221] text-white'
              : 'bg-white text-black border border-gray-300'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => filterEvents(events, 'past')}
          className={`px-4 py-2 rounded-md ${
            activeFilter === 'past'
              ? 'bg-[#F7A221] text-white'
              : 'bg-white text-black border border-gray-300'
          }`}
        >
          Past
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-12">
        {filteredEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;