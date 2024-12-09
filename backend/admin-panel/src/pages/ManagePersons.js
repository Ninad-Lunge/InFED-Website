import React, { useState, useEffect } from "react";

const ManagePersons = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    designation: "",
    email: "",
    linkedin: "",
    twitter: "",
    heading: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [persons, setPersons] = useState([]);
  const [personId, setPersonId] = useState("");

  // Fetch all persons on component mount
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await fetch("https://infed-website-kkva.onrender.com/api/people");
        const data = await response.json();
        setPersons(data);
      } catch (error) {
        console.error("Error fetching persons:", error);
      }
    };

    fetchPersons();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Add or update a person
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, designation, email, linkedin, twitter, heading } = formData;

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('designation', designation);
    formDataToSend.append('heading', heading);
    formDataToSend.append('email', email);
    formDataToSend.append('linkedin', linkedin);
    formDataToSend.append('twitter', twitter);
    
    // Append image if it exists
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const url = personId
        ? `https://infed-website-kkva.onrender.com/api/update-person/${personId}`
        : "https://infed-website-kkva.onrender.com/api/add-person";
      const method = personId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        // DO NOT set Content-Type header, let browser set it for multipart/form-data
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(
          personId
            ? "Person updated successfully!"
            : "Person added successfully!"
        );
        setPersons(
          personId
            ? persons.map((p) => (p._id === personId ? result.person : p))
            : [...persons, result.person]
        );
        // Reset form
        setFormData({
          name: "",
          image: null,
          designation: "",
          email: "",
          linkedin: "",
          twitter: "",
          heading: "",
        });
        // Clear file input
        if (document.getElementById('imageInput')) {
          document.getElementById('imageInput').value = '';
        }
        setPersonId("");
      } else {
        setSuccessMessage("Failed to save person. Please try again.");
      }
    } catch (error) {
      setSuccessMessage("Error occurred. Please try again.");
      console.error(error);
    }
  };

  // Delete a person
  const deletePerson = async (id) => {
    try {
      const response = await fetch(`https://infed-website-kkva.onrender.com/api/delete-person/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setPersons(persons.filter((p) => p._id !== id));
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setSuccessMessage("Error deleting person");
    }
  };

  // Set form data for editing
  const handleEdit = (person) => {
    setPersonId(person._id);
    setFormData({
        name: person.name,
        image: person.image,
        designation: person.designation,
        email: person.socialLinks?.email || "",
        linkedin: person.socialLinks?.linkedin || "",
        twitter: person.socialLinks?.twitter || "",
        heading: person.heading,
    });
  };

  return (
    <div className="person-manager">
      <h1 className="title text-xl font-bold py-4">
        Manage Persons in About Page
      </h1>

      {successMessage && (
        <div className="success-message text-green-500 mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded col-span-2"
        />
        <input
          id="imageInput"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 border rounded col-span-2"
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className="p-2 border rounded col-span-2"
        />
        <select
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          className="p-2 border rounded col-span-2"
        >
          <option value="">Select Heading</option>
          <option value="Honourable Advisory Board">Honourable Advisory Board</option>
          <option value="ISMC">ISMC</option>
          <option value="Executive Team">Executive Team</option>
          <option value="Mentors">Mentors</option>
          <option value="Independent Observers">Independent Observer</option>
          <option value="Consultants">Consultants</option>
        </select>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Link"
          value={formData.linkedin}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="twitter"
          placeholder="Twitter Link"
          value={formData.twitter}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded ring-2 ring-black-500"
        >
          {personId ? "Update Person" : "Add Person"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-4">Persons List</h3>
      <div className="border border-gray-400 p-2 rounded-md max-h-[400px] overflow-y-auto">
        <ul>
          {persons.map((person) => (
            <li
              key={person._id}
              className="grid grid-cols-5 gap-x-6 p-1 mb-0.5 border border-gray-400"
            >
              <span className="col-span-2">{person.name}</span>
              <span className="col-span-2">{person.heading}</span>
              <div className="grid grid-cols-2 place-items-end">
                <button
                  onClick={() => handleEdit(person)}
                  className="mr-2 py-1 px-5 bg-yellow-400 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePerson(person._id)}
                  className="py-1 px-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePersons;