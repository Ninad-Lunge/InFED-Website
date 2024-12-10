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
    // Fetch the logged-in user's information from the backend or localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));

      // Fetch the list of admins if the user is a super admin
      if (JSON.parse(storedUser).role === 'super-admin') {
        fetchAdmins();
      }
    }
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/list', {
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
    window.location.replace('/login');
  };

  const handleAddAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log('Token being sent:', token);
      await axios.post('/api/admin/create', {
        name: newAdminEmail.split('@')[0],
        email: newAdminEmail,
        password: newAdminPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewAdminEmail('');
      setNewAdminPassword('');
      fetchAdmins();
      alert('Admin added successfully')
    } catch (error) {
      console.error('Full error details:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      alert(error.response?.data?.message || 'Failed to add admin');
    }
  };
  

  const handleRemoveAdmin = async (adminId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/${adminId}`, {
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