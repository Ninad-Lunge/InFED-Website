import React, { useState } from 'react';


const EventCard = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleKnowMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="event-card">
            <img src="" alt="" className="event-image" />
            <h3>Title</h3>
            <p>This is a description</p>
            <p>12/2/2024</p>
            <p>INFED, Nagpur</p>
            <button onClick={handleKnowMore}>Know More</button>

            {isExpanded && (
                <div className="event-expanded">
                    <p>{event.description}</p>
                    <div className="carousel">
                        {event.images.map((img, index) => (
                            <img key={index} src={img} alt={`Event image ${index + 1}`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCard;