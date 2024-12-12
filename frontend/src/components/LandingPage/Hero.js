import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleApplyClick = () => {
    console.log('Exploring Incubation');
  };

  const handleCommunityClick = () => {
    console.log('Connecting to Community');
  };

  return (
    <div className="relative pt-6 pb-5 flex items-center">
      
      <motion.div 
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 md:px-12 lg:px-12 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between"
      >
        {/* Text Content */}
        <motion.div 
          variants={heroVariants}
          className="w-full md:w-3/5 space-y-6 text-left mr-12"
        >
          <motion.h1 
            variants={textVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            The Entrepreneurship and
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-customYellow-200 to-customYellow-300">
              Innovation Organizer
            </span>
          </motion.h1>

          <motion.p 
            variants={textVariants}
            className="text-l text-gray-900 leading-relaxed text-justify"
          >
            InFED (IIMN Foundation for Entrepreneurship Development) is the business incubator of the 
            Indian Institute of Management Nagpur (IIM Nagpur). InFED works with important stakeholders 
            at regional, state, national and international level to create an enabling ecosystem for 
            entrepreneurs and associated stakeholders.
          </motion.p>

          <motion.div 
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApplyClick}
              className="flex items-center justify-center gap-2 px-6 py-3 
              bg-gradient-to-r from-customYellow-200 to-customYellow-300 text-white 
              rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customYellow-400"
            >
              Apply for Incubation
              <ArrowRight size={20} className="ml-2" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCommunityClick}
              className="flex items-center justify-center gap-2 px-6 py-3 
              border-2 border-yellow-300 text-gray-800 
              rounded-xl hover:bg-yellow-50 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
            >
              <Globe size={20} className="mr-2" />
              Join the Community
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div 
          variants={textVariants}
          className="w-full md:w-2/5 flex justify-center items-center mb-12 md:mb-0"
          // onHoverStart={() => setIsHovered(true)}
          // onHoverEnd={() => setIsHovered(false)}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1,
                scale: isHovered ? 0.95 : 1,
                rotate: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg"
            >
              <div className="absolute -inset-2 
              rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
              
              <motion.img 
                src={require('./../../assests/images/aboutPage/iimn-front-night.png')} 
                alt="Entrepreneurship Illustration"
                className="relative z-10 w-full h-80 rounded-2xl shadow-xl 
                border-4 border-white transform transition-all duration-300"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;