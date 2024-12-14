import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Home, Users, LogOut } from 'lucide-react';
import logo from './../assets/InFED-logo.jpg';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profileImage: '',
        skills: [],
    });
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        profileImage: '',
        skills: '',
    });
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear user-related data
        navigate('/login-page'); // Redirect to login page
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`https://infed-website-kkva.onrender.com/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setProfile(res.data);
                setFormData({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    profileImage: res.data.profileImage,
                    skills: res.data.skills.join(', '),
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleEditToggle = () => setEditing(!editing);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        try {
            const updatedData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                skills: formData.skills.split(',').map((skill) => skill.trim()),
                profileImage: formData.profileImage,
            };
            const res = await axios.put(`https://infed-website-kkva.onrender.com/api/users/${userId}`, updatedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setProfile(res.data);
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="bg-white shadow-md rounded-lg p-4 h-fit">
                    <nav className="space-y-4">
                        <img src={logo} alt="infed-logo" className='w-36' />
                        <hr />
                        <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
                            <Home className="w-5 h-5" />
                            <button onClick={navigateBack}>
                                <span>Dashboard</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-3 text-blue-600 font-semibold">
                            <Users className="w-5 h-5" />
                            <span>Profile</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600 hover:text-red-600">
                            <LogOut className="w-5 h-5" />
                            <button onClick={handleLogout} >
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3 p-6 bg-white rounded-md shadow-lg border">
                    {!editing ? (
                        <div className="profile-info text-center">
                            <img
                                src={profile.profileImage || 'default-avatar.png'}
                                alt="Profile"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <p className="text-xl font-medium mb-2">
                                {profile.firstName} {profile.lastName}
                            </p>
                            <p className="text-sm text-gray-500 mb-4">{profile.email}</p>
                            <p className="text-sm text-gray-600 mb-6">
                                <strong>Skills:</strong> {profile.skills.join(', ')}
                            </p>
                            <button
                                onClick={handleEditToggle}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                                <input
                                    type="text"
                                    name="profileImage"
                                    value={formData.profileImage}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={handleEditToggle}
                                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;