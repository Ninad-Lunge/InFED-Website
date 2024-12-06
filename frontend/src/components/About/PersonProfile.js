import React, { useEffect, useState, useRef, useState as useStateReact } from 'react';
// import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { BsTwitterX, BsLinkedin, BsInstagram } from "react-icons/bs";

const PeopleGrid = () => {
    const [people, setPeople] = useState([]);
    const [activeIndex, setActiveIndex] = useStateReact(null);
    const headings = [
        'Honourable Advisory Board', 
        'ISMS', 
        'Mentors', 
        'Executive Team',
        'Independent Observer', 
        'Consultants'
    ];

    const headingRefs = useRef(headings.map(() => React.createRef()));

    useEffect(() => {
        fetch('https://infed-website-kkva.onrender.com/api/people')
            .then((response) => response.json())
            .then((data) => setPeople(data))
            .catch((error) => console.error('Error fetching people:', error));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            headingRefs.current.forEach((ref, index) => {
                const sectionTop = ref.current.offsetTop;
                const sectionHeight = ref.current.offsetHeight;
                if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
                    setActiveIndex(index);
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [setActiveIndex]);

    const groupedPeople = headings.map(heading => ({
        heading,
        people: people.filter(person => person.heading === heading)
    }));

    const scrollToHeading = (index) => {
        headingRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='mx-12'>
            {/* Fixed Navbar for headings */}
            <nav className="flex gap-4 mb-8 fixed-navbar flex-wrap">
                {headings.map((heading, index) => (
                    <button 
                        key={index} 
                        onClick={() => scrollToHeading(index)} 
                        className={`text-md font-semibold px-4 py-2 transition-all duration-300 ${
                            activeIndex === index ? 'text-[#F7A221] border-b-2 border-[#F7A221]' : 'text-gray-600'
                        }`}
                    >
                        {heading}
                    </button>
                ))}
            </nav>

            {/* Content */}
            <div className="pt-20">
                {groupedPeople.map((group, index) => (
                    <div key={index} ref={headingRefs.current[index]}>
                        <h1 className='text-2xl text-left my-10'>
                            {group.heading} at <span className="text-[#F7A221] font-bold"> InFED</span>
                        </h1>
                        {group.people.length > 0 ? (
                            <div className="grid grid-cols-2 scale-75 md:grid-cols-4 md:scale-100 gap-6 mx-10">
                                {group.people.map((person, personIndex) => (
                                    <div key={personIndex} className="person w-[240px] h-max rounded-lg flex flex-col items-center p-8 shadow-sm transition transform hover:shadow-2xl">
                                        <img
                                            className="w-[170px] h-[170px] mb-3 rounded-full border border-yellow-400 object-contain"
                                            src={person.image}
                                            alt="profile-image"
                                        />
                                        <div className="name m-2">
                                            <p className="font-semibold text-lg">{person.name}</p>
                                        </div>
                                        <div className="designation mb-2">
                                            <p className="text-base text-gray-400">{person.designation}</p>
                                        </div>
                                        <div className="links flex flex-row gap-x-6 mt-4">
                                            <a href={person.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                                <BsInstagram className="text-black" size={25} />
                                            </a>
                                            <a href={person.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                                <BsLinkedin className="text-black" size={25} />
                                            </a>
                                            <a href={person.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                                <BsTwitterX className="text-black" size={25} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No people found for this heading.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeopleGrid;