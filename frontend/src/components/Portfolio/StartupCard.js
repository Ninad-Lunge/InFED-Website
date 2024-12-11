import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartupCard = ({ startup }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (startup && startup._id) {
            navigate(`/startup/${startup._id}`);
        }
    };

    if (!startup) {
        return null;
    }    

    return (
        <div className="p-6 hover:shadow-2xl hover:rounded-2xl cursor-pointer flex flex-col items-center w-60 h-60" onClick={handleClick}>
            <img src={startup.image} alt={startup.name} className="w-40 h-40 object-contain rounded-md" />
            <h2 className="mt-2 text-lg font-semibold">{startup.name}</h2>
        </div>
    );
};

export default StartupCard;