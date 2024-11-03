import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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