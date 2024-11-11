import { motion } from 'framer-motion';

const Hero = () => {
    const handleClick = () => { /* Handle click event */ };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            className="hero flex flex-col md:flex-row m-5 md:ms-20 mt-10"
        >
            <motion.div 
                initial={{ x: -100, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ duration: 1 }}
                className="left-side text-left w-full md:w-1/2 grid gap-y-4 order-2 md:order-1"
            >
                <motion.div 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.8 }}
                    className="text-1 font-bold text-4xl md:text-6xl lg:text-8xl"
                >
                    <p>Bring your ideas to life!</p>
                </motion.div>
                <motion.div 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-2 text-lg md:text-2xl md:py-4"
                >
                    <p>
                        Start your <span className="text-yellow-400 font-bold">Entrepreneurship Journey</span> with{' '}
                        <span className="text-yellow-400 font-bold">InFED</span> today.
                    </p>
                </motion.div>
                <motion.div 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 1, delay: 0.4 }}
                    className="buttons flex flex-row gap-x-4 md:gap-x-16 items-start"
                >
                    <button 
                        className="incubation-btn p-2 md:px-4 md:py-2 bg-black text-white border border-black rounded-md shadow-sm hover:shadow-[4px_4px_0px_#8D8D8D] transition ease-in-out delay-150 hover:-translate-x-1 hover:-translate-y-1"
                        onClick={handleClick}
                    >
                        Apply for Incubation
                    </button>
                    <button 
                        className="join-btn p-2 md:px-4 md:py-2 bg-white text-black border border-black rounded-md hover:shadow-[4px_4px_0px_#F7A221] transition ease-in-out delay-150 hover:-translate-x-1 hover:-translate-y-1"
                        onClick={handleClick}
                    >
                        Join the Community
                    </button>
                </motion.div>
            </motion.div>
            <motion.div 
                // initial={{ scale: 0.8 }} 
                animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    y: [0, -15, 0],
                    // x: [0, 10, 0]
                }} 
                transition={{ 
                    duration: 2, 
                    delay: 0.5, 
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
                className="right-side w-full md:w-1/2 me-0 md:me-20 ms-0 md:ms-20 mt-10 md:mt-0 order-1 md:order-2"
            >
                <img src={require('./../../assests/images/Landing Page/Landing Tile 01.png')} alt="hero-img" className="hero-img" />
            </motion.div>
        </motion.div>
    );
};

export default Hero;