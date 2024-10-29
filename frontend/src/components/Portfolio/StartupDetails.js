import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Contact from '../ContactUs';

const StartupDetails = () => {
    const { id } = useParams();
    const [startup, setStartup] = useState(null);
    const contactRef = useRef(null);

    useEffect(() => {
        fetch(`/api/get-startups/${id}`)
            .then((res) => res.json())
            .then((data) => setStartup(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!startup) return <div>Loading...</div>;

    return (
        <div className='mt-5'>
            <Navbar contactRef={contactRef} />
            <div className="flex flex-col md:flex-row mt-12 mx-1 gap-x-2 md:mx-12 gap-y-8 md:gap-x-14 w-full">
                <div className="image flex flex-col items-center md:basis-1/5">
                    <img src={startup.image} alt={startup.name} className="rounded-lg w-40 h-40 md:w-[200px] md:h-[200px] object-contain hover:shadow-lg" />
                    <h1 className="text-xl font-semibold mt-4 md:m-2">
                        {startup.name}
                    </h1>
                    <div className="link border border-black rounded py-1 px-4 mx-2 hover:bg-black">
                        <a href={startup.websiteLink} className="text-black hover:text-white inline-block">Visit Website</a>
                    </div>
                </div>
                <div className="desc md:basis-4/5 grid place-content-start text-left">
                    <h1 className='text-lg font-semibold text-[#F7A221]'>Description</h1>
                    <p className='mt-2 text-base'>{startup.description}</p>

                    <h1 className='text-lg font-semibold text-[#F7A221] mt-4'>Target Audience</h1>
                    <p className='mt-2 text-base'>{startup.targetAudience}</p>

                    <h1 className='text-lg font-semibold text-[#F7A221] mt-4'>Goals</h1>
                    <p className='mt-2 text-base'>{startup.goals}</p>
                </div>
            </div>

            <div className="founders mx-6 md:mx-12 mt-12 text-left">
                <h1 className="text-lg font-semibold text-[#F7A221]">Founders</h1>
            </div>

            <div className="achievements mx-6 md:mx-12 mt-12 mb-10 text-left">
                <h1 className="text-lg font-semibold text-[#F7A221]">Achievements</h1>
                <p className='text-left mt-2 text-base'>{startup.achievements}</p>
            </div>

            <Contact ref={contactRef} />
        </div>
    );
};

export default StartupDetails;