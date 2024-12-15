import React, { useState, useEffect } from "react";
import { MapPin, Target, Users, Award } from "react-feather";
// Import your ManageInitiative component
import axios from "axios";

const InitiativesPage = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [activeTabs, setActiveTabs] = useState({});
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To capture any error

  // Fetch initiatives data when the component mounts
  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await axios.get("/api/get-initiatives");
        setInitiatives(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching initiatives:", err);
        setError("Failed to load initiatives");
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  const handleTabChange = (initiativeId, tab) => {
    setActiveTabs((prevTabs) => ({
      ...prevTabs,
      [initiativeId]: tab,
    }));
  };

  const renderTabContent = (initiative, activeTab) => {
    switch (activeTab) {
      case "about":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              About the Program
            </h2>
            <p className="text-gray-700 mb-4">{initiative.about}</p>
            <div className="mt-6">
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="text-xl">Program Locations:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {initiative.locations.map((location, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-orange-300 hover:border-orange-500 transition-all"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case "objectives":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Program Objectives
            </h2>
            <div className="grid gap-1">
              {initiative.objectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all group"
                >
                  <Target className="h-5 w-5 text-yellow-500 mt-1 group-hover:text-yellow-600 transition-colors" />
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "impact":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Impact Created
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[{
                icon: Users,
                value: initiative.impact.startups,
                label: "Startups Supported",
                color: "orange",
              },
              {
                icon: Award,
                value: initiative.impact.success_rate,
                label: "Success Rate",
                color: "yellow",
              },
              {
                icon: Users,
                value: initiative.impact.jobs,
                label: "Jobs Created",
                color: "orange",
              },
              {
                icon: Award,
                value: initiative.impact.funding,
                label: "Funding Facilitated",
                color: "yellow",
              }].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-lg border border-transparent hover:border-${item.color}-400 hover:bg-${item.color}-50 transition-all group`}
                  >
                    <Icon
                      className={`h-8 w-8 mx-auto mb-2 text-${item.color}-500 group-hover:text-${item.color}-600 transition-colors`}
                    />
                    <div className="text-2xl font-bold text-gray-800 group-hover:text-black transition-colors">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "gallery":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Program Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {initiative.images.map((image, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-orange-400 transition-all duration-300 group"
                >
                  <img
                    src={image}
                    alt={`Program image ${index + 1}`}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSaveInitiative = (newInitiative) => {
    setInitiatives((prevInitiatives) => [...prevInitiatives, newInitiative]);
  };

  if (loading) return <div>Loading initiatives...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-left my-10">
        Our <span className="text-[#F7A221] font-bold">Initiatives</span>
      </h1>

      <div className="max-w-6xl mx-auto p-6 bg-gray-50">
        <div className="space-y-8">
          {initiatives.map((initiative) => (
            <div
              key={initiative._id} // Assuming `_id` is used as the unique identifier
              className="bg-white rounded-lg border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:-translate-y-2 overflow-hidden group"
            >
              <div className="p-6 bg-gray-100 transition-colors duration-300">
                <h1 className="text-4xl font-bold mb-4 text-gray-800 transition-colors duration-300">
                  {initiative.title}
                </h1>
                <p className="text-lg text-gray-400 transition-colors duration-300">
                  {initiative.description}
                </p>
              </div>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-4 px-6 py-3">
                  {["about", "objectives", "impact", "gallery"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(initiative._id, tab)}
                      className={`
                        py-2 px-4 
                        text-sm 
                        font-medium 
                        rounded-md
                        transition-all
                        duration-300
                        ${activeTabs[initiative._id] === tab
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-800 border border-transparent hover:border-orange-300"
                        }
                      `}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="p-6">
                {renderTabContent(initiative, activeTabs[initiative._id])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitiativesPage;
