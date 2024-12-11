import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://infed-website-kkva.onrender.com/api/get-events"
        );
        setEvents(response.data.slice(0, 10)); // Show only the top 10 recent events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (containerRef.current && timelineRef.current) {
      const containerHeight = containerRef.current.scrollHeight;
      timelineRef.current.style.height = `${containerHeight}px`;
    }
  }, [events]);

  return (
    <div className="mb-[80px] px-5 md:px-10 lg:px-20 relative">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
          },
        }}
        className="flex items-center text-xl md:text-2xl lg:text-3xl font-bold mb-8"
      >
        <span className="text-gray-800">Events</span>
        <span className="ml-3 text-[#F7A221]">Calendar</span>
      </motion.div>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto h-[600px] overflow-y-auto px-4"
      >
        {/* Timeline line: Adjust height dynamically */}
        <div
          ref={timelineRef}
          className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-1 pointer-events-none"
        />

        {/* Events container */}
        <div className="relative">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const monthColor = index % 4 < 2 ? "#F7A221" : "#6B7280";

            return (
              <div
                key={event._id}
                className={`flex flex-col md:flex-row ${
                  isLeft
                    ? "md:justify-end md:mr-auto"
                    : "md:justify-start md:ml-auto"
                } w-full md:w-1/2 mb-8`}
              >
                {/* Timeline dot: Hidden on small screens */}
                <div
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 z-10"
                  style={{ borderColor: monthColor }}
                />

                {/* Event Card */}
                <div
                  className={`flex flex-col bg-white rounded-xl shadow-lg p-4 ${
                    isLeft ? "md:mr-8" : "md:ml-8"
                  }`}
                  style={{
                    borderWidth: "1px",
                    borderLeftWidth: "4px",
                    borderColor: monthColor,
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h1 className="text-lg md:text-xl font-semibold">
                        {event.name}
                      </h1>
                      <div className="flex items-center mt-2">
                        <div
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: monthColor }}
                        />
                        <h4 className="text-sm md:text-base text-gray-600">
                          {event.mode}
                        </h4>
                      </div>
                    </div>
                    <div className="flex flex-col items-end md:ml-auto">
                      <h1
                        className="text-lg md:text-xl font-semibold"
                        style={{ color: monthColor }}
                      >
                        {new Date(event.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </h1>
                      <h1 className="text-sm">
                        <span>{event.startTime ? event.startTime : "TBA"}</span>
                        {event.endTime && <span> - {event.endTime}</span>}
                      </h1>
                    </div>
                  </div>
                  <p className="mt-4 text-sm md:text-base text-gray-700 text-justify">
                    {event.description && event.description.length > 200
                      ? event.description.substring(0, 200) + "..."
                      : event.description || "No description available."}
                  </p>
                  <div className="mt-4 text-right">
                    <h5
                      className="font-semibold text-sm md:text-lg cursor-pointer"
                      style={{ color: monthColor }}
                    >
                      Know More
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;