import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import AddPersonForm from './pages/AddPersonForm';
import AddEventForm from './pages/AddEventForm';
=======
>>>>>>> b1da84a7044115ef63b1cb0d9c0220f15c33b602
import VerticalNavbar from './components/VerticalNavbar';
import Home from './pages/Home';
import AddStartUp from './pages/AddStartUp';
import PersonManager from './pages/PersonManager';
import StartupManager from './pages/StartupManager';
import SchemeManager from './pages/SchemeManager';
import FounderManager from './pages/FounderManager';

function App() {
  return (
    <Router>
      <div className="flex">
        <VerticalNavbar />
        <div className="px-5 flex-auto mt-2">
          <Routes>
            <Route path="/" element={<AddEventForm />} />
            {/* <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/edit-about" element={<PersonManager />} />
            <Route path="/add-startup" element={<AddStartUp />} />
            <Route path="/manage-startup" element={<StartupManager />} />
            <Route path="/manage-schemes" element={<SchemeManager />} />
            <Route path="/manage-founders" element={<FounderManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;