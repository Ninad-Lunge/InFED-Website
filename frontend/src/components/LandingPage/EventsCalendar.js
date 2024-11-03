import React, { useState, useEffect, useRef } from "react";
import { ArrowDownCircle } from "lucide-react";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const observerTarget = useRef(null);

  // Generate dummy events for demonstration
  const generateEvents = (startDate, count) => {
    const months = [];
    const date = new Date(startDate);

    for (let i = 0; i < count; i++) {
      months.push({
        id: i,
        date: new Date(date.setMonth(date.getMonth() + 1)),
        title: "Flutter UI Hackathon",
        type: "In-person",
        time: "2pm - 3pm",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      });
    }
    return months;
  };

  // Load more events when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setEvents((prev) => [
            ...prev,
            ...generateEvents(new Date(2024, prev.length, 1), 6),
          ]);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initial load
  useEffect(() => {
    setEvents(generateEvents(new Date(2024, 0, 1), 6));
  }, []);

  return (
    <div className="mb-[80px] px-5 md:px-10 lg:px-20 relative">
      {/* Header */}
      <div className="flex justify-start text-2xl md:text-3xl font-semibold mb-[30px]">
        <span>Events</span>
        <span className="ml-2 text-[#F7A221]">Calendar</span>
      </div>

      {/* Scrollable container */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Timeline container with fixed height and scroll */}
        <div className="relative w-full h-[600px] overflow-y-auto overflow-x-hidden px-4">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300" />

          {/* Events container */}
          <div className="relative">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              const monthColor = index % 4 < 2 ? "#F7A221" : "#6B7280";

              return (
                <div
                  key={event.id}
                  className={`flex ${
                    isLeft ? "justify-end mr-auto" : "justify-start ml-auto"
                  } w-1/2 mb-8`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-gray-300 z-10"
                    style={{ borderColor: monthColor }}
                  />

                  {/* Card */}
                  <div
                    className={`flex flex-col w-[380px] h-[240px] rounded-xl shadow-lg relative ${
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
                        <h1 className="text-2xl font-semibold">
                          {event.title}
                        </h1>
                        <div className="flex flex-row">
                          <div
                            className="w-2 h-2 rounded-full mt-2 mr-2"
                            style={{ backgroundColor: monthColor }}
                          />
                          <h4 className="text-gray-600 text-left mr-auto">
                            {event.type}
                          </h4>
                        </div>
                      </div>
                      <div className="flex flex-col relative items-end items-center justify-center ml-auto">
                        <h1
                          className="text-2xl font-semibold"
                          style={{ color: monthColor }}
                        >
                          {event.date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </h1>
                        <h1 className="text-sm">{event.time}</h1>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-left mr-auto pl-5">
                        {event.description}
                      </h4>
                    </div>
                    <div>
                      <h5
                        className="font-semibold text-lg text-end mr-3 mt-3"
                        style={{ color: monthColor }}
                      >
                        Know More
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Infinite scroll trigger */}
            <div
              ref={observerTarget}
              className="flex justify-center items-center p-4"
            >
              <ArrowDownCircle
                className="animate-bounce text-gray-400"
                size={32}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
