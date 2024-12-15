import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    images: [],
    shortDesc: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: '',
    description: '',
    mode: '',
    registrationLink: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://infed-website-kkva.onrender.com/api/get-events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: [...e.target.files]
    });
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      images: event.images || [], // ensure images is always an array
      shortDesc: event.shortDesc,
      startDate: event.startDate ? event.startDate.split('T')[0] : '', // Ensure startDate exists
      endDate: event.endDate ? event.endDate.split('T')[0] : '', // Ensure endDate exists
      startTime: event.startTime || '', // Ensure startTime exists
      endTime: event.endTime || '', // Ensure endTime exists
      venue: event.venue,
      description: event.description,
      mode: event.mode,
      registrationLink: event.registrationLink
    });
    setEditingId(event._id);
    setIsAddingNew(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`https://infed-website-kkva.onrender.com/api/delete-event/${id}`, {
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
    const formDataToSend = new FormData();

    // Append all the form data including images
    formDataToSend.append('name', formData.name);
    formDataToSend.append('shortDesc', formData.shortDesc);
    formDataToSend.append('startDate', formData.startDate);
    formDataToSend.append('endDate', formData.endDate);
    formDataToSend.append('startTime', formData.startTime);
    formDataToSend.append('endTime', formData.endTime);
    formDataToSend.append('venue', formData.venue);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('mode', formData.mode);
    formDataToSend.append('registrationLink', formData.registrationLink);

    // Append all the images
    formData.images.forEach((image, index) => {
      formDataToSend.append('images', image);
    });

    const url = editingId
      ? `https://infed-website-kkva.onrender.com/api/update-event/${editingId}`
      : 'https://infed-website-kkva.onrender.com/api/add-event';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (response.ok) {
        setMessage(editingId ? 'Event updated successfully' : 'Event added successfully');
        setFormData({
          name: '',
          images: [],
          shortDesc: '',
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          venue: '',
          description: '',
          mode: '',
          registrationLink: ''
        });
        setEditingId(null);
        setIsAddingNew(false);
        fetchEvents(); // Refresh the list
      } else {
        setMessage(editingId ? 'Failed to update event' : 'Failed to add event');
      }
    } catch (error) {
      console.error('Error processing event:', error);
      setMessage('Error processing event');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <button
          onClick={() => {
            setIsAddingNew(!isAddingNew);
            setEditingId(null);
            setFormData({
              name: '',
              images: [],
              shortDesc: '',
              startDate: '',
              endDate: '',
              startTime: '',
              endTime: '',
              venue: '',
              description: '',
              mode: '',
              registrationLink: ''
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
            {/* Handling multiple images */}
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              multiple
            />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
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
            <input 
              type="text"
              name="registrationLink"
              placeholder='Event Registration Link'
              value={formData.registrationLink}
              onChange={handleChange}
              className='w-full p-2 border rounded'
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
          <div>
            <textarea
              name="description"
              placeholder="Event Detailed Description (Max 150 words)"
              value={formData.description}
              onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/);
                if (words.length <= 150) {
                  handleChange(e);
                } else {
                  // Limit to 150 words
                  const limitedText = words.slice(0, 150).join(' ');
                  setFormData({
                    ...formData,
                    description: limitedText
                  });
                }
              }}
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.trim().split(/\s+/).filter(word => word.length > 0).length}/150 words
            </p>
          </div>
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Event Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
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
            <div className="flex flex-wrap">
              {event.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={event.name}
                  className="w-1/3 h-48 object-cover"
                />
              ))}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-2">{event.shortDesc}</p>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(event.startDate).toLocaleDateString()}
                {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
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