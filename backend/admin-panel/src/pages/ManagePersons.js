import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from "axios";

// Component to manage persons
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
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get("https://infed-website-kkva.onrender.com/api/people");
        const data = response.data;
    
        // Ensure data is sorted by index
        const sortedPersons = data.sort((a, b) => a.index - b.index);
        
        // Verify each person has a unique ID
        const hasUniqueIds = new Set(sortedPersons.map(p => p._id)).size === sortedPersons.length;
        console.log("All persons have unique IDs:", hasUniqueIds);
        
        setPersons(sortedPersons);
      } catch (error) {
        console.error("Error fetching persons:", error);
      }
    };
  
    fetchPersons();
  }, []);

  // if (isLoading) return <div>Loading persons...</div>;
  // if (error) return <div>Error loading persons: {error.message}</div>;

  const onDragEnd = async (result) => {
    const { source, destination } = result;
  
    // Guard clauses for invalid drop scenarios
    if (!destination) return;
    if (source.index === destination.index) return;
  
    // Create a copy of the current persons array
    const newPersons = Array.from(persons);
    
    // Remove the dragged item from its original position
    const [reorderedItem] = newPersons.splice(source.index, 1);
    
    // Insert the dragged item at the new position
    newPersons.splice(destination.index, 0, reorderedItem);
  
    // Update the index for each person
    const updatedPersons = newPersons.map((person, index) => ({
      ...person,
      index: index
    }));
  
    // Optimistically update the UI
    setPersons(updatedPersons);
  
    try {
      // Send reordering request to backend
      await axios.post("https://infed-website-kkva.onrender.com/api/reorder-persons", {
        persons: updatedPersons
      });
      
      setSuccessMessage("Persons reordered successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      
      // Revert to original order if backend update fails
      setPersons(persons);
      setSuccessMessage("Failed to reorder persons. Please try again.");
    }
  };

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

    // Prepare form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("designation", designation);
    formDataToSend.append("heading", heading);
    formDataToSend.append("email", email);
    formDataToSend.append("linkedin", linkedin);
    formDataToSend.append("twitter", twitter);

    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const url = personId
        ? `https://infed-website-kkva.onrender.com/api/update-person/${personId}`
        : "https://infed-website-kkva.onrender.com/api/add-person";

      const method = personId ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formDataToSend,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = response.data;

      setSuccessMessage(personId ? "Person updated successfully!" : "Person added successfully!");
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

      if (document.getElementById("imageInput")) {
        document.getElementById("imageInput").value = "";
      }

      setPersonId("");
    } catch (error) {
      console.error(error);
      setSuccessMessage("Error occurred. Please try again.");
    }
  };

  // Delete a person
  const deletePerson = async (id) => {
    try {
      const response = await axios.delete(`https://infed-website-kkva.onrender.com/api/delete-person/${id}`);
      setPersons(persons.filter((p) => p._id !== id));
      setSuccessMessage(response.data.message);
    } catch (error) {
      setSuccessMessage("Error deleting person.");
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
      <h1 className="title text-xl font-bold py-4">Manage Persons in About Page</h1>

      {successMessage && <div className="success-message text-green-500 mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 mb-8">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border rounded col-span-2" />
        <input id="imageInput" type="file" name="image" accept="image/*" onChange={handleFileChange} className="p-2 border rounded col-span-2" />
        <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} className="p-2 border rounded col-span-2" />
        <select name="heading" value={formData.heading} onChange={handleChange} className="p-2 border rounded col-span-2">
          <option value="">Select Heading</option>
          <option value="Honourable Advisory Board">Honourable Advisory Board</option>
          <option value="Incubator Seed Management Committee">Incubator Seed Management Committee</option>
          <option value="Executive Team">Executive Team</option>
          <option value="Mentors">Mentors</option>
          <option value="Independent Observers">Independent Observers</option>
          <option value="Consultants">Consultants</option>
          <option value="Past Team Members">Past Team Members</option>
        </select>
        <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="linkedin" placeholder="LinkedIn Link" value={formData.linkedin} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="twitter" placeholder="Twitter Link" value={formData.twitter} onChange={handleChange} className="p-2 border rounded" />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded ring-2 ring-black-500">
          {personId ? "Update Person" : "Add Person"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-4">Persons List</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="persons">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="border border-gray-400 p-2 rounded-md max-h-[400px] overflow-y-auto">
              {persons.map((person, index) => (
                <Draggable key={person._id} draggableId={person._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="grid grid-cols-5 gap-x-6 p-1 mb-0.5 border border-gray-400 cursor-move"
                    >
                      <span className="col-span-2">{person.name}</span>
                      <span className="col-span-2">{person.heading}</span>
                      <div className="grid grid-cols-2 place-items-end">
                        <button onClick={() => handleEdit(person)} className="mr-2 py-1 px-5 bg-yellow-400 text-white rounded">
                          Edit
                        </button>
                        <button onClick={() => deletePerson(person._id)} className="py-1 px-2 bg-red-500 text-white rounded">
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ManagePersons;
