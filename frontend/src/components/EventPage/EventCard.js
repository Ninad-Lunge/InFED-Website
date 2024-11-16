import React from 'react';

const EventCard = ({ event }) => {
    const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="w-full md:w-auto h-auto flex flex-col md:flex-row items-center shadow-md shadow-black/20 rounded-lg relative overflow-hidden transition-all duration-300 border-0 hover:shadow-[8px_4px_0px_0px_#F7A221]">
            <div className="p-4 md:p-5 flex flex-col md:flex-row gap-y-4 md:gap-x-4">
                <img src={event.image} alt={event.name} className="h-40 w-full md:h-[250px] md:w-[220px] object-cover rounded-lg" />
                
                <div className="flex flex-col justify-between md:align-items:start md:pl-3 text-left">
                    <h1 className="text-xl md:text-2xl" style={{ color: '#F7A221' }}>
                        {event.name}
                    </h1>
                    <p className="mt-3 text-gray-700">{event.shortDesc}</p>
                    <h5 className="mt-3 text-gray-500">{formattedDate}</h5>
                    <h5 className="text-gray-500">{event.mode} - {event.venue}</h5>
                    
                    <button className="mt-4 w-full md:w-40 bg-white text-black font-bold py-2 px-4 rounded border border-black hover:shadow-[4px_4px_0px_#F7A221] hover:scale-105 transition-transform duration-200">
                        Know More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
