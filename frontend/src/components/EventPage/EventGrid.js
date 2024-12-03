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
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      
      if (filter === 'upcoming') {
        return eventDate >= today;
      } else {
        return eventDate < today;
      }
    });

    setFilteredEvents(filtered);
    setActiveFilter(filter);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 flex gap-4">
        <div className="text-gray-600">Filter Events:</div>
        <button
          onClick={() => filterEvents(events, 'upcoming')}
          className={`px-4 py-2 rounded-full ${
            activeFilter === 'upcoming'
              ? 'bg-[#F7A221] text-white'
              : 'bg-white text-black border border-gray-300'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => filterEvents(events, 'past')}
          className={`px-4 py-2 rounded-full ${
            activeFilter === 'past'
              ? 'bg-[#F7A221] text-white'
              : 'bg-white text-black border border-gray-300'
          }`}
        >
          Past
        </button>
      </div>

      <div className="grid grid-cols-2 gap-12 mx-24">
        {filteredEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;