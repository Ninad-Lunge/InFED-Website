import React, { useEffect, useState } from 'react';
import StartupCard from './StartupCard';

const StartupsGrid = ({ scheme }) => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!scheme) return;

        fetch(`https://infed-website-kkva.onrender.com/api/get-startups?scheme=${scheme}`)
            .then((response) => response.json())
            .then((data) => {
                setStartups(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching startups:", error);
                setLoading(false);
            });
    }, [scheme]);

    if (loading) return <div>Loading...</div>;

    if (!startups.length) return <div>No startups available for this scheme.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {startups.map((startup) => (
                <StartupCard key={startup._id} startup={startup} />
            ))}
        </div>
    );
};

export default StartupsGrid;