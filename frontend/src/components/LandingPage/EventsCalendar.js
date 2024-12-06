import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ArrowDownCircle } from "lucide-react";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const containerRef = useRef(null);
  const [timelineHeight, setTimelineHeight] = useState(0);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://infed-website-kkva.onrender.com/api/get-events"); // Replace with your actual backend route
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Dynamically update the timeline height based on the scrollable content
    if (containerRef.current) {
      setTimelineHeight(containerRef.current.scrollHeight);
    }
  }, []);

  return (
    <div className="mb-[80px] px-5 md:px-10 lg:px-20 relative">
      {/* Header */}
      <div className="flex justify-start text-2xl font-semibold mb-[30px]">
        <span>Events</span>
        <span className="ml-2 text-[#F7A221]">Calendar</span>
      </div>

      {/* Scrollable container */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Timeline container */}
        <div
          ref={containerRef}
          className="relative w-full h-[600px] overflow-y-auto overflow-x-hidden px-4"
        >
          {/* Timeline line */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="sticky top-0 w-full h-full">
              <div
                className="absolute left-1/2 transform -translate-x-1/2 bg-gray-300"
                style={{ width: "2px", height: `${timelineHeight}px` }}
              />{" "}
            </div>
          </div>

          {/* Events container */}
          <div className="relative min-h-full">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              const monthColor = index % 4 < 2 ? "#F7A221" : "#6B7280";

              return (
                <div
                  key={event._id}
                  className={`flex ${
                    isLeft ? "justify-end mr-auto" : "justify-start ml-auto"
                  } w-1/2 mb-8`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 z-10"
                    style={{ borderColor: monthColor }}
                  />

                  {/* Event Card */}
                  <div
                    className={`flex flex-col w-auto h-[240px] rounded-xl shadow-lg relative ${
                      isLeft ? "mr-8" : "ml-8"
                    }`}
                    style={{
                      borderWidth: "1px",
                      borderLeftWidth: "4px",
                      borderColor: monthColor,
                    }}
                  >
                    <div className="flex flex-row p-5">
                      <div>
                        <h1 className="text-2xl font-semibold">{event.name}</h1>
                        <div className="flex flex-row">
                          <div
                            className="w-2 h-2 rounded-full mt-2 mr-2"
                            style={{ backgroundColor: monthColor }}
                          />
                          <h4 className="text-gray-600 text-left mr-auto">
                            {event.mode}
                          </h4>
                        </div>
                      </div>
                      <div className="flex flex-col relative items-center justify-center ml-auto">
                        <h1
                          className="text-2xl font-semibold"
                          style={{ color: monthColor }}
                        >
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </h1>
                        <h1 className="text-sm">{event.time || "TBA"}</h1>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-left mr-auto pl-5">
                        {event.description && event.description.length > 200
                          ? event.description.substring(0, 200) + "..."
                          : event.description || "No description available."}
                      </h4>
                    </div>
                    <div>
                      <h5
                        className="font-semibold text-lg text-end mr-3 mt-3 absolute bottom-3 right-3"
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
    </div>
  );
};

export default EventsCalendar;
