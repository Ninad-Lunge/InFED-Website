import React, { useState } from 'react';
import axios from 'axios';
import InfedLogo from '../assests/InFED-logo.jpg'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://infed-website-kkva.onrender.com/api/auth/login', {
        email,
        password,
      });

      // Store the token and user data in the session
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log( JSON.stringify(response.data.user));
      navigate('/');

      // Redirect the user to the admin panel or dashboard
      // window.location.href = '/admin';
    } catch (error) {
      console.error('Error logging in:', error);
      
      // More detailed error handling
    if (error.response) {
      const errorMessage = error.response.data.message || 
                           'Login failed. Please check your credentials.';
      
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      
      alert(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      alert('No response from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }
  
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        {/* Logo Container */}
        <div className="flex justify-center mb-6">
          <img 
            src={InfedLogo}
            alt="Company Logo" 
            className="max-h-20 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;