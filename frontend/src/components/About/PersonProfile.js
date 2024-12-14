import React, { useEffect, useState, useRef } from 'react';
import { BsTwitterX, BsLinkedin, BsEnvelope } from "react-icons/bs";

const PeopleGrid = () => {
    const [people, setPeople] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const headings = [
        'Honourable Advisory Board', 
        'Incubator Seed Management Committee', 
        'Mentors', 
        'Executive Team',
        'Consultants',
        'Past Team Members'
    ];

    const headingRefs = useRef(headings.map(() => React.createRef()));

    useEffect(() => {
        fetch('https://infed-website-kkva.onrender.com/api/people')
        .then((response) => response.json())
        .then((data) => {
            // Sort the people by their index field
            const sortedPeople = data.sort((a, b) => a.index - b.index);
            setPeople(sortedPeople);
        })
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
    }, []);

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4">
                                {group.people.map((person, personIndex) => (
                                    <div 
                                        key={personIndex} 
                                        className="person w-full max-w-[400px] mx-auto bg-white rounded-lg shadow-sm overflow-hidden transform transition hover:scale-105 hover:shadow-xl flex flex-col"
                                    >
                                        <div className="flex flex-col items-center p-6 flex-grow">
                                            <img
                                                className="w-48 h-48 mb-4 rounded-full border-2 border-[#F7A221] object-cover shadow-md"
                                                src={person.image}
                                                alt={`${person.name} profile`}
                                            />
                                            <div className="text-center mb-4 flex flex-col items-center">
                                                <h2 className="font-bold text-xl text-gray-800">{person.name}</h2>
                                                <p className="text-gray-500 text-base text-center break-words max-w-full px-7 mt-2">
                                                    {person.designation}
                                                </p>
                                            </div>
                                            <div className="flex justify-center space-x-6 mt-auto pb-2">
                                                {/* LinkedIn */}
                                                <a 
                                                    href={person.socialLinks?.linkedin || "#"} 
                                                    target={person.socialLinks?.linkedin ? "_blank" : "_self"} 
                                                    rel="noopener noreferrer"
                                                    className={`text-gray-700 hover:text-[#F7A221] transition-colors ${
                                                        person.socialLinks?.linkedin ? "" : "cursor-default"
                                                    }`}
                                                >
                                                    <BsLinkedin size={25} />
                                                </a>
                                                {/* Email */}
                                                <a 
                                                    href={person.socialLinks?.email ? `mailto:${person.socialLinks.email}` : "#"} 
                                                    className={`text-gray-700 hover:text-[#F7A221] transition-colors ${
                                                        person.socialLinks?.email ? "" : "cursor-default"
                                                    }`}
                                                >
                                                    <BsEnvelope size={25} />
                                                </a>
                                                {/* Twitter */}
                                                <a 
                                                    href={person.socialLinks?.twitter || "#"} 
                                                    target={person.socialLinks?.twitter ? "_blank" : "_self"} 
                                                    rel="noopener noreferrer"
                                                    className={`text-gray-700 hover:text-[#F7A221] transition-colors ${
                                                        person.socialLinks?.twitter ? "" : "cursor-default"
                                                    }`}
                                                >
                                                    <BsTwitterX size={25} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">No people found for this heading.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeopleGrid;