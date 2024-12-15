import React, { useState, useEffect } from "react";

const SchemeManager = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    desc: "",
    link: "",
    eligibilityCriteria: [],
    schemeBenefits: [],
  });

  const [eligibilityInput, setEligibilityInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [schemeId, setSchemeId] = useState("");

  // Fetch schemes on component mount
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://infed-website-kkva.onrender.com/api/get-schemes"
        );
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    fetchSchemes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleEligibilityAdd = () => {
    if (eligibilityInput.trim()) {
      setFormData({
        ...formData,
        eligibilityCriteria: [...formData.eligibilityCriteria, eligibilityInput],
      });
      setEligibilityInput("");
    }
  };

  const handleBenefitAdd = () => {
    if (benefitInput.trim()) {
      setFormData({
        ...formData,
        schemeBenefits: [...formData.schemeBenefits, benefitInput],
      });
      setBenefitInput("");
    }
  };

  const handleRemoveEligibility = (index) => {
    const updatedCriteria = formData.eligibilityCriteria.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, eligibilityCriteria: updatedCriteria });
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = formData.schemeBenefits.filter((_, i) => i !== index);
    setFormData({ ...formData, schemeBenefits: updatedBenefits });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, image, desc, link, eligibilityCriteria, schemeBenefits } = formData;

        const formDataToSend = new FormData();
        formDataToSend.append("name", name);
        formDataToSend.append("desc", desc);
        formDataToSend.append("link", link);

        // Append eligibilityCriteria as separate fields
        eligibilityCriteria.forEach((criteria, index) => {
            formDataToSend.append(`eligibilityCriteria[${index}]`, criteria);
        });

        // Append schemeBenefits as separate fields
        schemeBenefits.forEach((benefit, index) => {
            formDataToSend.append(`schemeBenefits[${index}]`, benefit);
        });

        if (image) {
            formDataToSend.append("image", image);
        }

        try {
            const url = schemeId
                ? `https://infed-website-kkva.onrender.com/api/update-scheme/${schemeId}`
                : "https://infed-website-kkva.onrender.com/api/add-scheme";
            const method = schemeId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                body: formDataToSend,
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage(
                    schemeId ? "Scheme updated successfully!" : "Scheme added successfully!"
                );
                setFormData({
                    name: "",
                    image: null,
                    desc: "",
                    link: "",
                    eligibilityCriteria: [],
                    schemeBenefits: [],
                });
                setSchemeId("");
                setSchemes(
                    schemeId
                        ? schemes.map((scheme) => (scheme._id === schemeId ? result.scheme : scheme))
                        : [...schemes, result.scheme]
                );
            } else {
                setSuccessMessage("Failed to save scheme. Please try again.");
            }
        } catch (error) {
            setSuccessMessage("Error occurred. Please try again.");
            console.error(error);
        }
    };


  const handleEdit = (scheme) => {
    setSchemeId(scheme._id);
    setFormData({
      name: scheme.name,
      image: null,
      desc: scheme.desc,
      link: scheme.link,
      eligibilityCriteria: scheme.eligibilityCriteria,
      schemeBenefits: scheme.schemeBenefits,
    });
  };

    const deleteScheme = async (id) => {
        try {
        const response = await fetch(
            `https://infed-website-kkva.onrender.com/api/delete-scheme/${id}`,
            { method: "DELETE" }
        );
        const data = await response.json();
        if (response.ok) {
            setSchemes(schemes.filter((scheme) => scheme._id !== id));
            setSuccessMessage(data.message);
        } else {
            setSuccessMessage("Failed to delete scheme.");
        }
        } catch (error) {
        setSuccessMessage("Error deleting scheme.");
        console.error(error);
        }
    };
    
    return (
        <div className="scheme-manager">
            <h1 className="title text-xl font-bold py-4">Manage Scheme</h1>

            {successMessage && (
                <div className="success-msg text-green-500 mb-4">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
                <input 
                    type="text" 
                    name="name"
                    placeholder="Name of the Scheme"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-2" 
                    required
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="p-2 border rounded"
                />
                <textarea
                    name="desc"
                    placeholder="Description"
                    value={formData.desc}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-4"
                    required
                />
                <input
                    type='text'
                    name="link"
                    placeholder="Application Link"
                    value={formData.link}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-4"
                    required
                />

                <div className="col-span-2">
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Add Scheme Benefit"
                            value={benefitInput}
                            onChange={(e) => setBenefitInput(e.target.value)}
                            className="p-2 border rounded-l w-full"
                        />
                        <button
                            type="button"
                            onClick={handleBenefitAdd}
                            className="py-2 px-8 bg-blue-500 text-white rounded-r"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Add Eligibility Criteria"
                            value={eligibilityInput}
                            onChange={(e) => setEligibilityInput(e.target.value)}
                            className="p-2 border rounded-l w-full"
                        />
                        <button
                            type="button"
                            onClick={handleEligibilityAdd}
                            className="py-2 px-8 bg-blue-500 text-white rounded-r"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Display added criteria and benefits with remove option */}
                
                <div className="col-span-2">
                    <h2>Scheme Benefits</h2>
                    <ul>
                        {formData.schemeBenefits.map((item, index) => (
                            <li key={index} className="flex items-center justify-between border border-gray-300 p-2 mb-1 rounded">
                                {item}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBenefit(index)}
                                    className="text-red-500 ml-2"
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-2">
                    <h2>Eligibility Criteria</h2>
                    <ul>
                        {formData.eligibilityCriteria.map((item, index) => (
                            <li key={index} className="flex items-center justify-between border border-gray-300 p-2 mb-1 rounded">
                                {item}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveEligibility(index)}
                                    className="text-red-500 ml-2"
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit" className="py-2 px-14 bg-green-500 text-white rounded place-self-end col-span-4">Submit</button>
            </form>

            <h3 className="text-lg font-semibold mb-4">Schemes List</h3>
            <ul className="border border-gray-400 p-2 rounded-md">
                {schemes.map((scheme) => (
                    <li
                        key={scheme._id}
                        className="grid grid-cols-3 gap-x-6 p-1 mb-0.5 border border-gray-400"
                    >
                        <span className="col-span-2">{scheme.name}</span>
                        <div className="grid grid-cols-2 place-items-end">
                            <button
                                onClick={() => handleEdit(scheme)}
                                className="mr-2 py-1 px-5 bg-yellow-400 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteScheme(scheme._id)}
                                className="py-1 px-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default SchemeManager;