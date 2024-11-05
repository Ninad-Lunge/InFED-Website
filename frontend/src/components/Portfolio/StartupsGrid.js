import React, { useEffect, useState } from 'react';
import StartupCard from './StartupCard';

const StartupsGrid = ({ scheme }) => {
    const [startups, setStartups] = useState([]);

    useEffect(() => {
        fetch('/api/get-startups')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // If scheme is specified, filter startups by scheme
                const filteredStartups = scheme 
                    ? data.filter((startup) => startup.schemes.includes(scheme))
                    : data; // If no scheme, keep all startups
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