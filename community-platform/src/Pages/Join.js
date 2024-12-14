import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './../assets/InFED-logo.jpg';

const JoinCommunityPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    profileImage: '',
    skills: '',
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login-page');
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://infed-website-kkva.onrender.com/api/users/register', {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()),
      });
      alert('Registration successful! Please log in');
      const userId = response.data.userId;
      localStorage.setItem('userId', userId);
      navigate('/login-page');
    } catch (error) {
      console.error(error);
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-center">
          <img 
            src={logo} 
            alt="infed-logo" 
            className="w-48" 
          />
        </div>
        
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center text-blue-800">
            Join Our Community
          </h2>
          <p className="text-center text-gray-500 mb-1">
            Create your account to get started
          </p>

          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-2'>
            <div className="mb-4 col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4 col-span-2">
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image URL
              </label>
              <input
                type="text"
                name="profileImage"
                id="profileImage"
                placeholder="Enter profile image URL"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-3 col-span-2">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                id="skills"
                placeholder="Enter your skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>

            {/* Side-by-side buttons */}
            <div className="col-span-2 grid grid-cols-2 gap-x-4">
              <button
                type="submit"
                className="py-2 bg-blue-600 text-white font-semibold 
                           rounded-lg hover:bg-blue-700 focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out transform 
                           hover:scale-105 active:scale-95"
              >
                Join Now
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className="py-2 bg-white text-blue-600 
                           font-semibold border border-blue-300 rounded-lg 
                           hover:bg-blue-50 focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out transform 
                           hover:scale-105 active:scale-95"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunityPage;