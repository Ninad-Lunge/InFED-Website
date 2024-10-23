import React, { useState } from 'react';

const AddStartUp = () => {

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        websiteLink: '',
        targetAudience: '',
        goals: '',
        achievements: '',
        schemes: [], // Updated to store multiple schemes
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSchemeChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({ ...formData, schemes: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, image, description, websiteLink, targetAudience, goals, achievements, schemes } = formData;

        try {
            const response = await fetch('/api/add-startup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, image, description, websiteLink, targetAudience, goals, achievements, schemes })
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Startup added successfully!');
                setFormData({
                    name: '',
                    image: '',
                    description: '',
                    websiteLink: '',
                    targetAudience: '',
                    goals: '',
                    achievements: '',
                    schemes: [], // Reset to empty array after successful submit
                });
            } else {
                console.error('Error adding startup:', result);
                setSuccessMessage('Failed to add startup. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSuccessMessage('Error occurred. Please try again.');
        }
    };

    return (
        <div className="add-startup">
            <h1 className="title text-2xl font-bold py-4">Add Startup</h1>

            {successMessage && (
                <div className="success-msg text-green-500 mb-4">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
                <input 
                    type="text"
                    name="name"
                    placeholder="Name of Startup"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2" 
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2"
                    required
                />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-4"
                    required
                />
                <input
                    type="text"
                    name="websiteLink"
                    placeholder="Website URL"
                    value={formData.websiteLink}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2"
                />
                <input
                    type="text"
                    name="targetAudience"
                    placeholder="Target Audience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2"
                    required
                />
                <textarea
                    type="text"
                    name="goals"
                    placeholder="Startup Goals"
                    value={formData.goals}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-4"
                    required
                />
                <textarea
                    type="text"
                    name="achievements"
                    placeholder="Startup Achievements"
                    value={formData.achievements}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-4"
                    required
                />

                <label className="col">Select Schemes (Multi-select):</label>
                <select
                    name="schemes"
                    multiple
                    value={formData.schemes}
                    onChange={handleSchemeChange}
                    className="p-2 border rounded"
                >
                    <option value="Scheme1">Scheme1</option>
                    <option value="Scheme2">Scheme2</option>
                    <option value="Scheme3">Scheme3</option>
                </select>

                <div className="flex justify-end col-span-2 grid content-end">
                    <button 
                        type="submit" 
                        className="p-2 bg-blue-500 text-white rounded ring-2 ring-black-500 w-[200px] h-[40px]"
                    >
                        Add Startup
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddStartUp;