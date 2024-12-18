import React, { useState, useEffect } from "react";
import { MapPin, Target, Users, Award } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const InitiativesPage = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [activeTabs, setActiveTabs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await axios.get("https://infed-website-kkva.onrender.com/api/get-initiatives");
        const initialActiveTabs = {};
        response.data.forEach((initiative) => {
          initialActiveTabs[initiative._id] = "about";
        });
        setInitiatives(response.data);
        setActiveTabs(initialActiveTabs);
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
    const tabVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
      exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="tab-content"
        >
          {activeTab === "about" && (
            <div className="bg-white rounded-2xl border-2 border-[#F7A221]/20 p-7 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-black">
                About the <span className="text-[#F7A221]">Program</span>
              </h2>
              <p className="text-gray-800 mb-4">{initiative.about}</p>
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-[#F7A221]" />
                  <span className="text-xl font-semibold text-black">
                    Program Locations:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {initiative.locations.map((location, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#F7A221]/10 text-black rounded-full text-sm border border-[#F7A221]/30 hover:bg-[#F7A221]/20 transition-all"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "objectives" && (
            <div className="bg-white rounded-2xl border-2 border-[#F7A221]/20 p-7 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-black">
                Program <span className="text-[#F7A221]">Objectives</span>
              </h2>
              <div className="grid gap-2">
                {initiative.objectives.slice(0, 3).map((objective, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7A221]/10 transition-all group"
                  >
                    <Target className="h-6 w-6 text-[#F7A221] mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-800 group-hover:text-black transition-colors">
                      {objective}
                    </p>
                  </div>
                ))}
              </div>
              {initiative.objectives.length > 3 && (
                <div className="mt-4 text-center">
                  <span className="text-sm italic text-gray-500">
                    Only the first 3 objectives are shown.
                  </span>
                </div>
              )}
            </div>
          )}

          {activeTab === "impact" && (
            <div className="bg-white rounded-2xl border-2 border-[#F7A221]/20 p-7 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-black">
                Impact <span className="text-[#F7A221]">Created</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: Users,
                    value: initiative.impact.startups,
                    label: "Startups Supported",
                  },
                  {
                    icon: Award,
                    value: initiative.impact.success_rate,
                    label: "Success Rate",
                  },
                  {
                    icon: Users,
                    value: initiative.impact.jobs,
                    label: "Jobs Created",
                  },
                  {
                    icon: Award,
                    value: initiative.impact.funding,
                    label: "Funding Facilitated",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg border border-[#F7A221]/20 bg-[#F7A221]/10 hover:bg-[#F7A221]/20 transition-all group"
                    >
                      <Icon className="h-8 w-8 mx-auto mb-2 text-[#F7A221] group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-bold text-black group-hover:text-[#F7A221] transition-colors">
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-800 group-hover:text-black transition-colors">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="bg-white rounded-2xl border-2 border-[#F7A221]/20 p-7 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-black">
                Program <span className="text-[#F7A221]">Gallery</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {initiative.images.map((image, index) => (
                  <div
                    key={index}
                    className="border-2 border-[#F7A221]/30 rounded-xl overflow-hidden hover:border-[#F7A221] hover:shadow-md transition-all duration-300 group"
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
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  if (loading)
    return (
      <div className="text-[#F7A221] text-center py-10">
        Loading initiatives...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="flex flex-col items-center bg-white">
      <h1 className="text-3xl text-center my-12 text-black">
        Our <span className="text-[#F7A221] font-bold">Initiatives</span>
      </h1>

      <div className="w-full max-w-6xl mx-auto p-6 bg-white">
        <div className="space-y-8">
          {initiatives.map((initiative) => (
            <div
              key={initiative._id}
              className="bg-white rounded-2xl border-2 border-[#F7A221]/20 hover:border-[#F7A221] transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:-translate-y-2 overflow-hidden group"
            >
              <div className="p-6 bg-[#F7A221]/10 transition-colors duration-300">
                <h1 className="text-4xl font-bold mb-4 text-black">
                  {initiative.title}
                </h1>
              </div>
              <div className="border-b border-[#F7A221]/20">
                <nav className="flex space-x-2 px-6 py-3">
                  {["about", "objectives", "impact", "gallery"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(initiative._id, tab)}
                      className={`py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                        activeTabs[initiative._id] === tab
                          ? "bg-[#F7A221] text-white shadow-md hover:shadow-lg"
                          : "text-[#F7A221] hover:bg-[#F7A221]/10 border border-[#F7A221]/50"
                      }`}
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
