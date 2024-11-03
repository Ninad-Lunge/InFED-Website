import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const FounderCard = ({ founder }) => {
    return(
        <div className='founder-card flex px-4 py-12 hover:shadow-2xl justify-center'>
            <img 
                src={founder.photo} 
                alt={founder.name} 
                className="w-40 h-40 object-contain rounded-md" 
            />
            <div className='flex flex-col ms-8'>
                <h1 className='mb-auto'>{founder.testimonial}</h1>
                <h1 className='text-[#F7A221] font-bold'>{founder.name}<span className='text-black font-semibold ms-2'>{founder.role} | {founder.startup}</span></h1>
                <div className="links flex flex-row gap-x-6 mt-4">
                    <a href={founder.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-black" size={30} />
                    </a>
                    <a href={founder.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-black" size={30} />
                    </a>
                    <a href={founder.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-black" size={30} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FounderCard;