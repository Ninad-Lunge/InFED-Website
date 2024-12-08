import React from 'react';
import { BsTwitterX, BsLinkedin, BsInstagram } from "react-icons/bs";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const FounderCard = ({ founder }) => {
    return(
        <div className='founder-card relative flex flex-col md:flex-row px-8 py-10 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 mx-auto rounded-2xl border border-gray-200 bg-white'>
            <div className="absolute top-4 left-4 text-[#F7A221] opacity-20">
                <FaQuoteLeft size={40} />
            </div>
            <div className="absolute bottom-4 right-4 text-[#F7A221] opacity-20">
                <FaQuoteRight size={40} />
            </div>
            
            <div className="flex-shrink-0 flex justify-center mb-6 md:mb-0 md:mr-8">
                <img 
                    src={founder.photo} 
                    alt={founder.name} 
                    className="w-48 h-48 object-cover rounded-full border-2 border-[#F7A221] shadow-md" 
                />
            </div>
            
            <div className='flex flex-col justify-between flex-grow relative z-10 pl-2 pr-2'>
                <div className="flex-grow">
                    <p className='text-gray-700 italic mb-6 text-lg leading-relaxed'>
                        {founder.testimonial}
                    </p>
                </div>
                
                <div>
                    <h2 className='text-[#F7A221] font-bold text-xl mb-1'>{founder.name}</h2>
                    <p className='text-gray-600 font-medium mb-4'>{founder.role} | {founder.startup}</p>
                    
                    <div className="links flex flex-row gap-x-6">
                        {founder.socialLinks.linkedin && (
                            <a 
                                href={founder.socialLinks.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-[#F7A221] transition-colors"
                            >
                                <BsLinkedin size={25} />
                            </a>
                        )}
                        {founder.socialLinks.twitter && (
                            <a 
                                href={founder.socialLinks.twitter} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-[#F7A221] transition-colors"
                            >
                                <BsTwitterX size={25} />
                            </a>
                        )}
                        {founder.socialLinks.instagram && (
                            <a 
                                href={founder.socialLinks.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-[#F7A221] transition-colors"
                            >
                                <BsInstagram size={25} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FounderCard;
