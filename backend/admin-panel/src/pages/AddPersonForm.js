import React, { useState } from 'react';

const AddPersonForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        designation: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        heading: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, image, designation, instagram, linkedin, twitter, heading } = formData;
        const socialLinks = { instagram, linkedin, twitter };

        try {
            const response = await fetch('/api/add-person', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, image, designation, socialLinks, heading })
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Person added successfully!');
                setFormData({
                    name: '',
                    image: '',
                    designation: '',
                    instagram: '',
                    linkedin: '',
                    twitter: '',
                    heading: ''
                });
            } else {
                console.error('Error adding person:', result);
                setSuccessMessage('Failed to add person. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSuccessMessage('Error occurred. Please try again.');
        }
    };

    return (
        <div className="add-person">
            <h1 className="title text-2xl font-bold py-4">Add Person Info in About Page</h1>
            {/* Conditionally render the success message */}
            {successMessage && (
                <div className="success-message text-green-500 mb-4">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2"
                />
                <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2"
                />
                
                {/* Dropdown for Heading */}
                <select
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2"
                >
                    <option value="">Select Heading</option>
                    <option value="Honourable Advisory Board">Honourable Advisory Board</option>
                    <option value="Mentors">Mentors</option>
                    <option value="Independent Observers">Independent Observers</option>
                    <option value="Consultants">Consultants</option>
                    <option value="Executive Team">Executive Team</option>
                </select>

                <input
                    type="text"
                    name="instagram"
                    placeholder="Instagram Link"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn Link"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="twitter"
                    placeholder="Twitter Link"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded ring-2 ring-black-500">Add Person</button>
            </form>
        </div>
    );
};

export default AddPersonForm;