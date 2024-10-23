import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const StartupDetails = () => {
    const { id } = useParams();
    const [startup, setStartup] = useState(null);

    useEffect(() => {
        fetch(`/api/get-startups/${id}`)
            .then((res) => res.json())
            .then((data) => setStartup(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!startup) return <div>Loading...</div>;

    return (
        <div>
            {/* <img src={startup.image} alt={startup.name} className="w-full h-64 object-cover rounded" />
            <h1 className="text-3xl font-bold mt-4">{startup.name}</h1>
            <p className="mt-2"><strong>Description:</strong> {startup.description}</p>
            <p className="mt-2"><strong>Target Audience:</strong> {startup.targetAudience}</p>
            <p className="mt-2"><strong>Goals:</strong> {startup.goals}</p>
            <p className="mt-2"><strong>Achievements:</strong> {startup.achievements}</p>
            <p className="mt-2"><strong>Schemes:</strong> {startup.schemes.join(', ')}</p>
            <a href={startup.websiteLink} className="text-blue-500 mt-4 inline-block">Visit Website</a> */}
            <Navbar />
            <div className="flex mt-12 mx-12 gap-x-12">
                <div className="image basis-1/4 flex flex-col items-center">
                    <img src={startup.image} alt={startup.name} className="rounded-lg w-[200px] h-[200px] object-contain" />
                    <h1 className="text-xl font-bold m-2">
                        {startup.name}
                    </h1>
                    <div className="link border border-black rounded p-2 mx-2">
                        <a href={startup.websiteLink} className="text-black-500 inline-block">Visit Website</a>
                    </div>
                </div>
                <div className="desc basis-3/4">
                    <h1 className='text-[#F7A221]'>Description</h1>
                </div>
            </div>
        </div>
    );
};

export default StartupDetails;