import React, {useEffect, useState} from "react";
import EventCard from "./EventCard";

const EventGrid = () => {
  const [events, setEvent] = useState([]);

  useEffect(() => {
    fetch('/api/get-events').then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => setEvent(data)).catch((error) =>  console.error("Error fetching Events",error)
    );
  }, [])
  
  return (
    <div className="grid grid-cols-2 scale-72 place-items-center gap-y-16 mx-16">
      {events.map((event,index) => {
        return <EventCard key = {index} event = {event} />;
      })}
    </div>
  )
}

export default EventGrid