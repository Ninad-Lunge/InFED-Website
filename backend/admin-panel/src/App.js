import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticalNavbar from './components/VerticalNavbar';
import Home from './pages/Home';
import ManagePortfolio from './pages/ManagePortfolio';
import ManageSchemes from './pages/ManageSchemes';
import ManageEvents from './pages/ManageEvents';
import ManagePrograms from './pages/ManagePrograms';
import ManagePersons from './pages/ManagePersons';
import FounderManager from './pages/FounderManager';

function App() {
  return (
    <Router>
      <div className="flex">
        <VerticalNavbar />
        <div className="px-5 flex-auto mt-2">
          <Routes>
            <Route path="/" element={<Home />} />    
            <Route path="//manage-events" element={<ManageEvents />} />    
            <Route path="/manage-portfolio" element={<ManagePortfolio />} />    
            <Route path="/manage-schemes" element={<ManageSchemes />} />
            <Route path="/manage-programs" element={<ManagePrograms />} />
            <Route path="/manage-persons" element={<ManagePersons />} />
            <Route path="/manage-founders" element={<FounderManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;