import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users,
    Briefcase,
    Plus,
    Edit,
    Trash2
} from 'lucide-react';

// Opportunity Management Modal
const OpportunityModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
    const [opportunityData, setOpportunityData] = useState({
        title: '',
        company: '',
        description: '',
        type: '',
        skills: '',
        applicationLink: '',
        applicationDeadline: ''
    });

    // Update state when initialData changes
    useEffect(() => {
        if (initialData) {
            setOpportunityData({
                title: initialData.title || '',
                company: initialData.company || '',
                description: initialData.description || '',
                type: initialData.type || '',
                skills: initialData.skills ? initialData.skills.join(', ') : '',
                applicationLink: initialData.applicationLink || '',
                applicationDeadline: initialData.applicationDeadline
                    ? new Date(initialData.applicationDeadline).toISOString().split('T')[0]
                    : ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOpportunityData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = {
            ...opportunityData,
            skills: opportunityData.skills.split(',').map((skill) => skill.trim())
        };

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        
            if (initialData._id) {
                // Edit existing opportunity
                await axios.put(
                    `https://infed-website-kkva.onrender.com/api/admin/opportunities/${initialData._id}`,
                    submissionData,
                    config
                );
            } else {
                // Add new opportunity
                await axios.post('https://infed-website-kkva.onrender.com/api/admin/opportunities', submissionData, config);
            }
        
            onSubmit(submissionData);
            onClose();
        } catch (error) {
            console.error('Error submitting opportunity:', error);
        }        
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {initialData.title ? 'Edit Opportunity' : 'Add New Opportunity'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={opportunityData.title}
                        onChange={handleChange}
                        placeholder="Opportunity Title"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="company"
                        value={opportunityData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <textarea
                        name="description"
                        value={opportunityData.description}
                        onChange={handleChange}
                        placeholder="Opportunity Description"
                        className="w-full p-2 border rounded"
                    />
                    <select
                        name="type"
                        value={opportunityData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Type</option>
                        <option value="internship">Internship</option>
                        <option value="job">Job</option>
                        <option value="mentorship">Mentorship</option>
                    </select>
                    <input
                        type="text"
                        name="skills"
                        value={opportunityData.skills}
                        onChange={handleChange}
                        placeholder="Skills (comma-separated)"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="date"
                        name="applicationDeadline"
                        value={opportunityData.applicationDeadline}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="applicationLink"
                        value={opportunityData.applicationLink}
                        onChange={handleChange}
                        placeholder="Application Link"
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save Opportunity
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const UserModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        isAdmin: false
    });

    // Update userData state when initialData changes
    useEffect(() => {
        if (isOpen) {
            setUserData({
                email: initialData.email || '',
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                isAdmin: initialData.isAdmin || false
            });
        }
    }, [isOpen, initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {initialData.username ? 'Edit User' : 'Add New User'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isAdmin"
                            checked={userData.isAdmin}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label>Admin User</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('opportunities');
    const [opportunities, setOpportunities] = useState([]);
    const [users, setUsers] = useState([]);
    const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Fetch initial data based on active tab
        // eslint-disable-next-line default-case
        switch (activeTab) {
            case 'opportunities':
                fetchOpportunities();
                break;
            case 'users':
                fetchUsers();
                break;
        }
    }, [activeTab]);

    const renderOpportunities = () => (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Opportunities Management</h2>
                <button
                    onClick={() => setIsOpportunityModalOpen(true)}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
                >
                    <Plus className="mr-2 w-4 h-4" /> Add Opportunity
                </button>
            </div>
            {opportunities.length === 0 ? (
                <p className="text-center text-gray-500">No opportunities found</p>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Title</th>
                            <th className="p-3">Company</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opportunities.map((opp, index) => (
                            <tr key={opp._id || index} className="border-b">
                            <td className="p-3">{opp.title}</td>
                            <td className="p-3">{opp.company}</td>
                            <td className="p-3">{opp.type}</td>
                            <td className="p-3 flex space-x-2">
                                <button
                                onClick={() => {
                                    setSelectedOpportunity(opp);
                                    setIsOpportunityModalOpen(true);
                                }}
                                className="text-blue-500"
                                >
                                <Edit className="w-5 h-5" />
                                </button>
                                <button
                                onClick={() => handleDeleteOpportunity(opp._id)}
                                className="text-red-500"
                                >
                                <Trash2 className="w-5 h-5" />
                                </button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    const fetchOpportunities = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://infed-website-kkva.onrender.com/api/admin/opportunities', {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Full error response:', {
                    status: response.status, 
                    statusText: response.statusText,
                    error: errorText
                });
                return;
            }
            
            const data = await response.json();
            setOpportunities(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Network or parsing error:', error);
        }
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://infed-website-kkva.onrender.com/api/admin/users', {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    const handleAddOpportunity = async (opportunityData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://infed-website-kkva.onrender.com/api/admin/opportunities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(opportunityData)
            });
            const newOpportunity = await response.json();
            setOpportunities([...opportunities, newOpportunity]);
        } catch (error) {
            console.error('Failed to add opportunity', error);
        }
    };

    const handleAddUser = async (userData) => {
        try {
            const response = await fetch('https://infed-website-kkva.onrender.com/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData)
            });
            const newUser = await response.json();
            setUsers([...users, newUser]);
        } catch (error) {
            console.error('Failed to add user', error);
        }
    };

    const handleDeleteOpportunity = async (opportunityId) => {
        try {
            await fetch(`https://infed-website-kkva.onrender.com/api/admin/opportunities/${opportunityId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setOpportunities(opportunities.filter(opp => opp._id !== opportunityId));
        } catch (error) {
            console.error('Failed to delete opportunity', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await fetch(`https://infed-website-kkva.onrender.com/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    const renderUsers = () => (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <button
                    onClick={() => setIsUserModalOpen(true)}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
                >
                    <Plus className="mr-2 w-4 h-4" /> Add User
                </button>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border-b">
                            <td className="p-3">{user.firstName} {user.lastName}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3 flex space-x-2">
                                <button
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="text-red-500"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">Manage Community</h1>

                {/* Tabs */}
                <div className="flex mb-6 bg-white shadow-md rounded-lg">
                    <button
                        onClick={() => setActiveTab('opportunities')}
                        className={`flex items-center px-4 py-3 ${activeTab === 'opportunities'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Briefcase className="mr-2 w-5 h-5" /> Opportunities
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center px-4 py-3 ${activeTab === 'users'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Users className="mr-2 w-5 h-5" /> Users
                    </button>
                </div>

                {/* Content Rendering */}
                {activeTab === 'opportunities' && renderOpportunities()}
                {activeTab === 'users' && renderUsers()}

                {/* Modals */}
                <OpportunityModal
                    isOpen={isOpportunityModalOpen}
                    onClose={() => {
                        setIsOpportunityModalOpen(false);
                        setSelectedOpportunity(null);
                    }}
                    onSubmit={handleAddOpportunity}
                    initialData={selectedOpportunity || {}}
                />

                <UserModal
                    isOpen={isUserModalOpen}
                    onClose={() => {
                        setIsUserModalOpen(false);
                        setSelectedUser(null);
                    }}
                    onSubmit={handleAddUser}
                    initialData={selectedUser || {}}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;