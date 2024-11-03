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

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await fetch('/api/get-startups');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setStartups(data.map(startup => startup.name));
            } catch (error) {
                console.error('Error fetching startups:', error);
            }
        };

        fetchStartups();
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

    const submitFounder = async () => {
        if (formData.name.trim() === '' || formData.role.trim() === '') {
            alert("Please enter at least the founder's name and role.");
            return;
        }

        try {
            const response = await fetch('/api/add-founder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccessMessage('Founder added successfully.');
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

    return (
        <div className='founder-manager p-4'>
            <h1 className="title text-2xl font-bold py-4">Manage Founder</h1>

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
        </div>
    );
};

export default FounderManager;