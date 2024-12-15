import React, { useEffect, useState } from 'react';
import StartupCard from './StartupCard';

const StartupsGrid = ({ scheme }) => {
    const [startups, setStartups] = useState([]);

    useEffect(() => {
        fetch('https://infed-website-kkva.onrender.com/api/get-startups')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const formattedData = data.map((startup) => ({
                ...startup,
                schemes: JSON.parse(startup.schemes), // Parse stringified array
            }));
            const filteredStartups = scheme 
                ? formattedData.filter((startup) => startup.schemes.includes(scheme))
                : formattedData;

            setStartups(filteredStartups);
        })
        .catch((error) => console.error('Error fetching startups:', error));      
    }, [scheme]); // Rerun if scheme changes

    return (
        <div className="grid grid-cols-2 scale-75 md:scale-100 md:grid-cols-4 gap-4 md:mx-12">
            {startups.map((startup, index) => (
                <StartupCard key={index} startup={startup} />
            ))}
        </div>
    );    
};

export default StartupsGrid;