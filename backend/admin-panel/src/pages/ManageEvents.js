import React, { useState } from 'react';

const ManageEvents = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventImage: '',
    eventShortDesc: '',
    eventDate: '',
    eventVenue: '',
    description: '',   // Renamed to match the backend schema
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
    const { eventName, eventImage, eventShortDesc, eventDate, eventVenue, description } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventName,
          eventImage,
          eventShortDesc,
          eventDate,
          eventVenue,
          description,
        })
      });
      
      if (response.ok) {
        setSuccessMessage('Event added successfully');
        setFormData({
          eventName: '',
          eventImage: '',
          eventShortDesc: '',
          eventDate: '',
          eventVenue: '',
          description: ''
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
        <input type="text" name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} required />
        <input type="text" name="eventImage" placeholder="Event Image URL" value={formData.eventImage} onChange={handleChange} required />
        <textarea name="eventShortDesc" placeholder="Event Short Description" value={formData.eventShortDesc} onChange={handleChange} required />
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
        <input type="text" name="eventVenue" placeholder="Event Venue" value={formData.eventVenue} onChange={handleChange} required />
        <textarea name="description" placeholder="Event Detailed Description" value={formData.description} onChange={handleChange} required /> {/* Updated name to match schema */}
        <button type="submit">Add Event</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default ManageEvents;