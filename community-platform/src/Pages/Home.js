import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from './../assets/InFED-logo.jpg';
import { 
  Home, 
  // Calendar, 
  Users,
  LogOut
  // BriefcaseBusiness, 
  // TrendingUp, 
  // MessageCircle 
} from 'lucide-react';

const HomeDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  // const [userStats, setUserStats] = useState({
  //   activeConnections: 0,
  //   unreadMessages: 0,
  //   upcomingEvents: 0
  // });
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/profile');
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login-page');
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://infed-website-kkva.onrender.com/api/get-events"
        );
  
        // Filter upcoming events based on current date
        const currentDate = new Date();
        const filteredEvents = response.data.filter(event => {
          const eventDate = new Date(event.startDate);
          return eventDate >= currentDate;
        });
  
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();
  }, []);  

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(
          "https://infed-website-kkva.onrender.com/api/admin/opportunities"
        );
        setOpportunities(response.data);
      } catch (error) {
        console.error("Error fetching opps:", error);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="bg-white shadow-md rounded-lg p-4 h-fit">
          <nav className="space-y-4">
            <img src={logo} alt="infed-logo" className='w-36' />

            <hr />

            <div className="flex items-center space-x-3 text-blue-600 font-semibold">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </div>

            <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
              <Users className="w-5 h-5" />
              <button onClick={handleNavigation}><span>Profile</span></button>
            </div>

            <div className="flex items-center space-x-3 text-gray-600 hover:text-red-600">
              <LogOut className="w-5 h-5" />
              <button onClick={handleLogout} >
                  <span>Logout</span>
              </button>
            </div>
            
            {/* <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
              <Calendar className="w-5 h-5" />
              <span>Events</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
              <BriefcaseBusiness className="w-5 h-5" />
              <span>Opportunities</span>
            </div> */}
            
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Welcome Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, Community Member!</h1>
            <p className="text-gray-600 mt-2">Stay connected, grow, and explore opportunities.</p>
          </div>

          {/* Quick Stats */}
          {/* <div className="grid grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto text-green-500" />
              <h3 className="font-semibold mt-2">Active Connections</h3>
              <p className="text-2xl font-bold text-blue-600">{userStats.activeConnections}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <MessageCircle className="w-8 h-8 mx-auto text-blue-500" />
              <h3 className="font-semibold mt-2">Unread Messages</h3>
              <p className="text-2xl font-bold text-blue-600">{userStats.unreadMessages}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto text-purple-500" />
              <h3 className="font-semibold mt-2">Upcoming Events</h3>
              <p className="text-2xl font-bold text-blue-600">{userStats.upcomingEvents}</p>
            </div>
          </div> */}

          {/* Upcoming Events */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            {events.length === 0 ? (
              <p className="text-gray-500 text-center">No upcoming events</p>
            ) : (
              events.map(event => (
                <div
                  key={event._id}
                  className="flex justify-between items-center border-b py-3 last:border-b-0"
                >
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.startDate).toLocaleDateString()}
                      {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}{" "}
                      at {event.startTime}
                    </p>
                  </div>
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 flex justify-center items-center"
                  >
                    View Details
                  </a>
                </div>
              ))
            )}
          </div>

          {/* Latest Opportunities */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Latest Opportunities</h2>
            {opportunities.length === 0 ? (
              <p className="text-gray-500 text-center">No opportunities available</p>
            ) : (
              opportunities.map(opp => (
                <div key={opp._id} className="flex justify-between items-center border-b py-3 last:border-b-0">
                  <div>
                    <h3 className="font-medium">{opp.title}</h3>
                    <p className="text-sm text-gray-500">{opp.company}</p>
                  </div>
                  <a
                    href={opp.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 flex justify-center items-center"
                  >
                    Apply Now
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;