import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
  
        if (parsedUser.role === 'super-admin') {
          fetchAdmins();
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://infed-website-kkva.onrender.com/api/admin/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://infed-website-kkva.onrender.com/api/admin/create', {
        name: newAdminName || newAdminEmail.split('@')[0],
        email: newAdminEmail,
        password: newAdminPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setNewAdminEmail('');
      setNewAdminPassword('');
      setNewAdminName('');
      fetchAdmins();
      alert('Admin added successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                           'Failed to add admin. Please try again.';
      console.error('Admin creation error:', error);
      alert(errorMessage);
    }
  };
  
  const handleRemoveAdmin = async (adminId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://infed-website-kkva.onrender.com/api/admin/${adminId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchAdmins();
      alert('Admin removed successfully!!!')
    } catch (error) {
      console.error('Error removing admin:', error);
      alert(error.response?.data?.message || 'Failed to remove admin');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
        <div>
          <h2 className="text-xl font-bold">Welcome, {user.name}!</h2>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </div>

      {user.role === 'super-admin' && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Manage Admins</h3>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
            <div className="mb-4">
              <label htmlFor="newAdminName" className="block font-medium text-gray-700 mb-2">
                New Admin Name
              </label>
              <input
                type="text"
                id="newAdminName"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter admin's name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newAdminEmail" className="block font-medium text-gray-700 mb-2">
                New Admin Email
              </label>
              <input
                type="email"
                id="newAdminEmail"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Admin's Email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newAdminPassword" className="block font-medium text-gray-700 mb-2">
                New Admin Password
              </label>
              <input
                type="password"
                id="newAdminPassword"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Strong Password"
              />
            </div>
            <button
              onClick={handleAddAdmin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Admin
            </button>
          </div>

          <h3 className="text-lg font-bold">Current Admins</h3>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
            <ul>
              {admins.map((admin) => (
                <li key={admin._id} className="flex justify-between items-center py-2 border-b">
                  <div>{admin.email}</div>
                  <button
                    onClick={() => handleRemoveAdmin(admin._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;