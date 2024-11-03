import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    return (
        <div className="grid grid-cols-2 gap-[100px] mr-[100px] ml-[100px] mb-[75px]">
            <div className="w-[650px] h-[350px] flex flex-row items-center shadow-lg shadow-black/30 rounded-lg relative overflow-hidden hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:border-r-[6px] hover:before:border-[#F7A221] transition-all duration-200">
                <div className="p-6 flex flex-row gap-x-6">
                    <img src={event.eventImage} alt="Flutter UI Hackathon" className="h-[280px] w-[260px]" />
                    <div className="flex flex-col align-items:start ml-[25px]">
                        <h1 className=" text-2xl " style={{ color: '#F7A221' }}>
                            {event.eventName}
                        </h1>
                        <h5 className="mt-6">{event.eventShortDesc}</h5>
                        <h5 className="mt-6">{event.eventDate}</h5>
                        <h5 className="">{event.eventVenue}</h5>
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