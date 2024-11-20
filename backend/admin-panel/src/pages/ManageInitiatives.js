import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader } from 'lucide-react';

const InitiativeForm = ({ initiative, onSubmit, onCancel, newInitiative, handleInputChange, isSubmitting }) => (
  <div className="bg-white rounded-lg shadow-md mb-4 p-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">
        {initiative ? 'Edit Initiative' : 'Add New Initiative'}
      </h3>
      <button 
        onClick={onCancel}
        className="p-2 hover:bg-gray-100 rounded-full"
        type="button"
        disabled={isSubmitting}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={initiative ? initiative.title : newInitiative.title}
          onChange={handleInputChange}
          required
          placeholder="Enter initiative title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block mb-1">Image URL</label>
        <input
          type="text"
          name="image"
          value={initiative ? initiative.image : newInitiative.image}
          onChange={handleInputChange}
          required
          placeholder="Enter image URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={initiative ? initiative.description : newInitiative.description}
          onChange={handleInputChange}
          required
          placeholder="Enter initiative description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex space-x-2">
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
          {initiative ? 'Save Changes' : 'Submit'}
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

const InitiativesCard = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingInitiative, setEditingInitiative] = useState(null);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newInitiative, setNewInitiative] = useState({
    title: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch('https://infed-website-kkva.onrender.com/api/get-initiatives');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInitiatives(data);
      } catch (error) {
        console.error('Error fetching initiatives:', error);
        setError('Failed to load initiatives. Please try again later.');
      }
    };

    fetchInitiatives();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingInitiative) {
      setEditingInitiative(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNewInitiative(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = editingInitiative || newInitiative;
      
      // Validate payload
      if (!payload.title?.trim() || !payload.image?.trim() || !payload.description?.trim()) {
        throw new Error('All fields are required');
      }

      const endpoint = editingInitiative 
        ? `https://infed-website-kkva.onrender.com/api/update-initiative/${editingInitiative.id}`
        : 'https://infed-website-kkva.onrender.com/api/add-initiative';

      const method = editingInitiative ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to ${editingInitiative ? 'update' : 'add'} initiative`);
      }

      if (editingInitiative) {
        setInitiatives(prev => 
          prev.map(init => 
            init.id === editingInitiative.id ? responseData : init
          )
        );
        setEditingInitiative(null);
      } else {
        setInitiatives(prev => [...prev, responseData]);
        setIsAddingNew(false);
        setNewInitiative({ title: '', image: '', description: '' });
      }
    } catch (error) {
      console.error('Error saving initiative:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (initiative) => {
    setEditingInitiative(initiative);
    setIsAddingNew(false);
    setError(null);
  };

  const handleDelete = async (initiativeId) => {
    if (!window.confirm('Are you sure you want to delete this initiative?')) {
      return;
    }

    setError(null);
    setDeletingIds(prev => new Set([...prev, initiativeId]));
    
    try {
      const response = await fetch(`https://infed-website-kkva.onrender.com/api/delete-initiative/${initiativeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete initiative');
      }

      setInitiatives(prev => prev.filter(init => init.id !== initiativeId));
    } catch (error) {
      console.error('Error deleting initiative:', error);
      setError(error.message);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(initiativeId);
        return newSet;
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <button 
        onClick={() => {
          setIsAddingNew(!isAddingNew);
          setEditingInitiative(null);
          setError(null);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 mb-4 hover:bg-blue-600"
        disabled={isSubmitting}
      >
        <Plus className="w-4 h-4" />
        Add New Initiative
      </button>

      {(isAddingNew || editingInitiative) && (
        <InitiativeForm
          initiative={editingInitiative}
          newInitiative={newInitiative}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsAddingNew(false);
            setEditingInitiative(null);
            setError(null);
          }}
          isSubmitting={isSubmitting}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initiatives.map((initiative) => (
          <div key={initiative.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={initiative.image} 
              alt={initiative.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{initiative.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{initiative.description}</p>
              <div className="flex justify-end space-x-2">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleEdit(initiative)}
                  disabled={deletingIds.has(initiative.id) || isSubmitting}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-md relative disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(initiative.id)}
                  disabled={deletingIds.has(initiative.id) || isSubmitting}
                >
                  {deletingIds.has(initiative.id) ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InitiativesCard;