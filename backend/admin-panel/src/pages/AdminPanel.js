import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Remove the token and user data from the session
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect the user to the login page
    window.location.href = '/login';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Welcome, {user.name}!</p>
      <p>Your role is: {user.role}</p>
      <button onClick={handleLogout}>Logout</button>

      {/* Add your admin panel content here */}
    </div>
  );
};

export default AdminPanel;