import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Contact from '../ContactUs';
import StartupsGrid from '../Portfolio/StartupsGrid';

const ProgramDetails = () => {
    const contactRef = useRef(null);
    
    const { id } = useParams();
    const [scheme, setScheme] = useState(null);

    useEffect(() => {
        fetch(`/api/get-scheme/${id}`)
            .then((res) => res.json())
            .then((data) => setScheme(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!scheme) return <div>Loading...</div>;

    return (
        <div className="program-details mt-5">
            <Navbar contactRef={contactRef} />
            
            <div className='scheme-details mt-10 flex flex-col items-center mx-12'>
                <h1 className='text-3xl font-bold'>{scheme.name}</h1>
                <img src={scheme.image} alt={scheme.name} className="image p-10 w-60 m-4" />
                <a href={scheme.link}>
                <button className="mt-4 w-full md:w-40 bg-white text-black font-bold py-2 px-1 rounded border border-black hover:shadow-[4px_4px_0px_#F7A221] transition ease-in-out delay-150 hover:-translate-x-1 hover:-translate-y-1">
                    Apply Now
                </button>
                </a>
            </div>

            <div className="eligibility-criteria text-left m-12">
                <h1 className='text-2xl'>Eligibility <span className='font-bold text-[#F7A221]'>Criteria</span></h1>

                <div className="criteria-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-8 mx-8">
                    {scheme.eligibilityCriteria.map((criterion, index) => (
                        <div 
                            key={index} 
                            className="criteria-card border border-gray-300 rounded-3xl p-4 overflow-auto transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <div className="idx">
                                <h2 className="font-semibold text-base border border-black bg-[#F7A221] rounded-full text-white w-8 h-8 flex items-center justify-center">
                                    {index + 1}
                                </h2>
                            </div>
                            <p className="text-black break-words text-base my-2 mx-6">{criterion}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="scheme-benefits text-left m-12">
                <h1 className='text-2xl'>Scheme <span className='font-bold text-[#F7A221]'>Benefits</span></h1>

                <div className="grid mt-8 mx-8">
                    {scheme.schemeBenefits.map((benefit, index) => (
                        <div 
                            key={index}
                            className="flex flex-col"
                        >
                            <div className="idx">
                                <h2 className="font-semibold text-base border border-black bg-[#F7A221] rounded-full text-white w-8 h-8 flex items-center justify-center">
                                    {index + 1}
                                </h2>
                            </div>
                            <p className="text-black break-words text-base my-2 mx-3 border-l-2 border-black ps-4">{benefit}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="startups text-left m-12">
                <h1 className='text-2xl mb-8'>InFED<span className='font-bold text-[#F7A221]'> Startups </span>Incubated under {scheme.name}</h1>
                <StartupsGrid scheme={scheme.name} />
            </div>

            <Contact ref={contactRef} />
        </div>
    );
};

export default ProgramDetails;