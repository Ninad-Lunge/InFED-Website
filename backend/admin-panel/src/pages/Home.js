import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticalNavbar from '../components/VerticalNavbar';


function Home() {
    return (
        <div className="home-section">
            <h1 className="heading text-xl font-bold my-4">
                Welcome to InFED Website Admin Panel!
            </h1>
        </div>
    );
}

export default Home;