import React, { useState, useEffect } from 'react';

const FounderManager = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        photo: '',
        socialLinks: {
            instagram: '',
            linkedin: '',
            twitter: ''
        },
        testimonial: '',
        role: '',
        startup: ''
    });

    const [startups, setStartups] = useState([]);
    const [founders, setFounders] = useState([]);
    const [founderId, setFounderId] = useState([]);

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await fetch('/api/get-startups-names');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setStartups(data.map(startup => startup.name));
            } catch (error) {
                console.error('Error fetching startups:', error);
            }
        };

        fetchStartups();
    }, []);

    useEffect(() => {
        const fetchFounders = async () => {
            try{
                const response = await fetch('/api/get-founders');
                const data = await response.json();
                setFounders(data);
            } catch (error) {
                console.error('Error fetching startups: ', error);
            }
        };

        fetchFounders();
    }, []);

    const handleFounderChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitFounder = async (e) => {
        e.preventDefault();

        try {
            const url = founderId
                ? `/api/update-founder/${founderId}`
                : "/api/add-founder";
            const method = founderId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccessMessage(
                    founderId
                        ? 'Founder updated successfully!'
                        : 'Founder added successfully!'
                );
                const newFounder = await response.json();
                setFormData(prevData => ({
                    ...prevData,
                    founders: [...prevData.founders, newFounder]
                }));
                resetFormData();
            } else {
                throw new Error('Failed to add founder');
            }
        } catch (error) {
            console.error('Error adding founder:', error);
            setSuccessMessage('Failed to add founder. Please try again.');
        }
    };

    const resetFormData = () => {
        setFormData({
            name: '',
            photo: '',
            socialLinks: {
                instagram: '',
                linkedin: '',
                twitter: ''
            },
            testimonial: '',
            role: '',
            startup: ''
        });
    };

    const handleEdit = (founder) => {
        setFounderId(founder._id);
        setFormData({
            name: founder.name,
            photo: founder.photo,
            socialLinks: {
                instagram: founder.socialLinks.instagram,
                linkedin: founder.socialLinks.linkedin,
                twitter: founder.socialLinks.twitter,
            },
            testimonial: founder.testimonial,
            role: founder.role,
            startup: founder.startup
        });
    };    

    const deleteFounder = async (id) => {
        try {
            const response = await fetch(`/api/delete-founder/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            
            if (response.ok) {
                setFounders(founders.filter((founder) => founder._id !== id));
                setSuccessMessage(data.message);
            }
        } catch (error) {
            console.error('Error deleting founder:', error);
            setSuccessMessage('Error deleting founder');
        }
    };    

    return (
        <div className='founder-manager p-4'>
            <h1 className="title text-2xl font-bold py-4">Manage Founders</h1>

            {successMessage && (
                <div className="success-msg text-green-500 mb-4">
                    {successMessage}
                </div>
            )}

            {/* Form for Adding Founder */}
            <form onSubmit={submitFounder} className="grid grid-cols-4 gap-4">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleFounderChange}
                    className="p-2 border rounded col-span-2"
                />
                <input 
                    type="text" 
                    name="photo" 
                    placeholder="Photo URL" 
                    value={formData.photo} 
                    onChange={handleFounderChange}
                    className="p-2 border rounded col-span-2" 
                />
                <textarea 
                    name="testimonial" 
                    placeholder="Testimonial" 
                    value={formData.testimonial} 
                    onChange={handleFounderChange}
                    className="p-2 border rounded col-span-2" 
                />
                <input 
                    type="text" 
                    name="instagram" 
                    placeholder="Instagram Link" 
                    value={formData.socialLinks.instagram} 
                    onChange={handleFounderChange}
                    className="p-2 border rounded col-span-2" 
                />
                <input 
                    type="text" 
                    name="linkedin" 
                    placeholder="LinkedIn Link" 
                    value={formData.socialLinks.linkedin} 
                    onChange={handleFounderChange}
                    className="p-2 border rounded col-span-2" 
                />
                <input 
                    type="text" 
                    name="twitter" 
                    placeholder="Twitter Link" 
                    value={formData.socialLinks.twitter} 
                    onChange={handleFounderChange}
                    className="p-2 border rounded col-span-2" 
                />
                <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleFounderChange}
                    className="p-2 border rounded col-span-2" 
                >
                    <option value="">Select Role</option>
                    <option value="Founder">Founder</option>
                    <option value="Co-Founder">Co-Founder</option>
                </select>
                <select 
                    name="startup" value={formData.startup} 
                    onChange={handleFounderChange}
                    className="p-2 border rounded col-span-2"
                >
                    <option value="">Select Startup</option>
                    {startups.map((startup, index) => (
                        <option key={index} value={startup}>{startup}</option>
                    ))}
                </select>
                <button 
                    type="submit" 
                    className="p-2 bg-blue-500 text-white rounded ring-2 ring-black-500 w-[200px] h-[40px]"
                >
                    Add Founder
                </button>
            </form>

            <h3 className="text-lg font-semibold mb-4">Founders List</h3>
            <ul className="border border-gray-400 p-2 rounded-md">
                {founders.map((founder) => (
                    <li
                        key={founder._id}
                        className="grid grid-cols-3 gap-x-6 p-1 mb-0.5 border border-gray-400"
                    >
                        <span className="col-span-2">{founder.name}</span>
                        <div className="grid grid-cols-2 place-items-end">
                            <button
                                onClick={() => handleEdit(founder)}
                                className="mr-2 py-1 px-5 bg-yellow-400 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteFounder(founder._id)}
                                className="py-1 px-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default FounderManager;