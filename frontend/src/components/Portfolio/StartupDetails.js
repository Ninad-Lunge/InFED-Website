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
        <div className='mt-5'>
            {/* 
            <p className="mt-2"><strong>Schemes:</strong> {startup.schemes.join(', ')}</p>
             */}
            <Navbar />
            <div className="flex mt-12 mx-12 gap-x-14">
                <div className="image basis-1/5 flex flex-col items-center">
                    <img src={startup.image} alt={startup.name} className="rounded-lg w-[200px] h-[200px] object-contain hover:shadow-lg" />
                    <h1 className="text-xl font-semibold m-2">
                        {startup.name}
                    </h1>
                    <div className="link border border-black rounded py-1 px-4 mx-2 hover:bg-black hover:text-white">
                        <a href={startup.websiteLink} className="text-black-500 inline-block">Visit Website</a>
                    </div>
                </div>
                <div className="desc basis-4/5 grid place-content-start text-left">
                    <h1 className='text-lg font-semibold text-[#F7A221]'>Description</h1>
                    <p className='mt-2 text-base'>{startup.description}</p>

                    <h1 className='text-lg font-semibold text-[#F7A221] mt-4'>Target Audience</h1>
                    <p className='mt-2 text-base'>{startup.targetAudience}</p>

                    <h1 className='text-lg font-semibold text-[#F7A221] mt-4'>Goals</h1>
                    <p className='mt-2 text-base'>{startup.goals}</p>
                </div>
            </div>

            <div className="founders mx-12 mt-12">
                <h1 className="text-lg font-semibold text-[#F7A221] justify-self-start">Founders</h1>
            </div>

            <div className="achievements mx-12 mt-12 mb-10">
                <h1 className="text-lg font-semibold text-[#F7A221] justify-self-start">Achievements</h1>
                <p className='text-left mt-2 text-base'>{startup.achievements}</p>
            </div>
        </div>
    );
};

export default StartupDetails;