import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Event from './pages/Event';
import IBFC from './pages/IBFC';

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route exact path='/' element={<LandingPage />} />
                <Route exact path='/LandingPage' element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/program" element={<Program />} /> */}
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/event" element={<Event />} />
                <Route path="/ibfc" element={<IBFC />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
      </Router>
    </div>
  );
}

export default App;
