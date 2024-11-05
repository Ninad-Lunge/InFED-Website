import React from 'react';
import { FaHome, FaUser, FaCalendarPlus, FaEdit, FaRocket, FaPencilAlt, FaInfoCircle, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const VerticalNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="m-2 h-min w-56 bg-black flex flex-col items-center justify-start p-2 rounded-lg">
      <img 
        src={require('../assests/InFED-mono.png')} 
        alt="img" 
        className="w-36 my-2"
      />

      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/')}>
        <FaHome className="mr-2" /> Home
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/manage-events')}>
        <FaCalendarPlus className="mr-2" /> Manage Events
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/manage-startup')}>
        <FaRocket className="mr-2" /> Manage Startups
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/manage-schemes')}>
        <FaRupeeSign className="mr-2" /> Manage Schemes
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/manage-founders')}>
        <FaEdit className="mr-2" /> Manage Founders
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/edit-about')}>
        <FaInfoCircle className="mr-2" /> Edit About Page
      </button>

      <hr className="bg-white w-40 my-4" />

      <button className="w-full bg-transparent text-white border-none py-3 px-4 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/profile')}>
        <FaUser className="mr-2" /> Profile
      </button>
    </div>
  );
};

export default VerticalNavbar;