const Hero = () => {
    function handleClick() {
        // Handle click event
    }

    return (
        <div className="hero flex flex-col md:flex-row m-5 md:ms-20 mt-20">
            <div className="left-side text-left w-full md:w-1/2 grid gap-y-4 order-2 md:order-1">
                <div className="text-1 font-bold text-4xl md:text-6xl lg:text-8xl">
                    <p>Bring your ideas to life!</p>
                </div>
                <div className="text-2 text-lg md:text-2xl md:py-4">
                    <p>
                        Start your{' '}
                        <span className="text-yellow-400 font-bold"w>Entrepreneurship Journey</span> with{' '}
                        <span className="text-yellow-400 font-bold">InFED</span> today.
                    </p>
                </div>
                <div className="buttons flex flex-row gap-x-4 md:gap-x-16 items-start">
                    <button 
                        className="incubation-btn p-2 md:px-4 md:py-2 bg-black text-white border border-black rounded-md transition transform hover:-translate-y-1 hover:scale-105 shadow-sm hover:shadow-2xl"
                        onClick={handleClick}
                    >
                        Apply for Incubation
                    </button>
                    <button 
                        className="join-btn p-2 md:px-4 md:py-2 bg-white text-black border border-black rounded-md transition transform hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-2xl"
                        onClick={handleClick}
                    >
                        Join the Community
                    </button>
                </div>
            </div>
            <div className="right-side w-full md:w-1/2 me-0 md:me-20 ms-0 md:ms-20 mt-10 md:mt-0 order-1 md:order-2 transition transform hover:scale-90">
                <img src={require('./../../assests/images/HeroPlaceHolder.png')} alt="hero-img" className="hero-img" />
            </div>
        </div>
    );
};

export default Hero;