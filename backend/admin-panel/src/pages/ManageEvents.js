import React, { useState } from 'react';

const ManageEvents = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    shortDesc: '',
    date: '',
    venue: '',
    description: '', 
    mode: ''  // Renamed to match the backend schema
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, shortDesc, date, venue, description, mode } = formData;

    try {
      const response = await fetch('/api/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          image,
          shortDesc,
          date,
          venue,
          description,
          mode
        })
      });
      
      if (response.ok) {
        setSuccessMessage('Event added successfully');
        setFormData({
          name: '',
          image: '',
          shortDesc: '',
          date: '',           
          venue: '',
          description: '', 
          mode: ''
        });
      } else {
        setSuccessMessage('Failed to add event');
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage('Error adding event');
    }
  };

  return (
    <div className="add-event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Event Image URL" value={formData.image} onChange={handleChange} required />
        <textarea name="shortDesc" placeholder="Event Short Description" value={formData.shortDesc} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="venue" placeholder="Event Venue" value={formData.venue} onChange={handleChange} required />
        <textarea name="description" placeholder="Event Detailed Description" value={formData.description} onChange={handleChange} required /> {/* Updated name to match schema */}
        <textarea name="mode" placeholder="Mode of Conduction of Event" value={formData.mode} onChange={handleChange} required />
        <button type="submit">Add Event</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default ManageEvents;