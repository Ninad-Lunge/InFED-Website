import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import VerticalNavbar from './components/VerticalNavbar';
import Home from './pages/Home';
import ManagePortfolio from './pages/ManagePortfolio';
import ManageSchemes from './pages/ManageSchemes';
import ManageEvents from './pages/ManageEvents';
import ManagePersons from './pages/ManagePersons';
import FounderManager from './pages/FounderManager';
import ManageInitiatives from './pages/ManageInitiatives';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking the token in localStorage)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <div className="flex">
            <VerticalNavbar />
            <div className="px-5 flex-auto mt-2">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manage-events" element={<ManageEvents />} />
                <Route path="/manage-initiatives" element={<ManageInitiatives />} />
                <Route path="/manage-portfolio" element={<ManagePortfolio />} />
                <Route path="/manage-schemes" element={<ManageSchemes />} />
                <Route path="/manage-persons" element={<ManagePersons />} />
                <Route path="/manage-founders" element={<FounderManager />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;