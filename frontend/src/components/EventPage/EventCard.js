import React, { useState } from 'react';
import { Calendar, MapPin, Globe } from 'lucide-react';
import EventPopup from './EventPopup';

const EventCard = ({ event }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(event.startDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <>
      <div 
        className={`w-full max-w-4xl mx-auto bg-white 
          rounded-xl shadow-lg overflow-hidden 
          transition-all duration-300 ease-in-out
          transform hover:-translate-y-2 hover:shadow-2xl
          border-l-4 border-customYellow-300
          ${isHovered ? 'scale-[1.02]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/3 relative">
            <img 
              src={Array.isArray(event.images) ? event.images[0] : event.image} 
              alt={event.name} 
              className="w-full h-60 md:h-full object-cover transition-transform duration-300 transform hover:scale-105"
            />
            {event.mode === 'Online' && (
              <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                Online Event
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-3 text-customYellow-300 tracking-tight">
                {event.name}
              </h1>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {event.shortDesc}
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-500">
                <Calendar className="mr-2 w-5 h-5 text-customYellow-300" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin className="mr-2 w-5 h-5 text-customYellow-300" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Globe className="mr-2 w-5 h-5 text-customYellow-300" />
                <span>{event.mode}</span>
              </div>
            </div>

            <button 
              onClick={() => setShowPopup(true)}
              className="w-full py-3 px-6 bg-customYellow-300 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center group"
            >
              Know More
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <EventPopup event={event} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default EventCard;