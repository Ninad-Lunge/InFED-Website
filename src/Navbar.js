import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleToggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function handleClick(){

    }

    return (
        <nav className="navbar font-sans flex flex-col md:flex-row justify-between m-5 items-center">
            <img className='logo w-1/4 md:w-1/12 mb-4 md:mb-0' src={require('./assests/images/InFED-logo.jpg')} alt="infed-logo" />
            
            {/* Hamburger menu icon for mobile screens */}
            <button 
                className="md:hidden block focus:outline-none" 
                onClick={handleToggleMenu}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            <div className={`links ${isMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row gap-y-4 md:gap-1 gap-x-6 md:gap-x-14 mb-4 md:mb-0 text-sm`}>
                <a href="#top">About</a>
                <a href="#program">Program</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#event">Event</a>
                <a href="#ibfc">IBFC</a>
                <a href="#contact">Contact</a>
            </div>

            <div>
                <button className='join-btn p-2 md:px-4 md:py-2 bg-white text-black border border-black rounded-md text-sm' onClick={handleClick}>
                    Join the Community
                </button>
            </div>
        </nav>
    );
}

export default Navbar;