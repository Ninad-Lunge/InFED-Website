import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPersonForm from './pages/AddPersonForm';
import AddEventForm from './pages/AddEventForm';
import VerticalNavbar from './components/VerticalNavbar';

function App() {
  return (
    <Router>
      <div className="flex">
        <VerticalNavbar />
        <div className="px-5">
          <Routes>
            <Route path="/" element={<AddEventForm />} />
            {/* <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;