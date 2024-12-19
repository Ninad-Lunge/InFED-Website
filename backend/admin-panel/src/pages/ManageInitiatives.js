import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const ManageInitiative = () => {
  const [initiative, setInitiative] = useState({
    id: "",
    title: "",
    about: "",
    locations: [],
    objectives: [],
    impact: [], // Dynamic array of { key, value } objects
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
      const response = await fetch("https://infed-website-kkva.onrender.com/api/get-initiatives");
      if (response.ok) {
        const data = await response.json();
        setInitiatives(data);
        setIsLoading(false);
      } else {
        throw new Error("Failed to fetch initiatives");
      }
    } catch (error) {
      console.error("Error fetching initiatives:", error);
      setError("Failed to load initiatives");
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitiative((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setInitiative((prev) => ({
      ...prev,
      locations: value.split(",").map((loc) => loc.trim()),
    }));
  };

  const handleObjectivesChange = (e) => {
    const { value } = e.target;
    const objectives = value.split(",").map((obj) => obj.trim());
    if (objectives.length > 3) {
      alert("You can specify a maximum of 3 objectives.");
      return;
    }
    setInitiative((prev) => ({
      ...prev,
      objectives,
    }));
  };

  const handleImpactChange = (index, field, value) => {
    setInitiative((prev) => {
      const updatedImpact = [...prev.impact];
      updatedImpact[index][field] = value;
      return { ...prev, impact: updatedImpact };
    });
  };

  const addImpactItem = () => {
    if (initiative.impact.length < 4) {
      setInitiative((prev) => ({
        ...prev,
        impact: [...prev.impact, { key: "", value: "" }],
      }));
    } else {
      alert("You cannot add more than 4 impact items.");
    }
  };

  const removeImpactItem = (index) => {
    if (initiative.impact.length > 4) {
      setInitiative((prev) => ({
        ...prev,
        impact: prev.impact.filter((_, i) => i !== index),
      }));
    } else {
      alert("You must have at least 4 impact items.");
    }
  };

  // const addImpactItem = () => {
  //   setInitiative((prev) => ({
  //     ...prev,
  //     impact: [...prev.impact, { key: "", value: "" }],
  //   }));
  // };

  // const removeImpactItem = (index) => {
  //   setInitiative((prev) => ({
  //     ...prev,
  //     impact: prev.impact.filter((_, i) => i !== index),
  //   }));
  // };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + initiative.images.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} exceeds the 5 MB size limit.`);
        return false;
      }
      return true;
    });

    setInitiative((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (initiative.impact.length !== 4) {
      setError("You must have exactly 4 impact items.");
      return;
    }

    if (initiative.images.length > 3) {
      setError("You can upload a maximum of 3 images.");
      return;
    }
    if (initiative.objectives.length > 3) {
      setError("You can specify a maximum of 3 objectives.");
      return;
    }

    const formData = new FormData();
    formData.append("title", initiative.title);
    formData.append("about", initiative.about);
    formData.append("locations", JSON.stringify(initiative.locations));
    formData.append("objectives", JSON.stringify(initiative.objectives));
    formData.append("impact", JSON.stringify(initiative.impact));

    initiative.images.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      const method = initiative.id ? "PUT" : "POST";
      const url = initiative.id
        ? `https://infed-website-kkva.onrender.com/api/update-initiatives/${initiative.id}`
        : "https://infed-website-kkva.onrender.com/api/add-initiative";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        const savedInitiative = await response.json();

        if (method === "POST") {
          setInitiatives((prev) => [...prev, savedInitiative]);
        } else {
          setInitiatives((prev) =>
            prev.map((init) =>
              init._id === savedInitiative._id ? savedInitiative : init
            )
          );
        }

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
      about: "",
      locations: [],
      objectives: [],
      impact: [], // Reset to an empty array
      images: [],
    });
  };

  const handleEdit = (selectedInitiative) => {
    setInitiative({
      id: selectedInitiative._id,
      title: selectedInitiative.title,
      about: selectedInitiative.about,
      locations: selectedInitiative.locations || [],
      objectives: selectedInitiative.objectives || [],
      impact: selectedInitiative.impact || [], // Load impact as an array
      images: selectedInitiative.images || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (initiativeId) => {
    try {
      const response = await fetch(`https://infed-website-kkva.onrender.com/api/delete-initiatives/${initiativeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInitiatives(initiatives.filter((init) => init._id !== initiativeId));
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
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

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
                  name="about"
                  value={initiative.about}
                  onChange={handleChange}
                  placeholder="About the Initiative"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="locations"
                  value={initiative.locations.join(", ")}
                  onChange={handleLocationChange}
                  placeholder="Locations (comma-separated)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="objectives"
                  value={initiative.objectives.join(", ")}
                  onChange={handleObjectivesChange}
                  placeholder="Objectives (up to 3, comma-separated)"
                  className="w-full p-2 border rounded"
                />
                
                <div>
                  <h4 className="font-semibold mb-2">Impact</h4>
                  {initiative.impact.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 mb-2">
                      <input
                        type="text"
                        placeholder="Key"
                        value={item.key}
                        onChange={(e) =>
                          handleImpactChange(index, "key", e.target.value)
                        }
                        className="w-1/2 p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={item.value}
                        onChange={(e) =>
                          handleImpactChange(index, "value", e.target.value)
                        }
                        className="w-1/2 p-2 border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImpactItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImpactItem}
                    className="flex items-center gap-2 text-green-500 hover:text-green-700 mt-2"
                  >
                    <Plus size={16} />
                    Add Impact
                  </button>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Images</h4>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    {initiative.images.map((image, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 border border-gray-300 rounded bg-gray-100 flex items-center justify-center"
                      >
                        {image instanceof File ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <img
                            src={image} // If the image is already a URL, display it directly
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {initiative.id ? "Update Initiative" : "Add Initiative"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div>Loading initiatives...</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">About</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initiatives.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.about}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageInitiative;
