import React, { useState } from "react";
import { MapPin, Users, Target, Trophy } from "lucide-react";

const InitiativeDetails = () => {
  // Array of initiatives with their details
  const initiatives = [
    {
      id: 1,
      title: "Incubation cum Business Facilitation Center (IBFC)",
      about:
        "InFED established the Incubation and Business Facilitation Center (IBFC) at Wardha in collaboration with and under the aegis of the Collector Office. This center is designed to nurture and support a range of new and emerging businesses, including Self-Help Groups (SHGs), Farmer Producer Organizations (FPOs), Micro, Small & Medium Enterprises (MSMEs), and Startups. With a focus on driving economic growth, the IBFC will serve as a launchpad for businesses in these sectors, helping them scale and succeed. The center will provide much-needed resources, mentorship, and infrastructure support to entrepreneurs, ultimately contributing to the broader economic development efforts of the district.",
      objectives: [
        "Multi-faceted Objectives Aligned with District Economic Development",
        "Democratizing Infrastructure to Empower Entrepreneurs",
        "Solving Pressing Challenges and Enabling Strategic Growth",
        "Work closely with businesses to develop long-term strategic growth plans",
      ],
      impact: {
        startups: 150,
        jobs: 1200,
        funding: "₹50 Crores",
        success_rate: "75%",
      },
      locations: ["Wardha", "Bhandara"],
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
    },
    {
      id: 2,
      title: "Wardhini",
      about:
        "The Wardhini Cluster Accelerator Program is dedicated to the empowerment of rural women by enhancing their skills and capabilities. Through a series of capacity-building sessions, we equip women with essential skills in various domains, including entrepreneurship, financial literacy, and digital literacy, enabling them to navigate the complexities of running a business.",
      objectives: [
        "Introduce technology in rural businesses",
        "Provide digital skill training",
        "Create sustainable tech solutions",
        "Enhance rural economic opportunities",
      ],
      impact: {
        startups: 75,
        jobs: 600,
        funding: "₹25 Crores",
        success_rate: "65%",
      },
      locations: ["Wardha"],
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
    },
    {
      id: 3,
      title: "Idea To Impact Series",
      about:
        "In InFED’s Idea to Impact outreach program, we successfully engaged with more than 1,500 aspiring entrepreneurs from 12 colleges across Nagpur and Wardha. This initiative aimed to inspire and educate students about the potential of entrepreneurship as a viable career path. By reaching a diverse group of students, we have been able to create a ripple effect, encouraging them to explore their entrepreneurial ambitions and consider starting their ventures in the future.",
      objectives: [
        "Inspire entrepreneurial innovation by identifying and nurturing game-changing ideas.",
        "Cultivate resilience and a problem-solving mindset to overcome entrepreneurial challenges.",
        "Provide mentorship and guidance to transform early-stage ideas into purpose-driven startups.",
        "Spark inspiration through real-life success stories and insights from accomplished startup founders.",
      ],
      impact: {
        startups: 150,
        jobs: 1200,
        funding: "₹50 Crores",
        success_rate: "75%",
      },
      locations: ["Wardha", "Nagpur"],
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
    },
    {
      id: 4,
      title: "Women Entrepreneurship Development Programme (WEDP)",
      about:
        "It was conducted in January – February 2021, with the support of the Department of Science and Technology, Government of India. 26 participants from 7 states and 1 Union territory participated in this programme. The participants will be able to ideate, brainstorm, and finetune their ideas for venture creation. The participants will be able to add an innovative dimension either to their business models/ products/ services/ revenue streams or conceive a new sustainable venture idea. The participants will be able to network, introduce, and engage themselves to representatives of financial institutions, entrepreneurship enablers and founders of existing ventures. The participants will submit an initial feasibility report and final business plan in consultation with mentors and domain experts.",
      objectives: [
        "To train the graduates in Science and Technology stream in the essentials of conceiving, planning, initiating and launching a venture",
        "To expose them to a new body of knowledge or emerging trends and the opportunities in various sectors",
        "To network them with financial institutions, entrepreneurship enablers and innovative and successful entrepreneurs",
        "To advance their ideas towards a sellable product or service with proven customers",
      ],
      impact: {
        startups: 50,
        jobs: 400,
        funding: "₹15 Crores",
        success_rate: "60%",
      },
      locations: ["Nagpur"],
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
    },
    {
      id: 5,
      title: "Women Startup Programme - Cohort 1 & 2",
      description:
        "with NSRCEL, IIM Bangalore as programme partner for the state of Maharashtra",
      about:
        "The Women Startup Programme at InFED, IIM Nagpur is a fully dedicated programme to support aspiring women entrepreneurs to realise their dreams of starting and scaling their enterprise. The program identifies women entrepreneurs from diverse sectors through a rigorous screening process, offering them access to training and mentorship by domain experts and business mentors, market linkages, and access to exclusive networking events are some of the features of this programme.",
      objectives: [
        "Foster innovation and entrepreneurship in key sectors",
        "Provide mentorship from industry experts",
        "Enable access to market opportunities",
        "Build a robust startup ecosystem",
      ],
      impact: {
        startups: 150,
        jobs: 1200,
        funding: "₹50 Crores",
        success_rate: "75%",
      },
      locations: ["Nagpur"],
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
    },
    {
      id: 5,
      title: "Maharashtra Agribusiness Network (MAGNET)",
      about:
        "Under the Maharashtra Agribusiness Network (MAGNET) Project with KPMG, InFED recently organized a Training of Trainers program on Post Harvest Management of Orange and Sweet Orange at the prestigious Indian Institute of Management Nagpur. The 5-day program aimed to equip trainers with the necessary skills and knowledge to train orange and sweet orange cultivators on post-harvest management practices.The program comprised various activities and workshops that focused on topics such as harvest and handling, grading and sorting, storage, transportation, and value addition. The trainers also participated in a field trip to the MSAMB Facility in Karanja and the NOGA factory in Nagpur, where they had the opportunity to witness and understand the processes involved in post-harvest management.",
      objectives: [
        "Enhance Trainer Capacities in Post-Harvest Management",
        "Provide Hands-On Experience in Post-Harvest Practices",
        "Facilitate Knowledge Sharing and Collaboration Among Trainers",
        "Promote Sustainable Agricultural Practices and Quality Enhancement",
      ],
      impact: {
        startups: 150,
        jobs: 1200,
        funding: "₹50 Crores",
        success_rate: "75%",
      },
      locations: ["Nagpur"],
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
    },
    {
      id: 5,
      title: "Raising and Accelerating MSME Performance (RAMP)",
      about:
        "A World Bank-supported scheme to help India's Micro Small and Medium Enterprises (MSME) sector. The scheme was launched in June 2022 and is being implemented by the Ministry of Micro, Small and Medium Enterprises (MoMSME) from 2022-23 to 2026-27. The scheme aims to improve the performance of MSMEs by promoting innovation, digitization, and market access.",
      objectives: [
        "Enhance Innovation and Competitiveness in MSMEs",
        "Promote Digital Transformation and Technological Integration",
        "Expand Market Access for MSMEs",
        "Improve Overall Performance and Sustainability of MSMEs",
      ],
      impact: {
        startups: 150,
        jobs: 1200,
        funding: "₹50 Crores",
        success_rate: "75%",
      },
      locations: ["Nagpur"],
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
    },
  ];

  // Store active tabs for each initiative
  const [activeTabs, setActiveTabs] = useState(
    initiatives.reduce((acc, initiative) => {
      acc[initiative.id] = "about"; // default tab is 'about'
      return acc;
    }, {})
  );

  // Function to change the active tab
  const handleTabChange = (initiativeId, tab) => {
    setActiveTabs((prevTabs) => ({
      ...prevTabs,
      [initiativeId]: tab,
    }));
  };

  // Tab rendering function
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
              {[
                {
                  icon: Users,
                  value: initiative.impact.startups,
                  label: "Startups Supported",
                  color: "orange",
                },
                {
                  icon: Trophy,
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
                  icon: Trophy,
                  value: initiative.impact.funding,
                  label: "Funding Facilitated",
                  color: "yellow",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`
                      text-center 
                      p-4 
                      rounded-lg 
                      border 
                      border-transparent 
                      hover:border-${item.color}-400 
                      hover:bg-${item.color}-50 
                      transition-all 
                      group
                    `}
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
                  className="
                    border-2 
                    border-gray-200 
                    rounded-lg 
                    overflow-hidden 
                    hover:border-orange-400 
                    transition-all 
                    duration-300 
                    group
                  "
                >
                  <img
                    src={image}
                    alt={`Program image ${index + 1}`}
                    className="
                      w-full 
                      h-48 
                      object-cover 
                      transform 
                      group-hover:scale-105 
                      transition-transform 
                      duration-300
                    "
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

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-left my-10 ">
        Our <span className="text-[#F7A221] font-bold"> Initiatives </span>
      </h1>

      <div className="max-w-6xl mx-auto p-6 bg-gray-50">
        {/* Initiatives List */}
        <div className="space-y-8">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="
              bg-white 
              rounded-lg 
              border-2 
              border-gray-200
              hover:border-orange-400 
              transition-all 
              duration-300 
              ease-in-out 
              shadow-md 
              hover:shadow-xl 
              hover:-translate-y-2 
              overflow-hidden
              group
            "
            >
              {/* Header Section */}
              <div className="p-6 bg-gray-100  transition-colors duration-300">
                <h1 className="text-4xl font-bold mb-4 text-gray-800 transition-colors duration-300">
                  {initiative.title}
                </h1>
                <p className="text-lg text-gray-400 transition-colors duration-300">
                  {initiative.description}
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-4 px-6 py-3">
                  {["about", "objectives", "impact", "gallery"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(initiative.id, tab)}
                      className={`
                      py-2 px-4 
                      text-sm 
                      font-medium 
                      rounded-md
                      transition-all
                      duration-300
                      ${
                        activeTabs[initiative.id] === tab
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

              {/* Tab Content for Each Initiative */}
              <div className="p-6">
                {renderTabContent(initiative, activeTabs[initiative.id])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitiativeDetails;
