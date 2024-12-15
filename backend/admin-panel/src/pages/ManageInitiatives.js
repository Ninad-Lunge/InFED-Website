import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const ManageInitiative = () => {
  const [initiative, setInitiative] = useState({
    id: "",
    title: "",
    description: "",
    about: "",
    locations: [],
    objectives: [],
    impact: {
      startups: "",
      success_rate: "",
      jobs: "",
      funding: "",
    },
    images: [],
  });

  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitiatives();
  }, []);

  const fetchInitiatives = async () => {
    try {
      const response = await fetch("/api/add-initiative");
      if (response.ok) {
        const data = await response.json();
        setInitiatives(data);
        setIsLoading(false);
      } else {
        throw new Error('Failed to fetch initiatives');
      }
    } catch (error) {
      console.error("Error fetching initiatives:", error);
      setError("Failed to load initiatives");
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitiative(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImpactChange = (e) => {
    const { name, value } = e.target;
    setInitiative(prev => ({
      ...prev,
      impact: {
        ...prev.impact,
        [name]: value
      }
    }));
  };

  const handleLocationChange = (e) => {
    const locations = e.target.value.split(',').map(loc => loc.trim()).filter(loc => loc);
    setInitiative(prev => ({
      ...prev,
      locations
    }));
  };

  const handleObjectivesChange = (e) => {
    const objectives = e.target.value.split(',').map(obj => obj.trim()).filter(obj => obj);
    setInitiative(prev => ({
      ...prev,
      objectives
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setInitiative(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", initiative.title);
    formData.append("description", initiative.description);
    formData.append("about", initiative.about);
    formData.append("locations", JSON.stringify(initiative.locations));
    formData.append("objectives", JSON.stringify(initiative.objectives));
    formData.append("impact", JSON.stringify(initiative.impact));

    // Append images
    initiative.images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const method = initiative.id ? 'PUT' : 'POST';
      const url = initiative.id 
        ? `/api/add-initiative/${initiative.id}` 
        : "/api/add-initiative";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        const savedInitiative = await response.json();
        
        // Update initiatives list
        if (method === 'POST') {
          setInitiatives(prev => [...prev, savedInitiative]);
        } else {
          setInitiatives(prev => 
            prev.map(init => init._id === savedInitiative._id ? savedInitiative : init)
          );
        }

        // Reset form and close modal
        resetForm();
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to save initiative");
        console.error("Failed to save initiative:", errorData.error);
      }
    } catch (error) {
      console.error("Error submitting initiative:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setInitiative({
      id: "",
      title: "",
      description: "",
      about: "",
      locations: [],
      objectives: [],
      impact: {
        startups: "",
        success_rate: "",
        jobs: "",
        funding: "",
      },
      images: [],
    });
  };

  const handleEdit = (selectedInitiative) => {
    setInitiative({
      id: selectedInitiative._id,
      title: selectedInitiative.title,
      description: selectedInitiative.description,
      about: selectedInitiative.about,
      locations: selectedInitiative.locations || [],
      objectives: selectedInitiative.objectives || [],
      impact: {
        startups: selectedInitiative.impact?.startups || "",
        success_rate: selectedInitiative.impact?.success_rate || "",
        jobs: selectedInitiative.impact?.jobs || "",
        funding: selectedInitiative.impact?.funding || "",
      },
      images: selectedInitiative.images || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (initiativeId) => {
    try {
      const response = await fetch(`/api/add-initiative/${initiativeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setInitiatives(initiatives.filter(init => init._id !== initiativeId));
        alert("Initiative deleted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete initiative:", errorData.error);
        setError(errorData.error || "Failed to delete initiative");
      }
    } catch (error) {
      console.error("Error deleting initiative:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Add New Initiative Button */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <Plus size={20} />
          Add New Initiative
        </button>
      </div>

      {/* Modal for Adding/Editing Initiative */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {initiative.id ? "Edit Initiative" : "Add New Initiative"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="title"
                  value={initiative.title}
                  onChange={handleChange}
                  placeholder="Initiative Title"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="description"
                  value={initiative.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="about"
                  value={initiative.about}
                  onChange={handleChange}
                  placeholder="About the Initiative"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="locations"
                  value={initiative.locations.join(', ')}
                  onChange={handleLocationChange}
                  placeholder="Locations (comma-separated)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="objectives"
                  value={initiative.objectives.join(', ')}
                  onChange={handleObjectivesChange}
                  placeholder="Objectives (comma-separated)"
                  className="w-full p-2 border rounded"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="startups"
                    value={initiative.impact.startups}
                    onChange={handleImpactChange}
                    placeholder="Startups Impacted"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="jobs"
                    value={initiative.impact.jobs}
                    onChange={handleImpactChange}
                    placeholder="Jobs Created"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="success_rate"
                    value={initiative.impact.success_rate}
                    onChange={handleImpactChange}
                    placeholder="Success Rate"
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {initiative.id ? "Update" : "Save"} Initiative
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Existing Initiatives Display Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Existing Initiatives</h2>
        {isLoading ? (
          <div className="text-center py-10">Loading initiatives...</div>
        ) : initiatives.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No initiatives found. Add your first initiative!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiativeItem) => (
              <div 
                key={initiativeItem._id} 
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <div className="flex flex-wrap">
                  {initiativeItem.images?.length > 0 ? (
                    initiativeItem.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={initiativeItem.title}
                        className="w-1/3 h-48 object-cover"
                      />
                    ))
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{initiativeItem.title}</h3>
                  <p className="text-gray-600 mb-2">{initiativeItem.description}</p>
                  <div className="mb-2">
                    <strong>Locations:</strong> 
                    <span className="text-gray-600 ml-2">
                      {initiativeItem.locations?.join(', ') || 'N/A'}
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong>Impact:</strong>
                    <div className="text-sm text-gray-600">
                      <p>Startups: {initiativeItem.impact?.startups || 'N/A'}</p>
                      <p>Jobs Created: {initiativeItem.impact?.jobs || 'N/A'}</p>
                      <p>Success Rate: {initiativeItem.impact?.success_rate || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(initiativeItem)}
                      className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(initiativeItem._id)}
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
        )}
      </div>
    </div>
  );
};

export default ManageInitiative;