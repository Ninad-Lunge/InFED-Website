import React, { useState, useEffect } from "react";
import axios from "axios";

const PartnerUpload = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [partners, setPartners] = useState([]);
  const [editingPartnerId, setEditingPartnerId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchPartners();
  }, []);

  // Fetch partners
  const fetchPartners = async () => {
    try {
      const response = await axios.get("https://infed-website-kkva.onrender.com/api/partners/get");
      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners", error);
    }
  };

  // Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", logo);

    try {
      if (editingPartnerId) {
        // Update existing partner
        await axios.put(`https://infed-website-kkva.onrender.com/api/partners/${editingPartnerId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Partner updated successfully");
      } else {
        // Add new partner
        await axios.post("https://infed-website-kkva.onrender.com/api/partners/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Partner uploaded successfully");
      }

      setName("");
      setLogo(null);
      setEditingPartnerId(null);
      fetchPartners();

      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error saving partner", error);
      alert("Failed to save partner");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) return;

    try {
      await axios.delete(`https://infed-website-kkva.onrender.com/api/partners/${id}`);
      setSuccessMessage("Partner deleted successfully");
      fetchPartners();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting partner", error);
      alert("Failed to delete partner");
    }
  };

  // Handle edit
  const handleEdit = (partner) => {
    setName(partner.name);
    setEditingPartnerId(partner._id);
  };

  return (
    <div className="mx-auto bg-white">
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Partners</h1> */}
      <h1 className="title text-xl font-bold py-4">Manage Partners</h1>

      {successMessage && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Partner Upload Form */}
      <form
        onSubmit={handleUpload}
        className="mb-8 p-4 rounded-lg shadow-sm"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Partner Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Logo</label>
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {editingPartnerId ? "Update Partner" : "Upload Partner"}
        </button>
      </form>

      {/* Existing Partners */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Existing Partners</h2>
      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Logo</th>
                <th className="border border-gray-300 px-4 py-2 max-w-xl">Name</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 max-w-xl">
                    {partner.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(partner)}
                      className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(partner._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PartnerUpload;