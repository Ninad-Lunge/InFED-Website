import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPersonForm from './pages/AddPersonForm';
import VerticalNavbar from './components/VerticalNavbar';
import Home from './pages/Home';
import AddStartUp from './pages/AddStartUp';

function App() {
  return (
    <Router>
      <div className="flex">
        <VerticalNavbar />
        <div className="px-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-about" element={<AddPersonForm />} />
            <Route path="/add-startup" element={<AddStartUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;