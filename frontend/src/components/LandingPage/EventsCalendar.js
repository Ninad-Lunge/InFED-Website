import React from "react";

const EventsCalendar = () => {
  return (
    <div className="mb-[120px] px-5 md:px-10 lg:px-20">
      {/* Title Section */}
      <div className="flex justify-start text-2xl font-semibold mb-[50px]">
        <span>Events</span>
        <span className="ml-2 text-[#F7A221]">Calendar</span>
      </div>
      {/* cards section */}
      <div className="flex flex-col border border-[#F7A221] rounded-xl w-[500px] h-[240px] shadow-lg border-l-4 border-orange-400">
        <div className="flex flex-row p-5">
          <div>
            <h1 className="text-2xl font-semibold">Flutter UI Hackathon</h1>

            <div className="flex flex-row">
            <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 mr-2"></div>
            <h4 className="text-grey text-left mr-auto">In-person</h4>
            </div>

          </div>

          <div className="flex flex-col relative items-end items-center justify-center ml-auto">
            <h1 className="text-2xl text-[#F7A221] font-semibold">28 Sept</h1>
            <h1 className="text-sm">2pm - 3pm</h1>
          </div>
        </div>
        <div>
          <h4 className="text-left mr-auto pl-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </h4>
        </div>
        <div>
            <h5 className="text-[#F7A221] font-semibold text-lg text-end mr-3 mt-3">Know More</h5>
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
