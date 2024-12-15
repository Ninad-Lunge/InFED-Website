import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './../assets/InFED-logo.jpg';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/join-page');
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://infed-website-kkva.onrender.com/api/users/login', loginData);
      localStorage.setItem('token', response.data.token);
      const userId = response.data.userId;
      localStorage.setItem('userId', userId);
      // alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error during login. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 w-full rounded-xl min-h-screen">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl">
        {/* Centered Logo with more padding */}
        <div className="flex justify-center py-4">
          <img 
            src={logo} 
            alt="infed-logo" 
            className="w-48" 
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-800">
          Login Now
        </h2>

        <p className="text-center text-gray-500">
            Please sign in to continue
        </p>

        {/* Login Form */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 ease-in-out"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold 
                         rounded-lg hover:bg-blue-700 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 
                         transition duration-300 ease-in-out transform 
                         hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 mb-4">
              Don't have an account?
            </p>
            <button
              onClick={handleRegister}
              className="w-full py-3 bg-white text-blue-600 
                         font-semibold border border-blue-300 rounded-lg 
                         hover:bg-blue-50 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 
                         transition duration-300 ease-in-out transform 
                         hover:scale-105 active:scale-95"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;