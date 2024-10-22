import React from 'react';
import { FaHome, FaUser, FaCalendarPlus, FaEdit, FaRocket, FaPencilAlt, FaRegListAlt, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const VerticalNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="m-2 h-auto w-52 bg-black flex flex-col items-center justify-start p-2 rounded-lg">
      <img 
        src={require('../assests/InFED-mono.png')} 
        alt="img" 
        className="w-36 p-2"
      />

      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/')}>
        <FaHome className="mr-2" /> Home
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/add-events')}>
        <FaCalendarPlus className="mr-2" /> Add Events
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/edit-events')}>
        <FaEdit className="mr-2" /> Edit Events
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/add-startup')}>
        <FaRocket className="mr-2" /> Add Startup
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/edit-startup')}>
        <FaPencilAlt className="mr-2" /> Edit Startup
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/add-programs')}>
        <FaRegListAlt className="mr-2" /> Add Programs
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/edit-programs')}>
        <FaPencilAlt className="mr-2" /> Edit Programs
      </button>
      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/edit-events')}>
        <FaInfoCircle className="mr-2" /> Edit About Page
      </button>

      <hr className="bg-white w-40 my-4" />

      <button className="w-full bg-transparent text-white border-none py-3 px-4 px-8 text-left cursor-pointer text-lg mb-2 flex items-center" onClick={() => navigate('/profile')}>
        <FaUser className="mr-2" /> Profile
      </button>
    </div>
  );
};

export default VerticalNavbar;