import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ contactRef }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    function handleToggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function handleClick() {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function handleClickonImage() {
        navigate('/LandingPage');
    }

    return (
        <nav className="navbar font-sans flex flex-col md:flex-row justify-between px-5 mb-5 items-center sticky top-0 left-0 right-0 bg-white z-40">
            <img 
                className='logo w-1/4 md:w-1/12 mb-4 md:mb-0' 
                src={require('../assests/images/InFED-logo.jpg')} 
                alt="infed-logo"
                onClick={handleClickonImage}
            />
            
            <button 
                className="md:hidden block focus:outline-none" 
                onClick={handleToggleMenu}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            <div className={`links ${isMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row gap-y-4 md:gap-1 gap-x-6 md:gap-x-14 mb-4 md:mb-0 text-sm`}>
                <Link to="/about">About</Link>
                <Link to="/program">Program</Link>
                <Link to="/portfolio">Portfolio</Link>
                <Link to="/event">Event</Link>
                <Link to="/ibfc">IBFC</Link>
                <button onClick={handleClick}>Contact</button>
            </div>

            <div>
                <button className='join-btn p-2 md:px-4 md:py-2 bg-white text-black border border-black rounded-md text-sm' onClick={handleClick}>
                    Join the Community
                </button>
            </div>
        </nav>
    );
};

export default Navbar;