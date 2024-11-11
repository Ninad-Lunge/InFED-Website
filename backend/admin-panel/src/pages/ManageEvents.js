import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    shortDesc: '',
    date: '',
    venue: '',
    description: '',
    mode: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/get-events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      image: event.image,
      shortDesc: event.shortDesc,
      date: event.date.split('T')[0], // Format date for input
      venue: event.venue,
      description: event.description,
      mode: event.mode
    });
    setEditingId(event._id);
    setIsAddingNew(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/delete-event/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setMessage('Event deleted successfully');
          fetchEvents(); // Refresh the list
        } else {
          setMessage('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        setMessage('Error deleting event');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `/api/update-event/${editingId}`
        : '/api/add-event';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setMessage(editingId ? 'Event updated successfully' : 'Event added successfully');
        setFormData({
          name: '',
          image: '',
          shortDesc: '',
          date: '',
          venue: '',
          description: '',
          mode: ''
        });
        setEditingId(null);
        setIsAddingNew(false);
        fetchEvents(); // Refresh the list
      } else {
        setMessage(editingId ? 'Failed to update event' : 'Failed to add event');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error processing event');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <button 
          onClick={() => {
            setIsAddingNew(!isAddingNew);
            setEditingId(null);
            setFormData({
              name: '',
              image: '',
              shortDesc: '',
              date: '',
              venue: '',
              description: '',
              mode: ''
            });
          }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus size={20} />
          {isAddingNew ? 'Cancel' : 'Add New Event'}
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      {(isAddingNew || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Event Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="venue"
              placeholder="Event Venue"
              value={formData.venue}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <textarea
            name="shortDesc"
            placeholder="Event Short Description"
            value={formData.shortDesc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="2"
            required
          />
          <textarea
            name="description"
            placeholder="Event Detailed Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
          <textarea
            name="mode"
            placeholder="Mode of Conduction of Event"
            value={formData.mode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="2"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            {editingId ? 'Update Event' : 'Add Event'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="border rounded-lg overflow-hidden shadow-sm">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-2">{event.shortDesc}</p>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-4">{event.venue}</p>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;