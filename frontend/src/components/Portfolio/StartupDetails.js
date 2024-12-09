import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Contact from '../ContactUs';
import FounderCard from './FounderCard';

const StartupDetails = () => {
    const { id } = useParams();
    const [startup, setStartup] = useState(null);
    const [founders, setFounders] = useState([]);
    const contactRef = useRef(null);

    useEffect(() => {
        // Fetch startup details
        fetch(`https://infed-website-kkva.onrender.com/api/get-startups/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setStartup(data);
                fetchFounders(data.name);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const fetchFounders = (startupName) => {
        fetch(`https://infed-website-kkva.onrender.com/api/get-founders/${startupName}`)
            .then((res) => res.json())
            .then((data) => setFounders(data))
            .catch((err) => console.error('Error fetching founders:', err));
    };

    if (!startup) return <div>Loading...</div>;

    return (
        <div className='mt-5'>
            <Navbar contactRef={contactRef} />
            <div className="flex flex-col md:flex-row mt-12 mx-1 gap-x-2 md:mx-24 gap-y-8 md:gap-x-14">
                <div className="image flex flex-col items-center md:basis-1/5">
                    <img src={startup.image} alt={startup.name} className="rounded-md w-40 h-40 md:w-[200px] md:h-[200px] object-contain shadow-md mb-6" />
                    <h1 className="text-xl font-semibold md:m-2">
                        {startup.name}
                    </h1>
                    <button 
                        className="border border-black rounded py-1 px-4 mx-2 mt-4 hover:shadow-[4px_4px_0px_#F7A221] transition ease-in-out delay-150 hover:-translate-x-1 hover:-translate-y-1"
                        onClick={() => window.open(startup.websiteLink, '_blank')}
                    > 
                        Visit Website
                    </button>
                </div>
                <div className="desc md:basis-4/5 grid place-content-start text-left">
                    <h1 className='text-xl font-semibold text-[#F7A221] mb-7'>Description</h1>
                    <p className='text-base'>{startup.description}</p>

                    <h1 className='text-xl font-semibold text-[#F7A221] mt-12 mb-7'>Target Audience</h1>
                    <p className='text-base'>{startup.targetAudience}</p>
                </div>
            </div>

            <div className='mt-12 md:mx-24 text-left'>
                <h1 className='text-xl font-semibold text-[#F7A221] mt-12 mb-7'>Goals</h1>
                <p className='text-base'>{startup.goals}</p>
            </div>

            <div className="founders mx-6 md:mx-24 mt-12 text-left">
                <h1 className="text-xl font-semibold text-[#F7A221]">Founders</h1>
                <div className="col-span-3 mt-8 grid grid-cols-2 gap-14 mx-12">
                    {founders.map((founder, index) => (
                        <FounderCard key={index} founder={founder} />
                    ))}
                </div>
            </div> 

            <div className="achievements mx-6 md:mx-24 mt-12 mb-10 text-left">
                <h1 className="text-xl font-semibold text-[#F7A221] mb-7">Achievements</h1>
                <p className='text-left text-base'>{startup.achievements}</p>
            </div>

            <Contact ref={contactRef} />
        </div>
    );
};

export default StartupDetails;