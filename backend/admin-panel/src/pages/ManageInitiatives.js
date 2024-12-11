import React, { useState, useEffect } from 'react';
import { MapPin, Users, Target, Trophy } from 'lucide-react';
import axios from 'axios';

const ManageInitiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [editingInitiative, setEditingInitiative] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newInitiative, setNewInitiative] = useState({
    title: '',
    description: '',
    about: '',
    locations: [],
    objectives: [],
    images: [],
  });

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await axios.get('/api/get-initiatives'); // Adjust the API endpoint
        setInitiatives(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchInitiatives();
  }, []);

  const handleSelectInitiative = (initiative) => {
    setSelectedInitiative(initiative);
    setIsEditing(false);
  };

  const handleDeleteInitiative = async (id) => {
    try {
      console.log('Deleting initiative with id:', id);
  
      await axios.delete(`/api/delete-initiative/${id}`); // Adjust the API endpoint if needed
  
      // Update the state
      setInitiatives((prevInitiatives) => prevInitiatives.filter((initiative) => initiative.id !== id));
      if (selectedInitiative && selectedInitiative.id === id) {
        setSelectedInitiative(null);
      }
  
      // Clear any previous errors
      setError(null);
    } catch (err) {
      // Log and set error message
      console.error('Error deleting initiative:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to delete initiative');
    }
  };
  


      // const response = await fetch(endpoint, {
      //   method,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });

  const handleSaveInitiative = async () => {
    try {
      if (isEditing) {
        await axios.put(`/api/update-initiative/${selectedInitiative.id}`, selectedInitiative); // Adjust the API endpoint
        setInitiatives(
          initiatives.map((initiative) =>
            initiative.id === selectedInitiative.id ? selectedInitiative : initiative
          )
        );
        setEditingInitiative(null);
      } else {
        const response = await axios.post('/api/create-initiative', newInitiative); // Adjust the API endpoint
        setInitiatives([...initiatives, response.data]);
        setNewInitiative({
          title: '',
          description: '',
          about: '',
          locations: [],
          objectives: [],
          impact: { startups: 0, success_rate: 0, jobs: 0, funding: 0 },
          images: [],
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditChange = (field, value) => {
    setSelectedInitiative({ ...selectedInitiative, [field]: value });
  };

  if (error) return <p className="text-red-500">{error}</p>;
  const handleAddLocation = (locationToAdd) => {
    if (locationToAdd && !newInitiative.locations.includes(locationToAdd)) {
      setNewInitiative(prev => ({
        ...prev, 
        locations: [...prev.locations, locationToAdd]
      }));
    }
  };

  const handleAddObjective = (objectiveToAdd) => {
    if (objectiveToAdd && !newInitiative.objectives.includes(objectiveToAdd)) {
      setNewInitiative(prev => ({
        ...prev, 
        objectives: [...prev.objectives, objectiveToAdd]
      }));
    }
  };

  const handleAddImage = (imageUrl) => {
    if (imageUrl && !newInitiative.images.includes(imageUrl)) {
      setNewInitiative(prev => ({
        ...prev, 
        images: [...prev.images, imageUrl]
      }));
  };

  const handleRemoveLocation = (locationToRemove) => {
    setNewInitiative(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc !== locationToRemove)
    }));
  };

  const handleRemoveObjective = (objectiveToRemove) => {
    setNewInitiative(prev => ({
      ...prev,
      objectives: prev.objectives.filter(obj => obj !== objectiveToRemove)
    }));
  };

  const handleRemoveImage = (imageToRemove) => {
    setNewInitiative(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageToRemove)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Manage Initiatives</h1>
      </div>

      {/* Existing initiatives list code... */}

      {/* Add New Initiative */}
      {!isEditing && !selectedInitiative && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Initiative</h2>
          <div className="grid gap-4">
            <input
              type="text"
              className="border p-2 rounded"
              value={newInitiative.title}
              onChange={(e) => setNewInitiative({ ...newInitiative, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              className="border p-2 rounded"
              value={newInitiative.description}
              onChange={(e) => setNewInitiative({ ...newInitiative, description: e.target.value })}
              placeholder="Description"
            ></textarea>
            <textarea
              className="border p-2 rounded"
              value={newInitiative.about}
              onChange={(e) => setNewInitiative({ ...newInitiative, about: e.target.value })}
              placeholder="About Initiative"
            ></textarea>

            {/* Locations Section */}
            <div>
              <h3 className="font-semibold mb-2">Locations</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="locationInput"
                  className="border p-2 rounded flex-grow"
                  placeholder="Add Location"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddLocation(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {newInitiative.locations.map((location) => (
                  <span 
                    key={location} 
                    className="bg-blue-100 px-2 py-1 rounded flex items-center gap-2"
                  >
                    {location}
                    <button 
                      onClick={() => handleRemoveLocation(location)}
                      className="text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Objectives Section */}
            <div>
              <h3 className="font-semibold mb-2">Objectives</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="objectiveInput"
                  className="border p-2 rounded flex-grow"
                  placeholder="Add Objective"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddObjective(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {newInitiative.objectives.map((objective) => (
                  <span 
                    key={objective} 
                    className="bg-green-100 px-2 py-1 rounded flex items-center gap-2"
                  >
                    {objective}
                    <button 
                      onClick={() => handleRemoveObjective(objective)}
                      className="text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Images Section */}
            <div>
              <h3 className="font-semibold mb-2">Initiative Images</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="imageInput"
                  className="border p-2 rounded flex-grow"
                  placeholder="Add Image URL"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddImage(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {newInitiative.images.map((image) => (
                  <div 
                    key={image} 
                    className="relative"
                  >
                    <img 
                      src={image} 
                      alt="Initiative" 
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button 
                      onClick={() => handleRemoveImage(image)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleSaveInitiative}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Add Initiative
          </button>
        </div>
      )}
    </div>
  );
};
}

export default ManageInitiatives;