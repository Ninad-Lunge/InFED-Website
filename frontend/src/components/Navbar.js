import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ contactRef }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    function handleToggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function handleScrollToTop() {
        // Scrolls the page to the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleClickContact() {
        // Scroll to the contact section
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function handleClickonImage() {
        navigate('/LandingPage');
    }

    const isActive = (path) => location.pathname === path ? 'text-[#F7A221]' : 'text-black';

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
                {['About', 'Program', 'Portfolio', 'Initiatives', 'Events', 'Reports'].map((item, index) => (
                    <Link
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className={`
                ${isActive(`/${item.toLowerCase()}`)} 
                relative 
                transition-colors 
                duration-300 
                group
                hover:text-[#F7A221]
                after:content-[''] 
                after:absolute 
                after:bottom-[-4px] 
                after:left-0 
                after:w-0 
                after:h-[2px] 
                after:bg-[#F7A221] 
                after:transition-all 
                after:duration-300 
                hover:after:w-full
            `}
                        onClick={handleScrollToTop}
                    >
                        {item}
                    </Link>
                ))}
                <button
                    onClick={handleClickContact}
                    className={`
            ${isActive('#contact')} 
            relative 
            transition-colors 
            duration-300 
            group
            hover:text-[#F7A221]
            after:content-[''] 
            after:absolute 
            after:bottom-[-4px] 
            after:left-0 
            after:w-0 
            after:h-[2px] 
            after:bg-[#F7A221] 
            after:transition-all 
            after:duration-300 
            hover:after:w-full
        `}
                >
                    Contact
                </button>
            </div>

            <div>
                <button className='join-btn p-2 md:px-4 md:py-2 bg-white text-black border border-black rounded-md text-sm hover:shadow-[4px_4px_0px_#F7A221] hover:scale-105 transition-transform' onClick={handleClickContact}>
                    Join the Community
                </button>
            </div>
        </nav>
    );
};

export default Navbar;