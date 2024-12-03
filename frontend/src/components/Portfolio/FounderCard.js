// import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { BsTwitterX, BsLinkedin, BsInstagram } from "react-icons/bs";

const FounderCard = ({ founder }) => {
    return(
        <div className='founder-card flex px-6 py-12 hover:shadow-2xl justify-between mx-auto rounded-lg border border-c'>
            <img 
                src={founder.photo} 
                alt={founder.name} 
                className="w-40 h-40 object-contain rounded-md" 
            />
            <div className='flex flex-col ms-8'>
                <h1 className='mb-auto'>{founder.testimonial}</h1>
                <h1 className='text-[#F7A221] font-semibold'>{founder.name}</h1>
                <p className='text-black font-base'>{founder.role} | {founder.startup}</p>
                <div className="links flex flex-row gap-x-6 mt-4">
                    <a href={founder.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <BsLinkedin className="text-black" size={25} />
                    </a>
                    <a href={founder.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <BsTwitterX className="text-black" size={25} />
                    </a>
                    <a href={founder.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                        <BsInstagram className="text-black" size={25} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FounderCard;