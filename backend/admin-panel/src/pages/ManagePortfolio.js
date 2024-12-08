import React, { useEffect, useState } from 'react';

const ManagePortfolio = () => {

    const [formData, setFormData] = useState({
        name: '',
        image: null,
        description: '',
        websiteLink: '',
        targetAudience: '',
        goals: '',
        achievements: '',
        schemes: [],
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [startups, setStartups] = useState([]);
    const [startupId, setStartupId] = useState('');
    const [schemes, setSchemes] = useState([]);

    useEffect(() => {
        fetch('https://infed-website-kkva.onrender.com/api/get-schemes')
            .then((response) => {
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const schemeNames = data.map((scheme) => scheme.name);
                setSchemes(schemeNames);
            })
            .catch((error) => console.error('Error fetching schemes:', error));
    }, []);

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await fetch('https://infed-website-kkva.onrender.com/api/get-startups');
                const data = await response.json();
                setStartups(data);
            } catch (error) {
                console.error('Error fetching startups: ', error);
            }
        };

        fetchStartups();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
          ...formData,
          image: e.target.files[0],
        });
    };

    const handleSchemeChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({ ...formData, schemes: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const {
            name,
            image,
            description,
            websiteLink,
            targetAudience,
            goals,
            achievements,
            schemes,
        } = formData;
    
        try {
            const url = startupId
                ? `https://infed-website-kkva.onrender.com/api/update-startup/${startupId}`
                : "https://infed-website-kkva.onrender.com/api/add-startup";
            const method = startupId ? "PUT" : "POST";
    
            const formDataToSend = new FormData();
            formDataToSend.append("name", name);
            if (image) {
                formDataToSend.append("image", image); // Add file
            }
            formDataToSend.append("description", description);
            formDataToSend.append("websiteLink", websiteLink);
            formDataToSend.append("targetAudience", targetAudience);
            formDataToSend.append("goals", goals);
            formDataToSend.append("achievements", achievements);
            formDataToSend.append("schemes", JSON.stringify(schemes)); // Add schemes as a JSON string
    
            const response = await fetch(url, {
                method,
                body: formDataToSend, // Use FormData here
            });
    
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage(
                    startupId ? "Startup updated successfully!" : "Startup added successfully!"
                );
                setFormData({
                    name: "",
                    image: null,
                    description: "",
                    websiteLink: "",
                    targetAudience: "",
                    goals: "",
                    achievements: "",
                    schemes: [],
                });
                setStartupId("");
            } else {
                console.error("Error adding/updating startup:", result);
                setSuccessMessage("Failed to save startup. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setSuccessMessage("An error occurred. Please try again.");
        }
    };    

    const deleteStartup = async (id) => {
        try {
            const response = await fetch(`https://infed-website-kkva.onrender.com/api/delete-startup/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                setStartups(startups.filter((p) => p._id !== id));
                setSuccessMessage(data.message);
            }
        } catch (error) {
            setSuccessMessage('Error deleting startup');
        }
    };

    const handleEdit = (startup) => {
        setStartupId(startup._id);
        setFormData({
            name: startup.name,
            image: null,
            description: startup.description,
            websiteLink: startup.websiteLink,
            targetAudience: startup.targetAudience,
            goals: startup.goals,
            achievements: startup.achievements,
            schemes: startup.schemes,
        });
    };

    return (
        <div className="startup-manager">
            <h1 className="title text-2xl font-bold py-4">Manage Portfolio</h1>

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
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="p-2 border rounded"
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

                <label className="col-span-3">Select Schemes (Multi-select):</label>
                <select
                    name="schemes"
                    multiple
                    value={formData.schemes}
                    onChange={handleSchemeChange}
                    className="p-2 border rounded col-span-3"
                >
                    {schemes.map((scheme, index) => (
                        <option key={index} value={scheme}>
                            {scheme}
                        </option>
                    ))};
                </select>

                <div className="grid content-end">
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded ring-2 ring-black-500 w-[200px] h-[40px]"
                    >
                        {startupId ? 'Update Startup' : 'Add Startup'}
                    </button>
                </div>
            </form>

            <h3 className="text-lg font-semibold mb-4">Startups List</h3>
            <ul className="border border-gray-400 p-2 rounded-md">
                {startups.map((startup) => (
                    <li
                        key={startup._id}
                        className="grid grid-cols-3 gap-x-6 p-1 mb-0.5 border border-gray-400"
                    >
                        <span className="col-span-2">{startup.name}</span>
                        <div className="grid grid-cols-2 place-items-end">
                            <button
                                onClick={() => handleEdit(startup)}
                                className="mr-2 py-1 px-5 bg-yellow-400 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteStartup(startup._id)}
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

export default ManagePortfolio;