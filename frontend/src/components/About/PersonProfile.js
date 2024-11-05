import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const PeopleGrid = () => {
    const [people, setPeople] = useState([]);
    const headings = ['Honourable Advisory Board', 'Mentors', 'Independent Observers', 'Consultants', 'Executive Team'];

    useEffect(() => {
        fetch('/api/people')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setPeople(data))
            .catch((error) => console.error('Error fetching people:', error));
    }, []);

    // Group people by heading
    const groupedPeople = headings.map(heading => ({
        heading,
        people: people.filter(person => person.heading === heading)
    }));

    return (
        <div className='mx-12'>
            {groupedPeople.map((group, index) => (
                <div key={index}>
                    <h1 className='text-2xl text-left my-10'>{group.heading} at <span className="text-[#F7A221] font-bold"> InFED</span></h1>
                    {group.people.length > 0 ? (
                        <div className="grid grid-cols-2 scale-75 md:grid-cols-4 md:scale-100 gap-6 mx-10">
                            {group.people.map((person, personIndex) => (
                                <div key={personIndex} className="person w-[240px] h-[380px] rounded-lg flex flex-col items-center p-8 shadow-sm transition transform hover:shadow-2xl">
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
                                            <FaInstagram className="text-black" size={30} />
                                        </a>
                                        <a href={person.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin className="text-black" size={30} />
                                        </a>
                                        <a href={person.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                            <FaTwitter className="text-black" size={30} />
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
    );
}

export default PeopleGrid;