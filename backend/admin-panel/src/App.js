import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticalNavbar from './components/VerticalNavbar';
import Home from './pages/Home';
import AddStartUp from './pages/AddStartUp';
import PersonManager from './pages/PersonManager';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;