import React, { useState } from 'react';
import { MapPin, Users, Target, Trophy } from 'lucide-react';

const InitiativeDetails = () => {
  const [activeTab, setActiveTab] = useState('about');

  // Sample data - replace with your actual data
  const initiative = {
    title: "Incubation cum Business Facilitation Center (IBFC)",
    description: "Program Description",
    about: "The Startup Accelerator Program is designed to provide comprehensive support to early-stage startups through mentorship, resources, and networking opportunities.",
    objectives: [
      "Foster innovation and entrepreneurship in key sectors",
      "Provide mentorship from industry experts",
      "Enable access to market opportunities",
      "Build a robust startup ecosystem"
    ],
    impact: {
      startups: 150,
      jobs: 1200,
      funding: "₹50 Crores",
      success_rate: "75%"
    },
    locations: ["Wardha", "Bhandara"],
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]
  };

  // Tab rendering function
  const renderTabContent = () => {
    switch(activeTab) {
      case 'about':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">About the Program</h2>
            <p className="text-gray-700 mb-4">{initiative.about}</p>
            
            <div className="mt-6">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="h-5 w-5" />
                <span>Program Locations:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {initiative.locations.map((location, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'objectives':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Program Objectives</h2>
            <div className="grid gap-4">
              {initiative.objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-500 mt-1" />
                  <p className="text-gray-700">{objective}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'impact':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Impact Created</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-[#F7A221]" />
                <div className="text-2xl font-bold">{initiative.impact.startups}</div>
                <div className="text-sm text-gray-600">Startups Supported</div>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-[#F7A221]" />
                <div className="text-2xl font-bold">{initiative.impact.success_rate}</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-[#F7A221]" />
                <div className="text-2xl font-bold">{initiative.impact.jobs}</div>
                <div className="text-sm text-gray-600">Jobs Created</div>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-[#F7A221]" />
                <div className="text-2xl font-bold">{initiative.impact.funding}</div>
                <div className="text-sm text-gray-600">Funding Facilitated</div>
              </div>
            </div>
          </div>
        );
      
      case 'gallery':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Program Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {initiative.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Program image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{initiative.title}</h1>
        <p className="text-lg text-gray-600">{initiative.description}</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b">
        <nav className="flex space-x-4">
          {['about', 'objectives', 'impact', 'gallery'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-2 px-4 text-sm font-medium 
                ${activeTab === tab 
                  ? 'border-b-2 border-yellow-500 text-[#F7A221]' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default InitiativeDetails;