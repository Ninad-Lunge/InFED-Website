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
    const [founderId, setFounderId] = useState('');

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await fetch('https://infed-website-kkva.onrender.com/api/get-startups');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (Array.isArray(data) && data.every(item => item.name)) {
                    setStartups(data.map(startup => startup.name));
                } else {
                    console.error('Unexpected data format:', data);
                    setStartups([]);
                }
            } catch (error) {
                console.error('Error fetching startups:', error);
                setStartups([]);
            }
        };
    
        fetchStartups();
    }, []);

    useEffect(() => {
        const fetchFounders = async () => {
            try {
                const response = await fetch('https://infed-website-kkva.onrender.com/api/get-founders');
                const data = await response.json();
                setFounders(data);
            } catch (error) {
                console.error('Error fetching founders:', error);
            }
        };

        fetchFounders();
    }, []);

    const handleFounderChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.socialLinks) {
            setFormData(prevData => ({
                ...prevData,
                socialLinks: { ...prevData.socialLinks, [name]: value }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const submitFounder = async (e) => {
        e.preventDefault();

        if (formData.name.trim() === '' || formData.role.trim() === '') {
            alert("Please enter at least the founder's name and role.");
            return;
        }

        try {
            const response = await fetch(founderId ? `https://infed-website-kkva.onrender.com/api/update-founder/${founderId}` : 'https://infed-website-kkva.onrender.com/api/add-founder', {
                method: founderId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccessMessage(`Founder ${founderId ? 'updated' : 'added'} successfully.`);
                const newFounder = await response.json();
                
                if (founderId) {
                    setFounders(prevFounders =>
                        prevFounders.map(f => (f._id === founderId ? newFounder : f))
                    );
                } else {
                    setFounders(prevFounders => [...prevFounders, newFounder]);
                }

                resetFormData();
            } else {
                throw new Error(`Failed to ${founderId ? 'update' : 'add'} founder`);
            }
        } catch (error) {
            console.error(`Error ${founderId ? 'updating' : 'adding'} founder:`, error);
            setSuccessMessage(`Failed to ${founderId ? 'update' : 'add'} founder. Please try again.`);
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
        setFounderId('');
    };

    const handleEdit = (founder) => {
        setFormData({
            name: founder.name || '',
            photo: founder.photo || '',
            socialLinks: {
                instagram: founder.socialLinks.instagram || '',
                linkedin: founder.socialLinks.linkedin || '',
                twitter: founder.socialLinks.twitter || ''
            },
            testimonial: founder.testimonial || '',
            role: founder.role || '',
            startup: founder.startup || ''
        });
        setFounderId(founder._id);
    };

    const deleteFounder = async (id) => {
        try {
            const response = await fetch(`https://infed-website-kkva.onrender.com/api/delete-founder/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setFounders(prevFounders => prevFounders.filter(founder => founder._id !== id));
                setSuccessMessage('Founder deleted successfully.');
            } else {
                throw new Error('Failed to delete founder');
            }
        } catch (error) {
            console.error('Error deleting founder:', error);
            setSuccessMessage('Failed to delete founder. Please try again.');
        }
    };

    return (
        <div className='founder-manager p-4'>
            <h1 className="title text-xl font-bold py-4">Manage Founder</h1>

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
                    name="startup" 
                    value={formData.startup} 
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
                    {founderId ? 'Update Founder' : 'Add Founder'}
                </button>
            </form>

            <h3 className="text-lg font-semibold mb-4">Founders List</h3>
            <ul className="border border-gray-400 p-2 rounded-md">
                {Array.isArray(founders) && founders.length > 0 ? (
                    founders.map((founder) => (
                        founder && founder.name ? (
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
                        ) : null
                    ))
                ) : (
                    <p className="text-center">No founders available.</p>
                )}
            </ul>
        </div>
    );
};

export default FounderManager;