import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const EventCard = ({ event }) => {
    const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return (
        <div className="grid grid-cols-2 gap-[100px] mr-[100px] ml-[100px] mb-[75px]">
            <div className="w-[650px] h-[350px] flex flex-row items-center shadow-lg shadow-black/30 rounded-lg relative overflow-hidden transition-all duration-200 border-0 hover:border-r-[6px] hover:border-[#F7A221]">
                <div className="p-6 flex flex-row gap-x-5">
                    <img src={event.image} alt={event.name} className="h-[280px] w-[260px]  " />
                    <div className="flex flex-col align-items:start">
                        <h1 className="text-2xl flex content-start" style={{ color: '#F7A221' }}>
                            {event.name}
                        </h1>
                        <p className="mt-6 flex content-start">{event.shortDesc}</p>
                        <h5 className="mt-6 flex content-start">{formattedDate}</h5>
                        <h5 className="flex content-start">{event.mode} - {event.venue}</h5>
                        <button className="mt-auto mb-2 w-40 bg-white hover:bg-white-700 text-black font-bold py-2 px-4 rounded border border-black hover:shadow-[4px_4px_0px_#F7A221] hover:scale-105 hover:border-black transition-transform duration-200">
                            Know More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EventCard;