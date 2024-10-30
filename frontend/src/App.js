import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Event from "./pages/Event";
import Initiatives from "./pages/Initiatives";
import StartupDetails from "./components/Portfolio/StartupDetails";
import Reports from "./pages/Reports";
import Program from "./pages/Program";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/LandingPage" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/program" element={<Program />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/event" element={<Event />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/startup/:id" element={<StartupDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
