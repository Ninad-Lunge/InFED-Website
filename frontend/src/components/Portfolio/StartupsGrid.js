import React, { useEffect, useState } from 'react';
import StartupCard from './StartupCard';

const StartupsGrid = () => {
    const [startups, setStartups] = useState([]);

    useEffect(() => {
        fetch('/api/get-startups')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setStartups(data))
            .catch((error) => console.error('Error fetching startups:', error));
    }, []);

    return (
        <div className="grid grid-cols-2 scale-75 md:scale-100 md:grid-cols-4 gap-4 md:mx-12">
            {startups.map((startup, index) => {
                // console.log('Rendering startup:', startup);
                return <StartupCard key={index} startup={startup} />;
            })}
        </div>
    );    
};

export default StartupsGrid;