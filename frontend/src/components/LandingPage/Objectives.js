import React from 'react';
import { motion } from 'framer-motion';
import image from '../../assests/images/image.png';
import image1 from '../../assests/images/image-1.png';
import image2 from '../../assests/images/image-2.png';
import image3 from '../../assests/images/image-3.png';
import image4 from '../../assests/images/image-4.png';
import image5 from '../../assests/images/image-5.png';

const ObjectiveCard = ({ img, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }}
      whileHover={{
        boxShadow: "0 10px 15px -3px rgba(247, 162, 33, 0.3)",
        y: -10,
        transition: {
          duration: 0.3
        }
      }}
      className="group flex flex-col items-center space-y-4 p-6 
      border border-gray-200 rounded-xl 
      bg-white 
      transition-all duration-300 
      hover:border-[#F7A221]
      hover:bg-yellow-50/50
      transform"
    >
      <div className="p-4 bg-yellow-100 rounded-full mb-2 
      group-hover:bg-yellow-200 transition-colors duration-300">
        <img
          src={img}
          alt=""
          className="w-[60px] md:w-[80px] h-auto object-contain"
        />
      </div>
      <h3 className="font-semibold text-center text-gray-800 
      whitespace-pre-line group-hover:text-[#F7A221] 
      transition-colors duration-300">
        {text}
      </h3>
    </motion.div>
  );
};

const Objectives = () => {
  const objectivesData = [
    { img: image, text: 'Curated\nMentoring' },
    { img: image4, text: 'Paid Pilot\nOpportunity' },
    { img: image1, text: 'Market\nLinkages' },
    { img: image2, text: 'Networking\nOpportunities' },
    { img: image3, text: 'Startup-Scaleup\nSupport' },
    { img: image5, text: 'Funding\nOpportunities' },
  ];

  return (
    <div className="py-16 px-4 md:px-10 lg:px-20">
      <div className="container mx-auto">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: {
              duration: 0.6
            }
          }}
          className="flex items-center text-2xl md:text-3xl font-bold mb-8"
        >
          <span className="text-gray-800">Our</span>
          <span className="ml-3 text-[#F7A221]">Objectives</span>
        </motion.div>

        {/* Subtitle Section */}
        {/* <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: {
              duration: 0.6,
              delay: 0.2
            }
          }}
          className="text-xl md:text-2xl text-gray-700 mb-8"
        >
          We provide <span className="text-[#F7A221] font-bold">Everything</span> it takes.
        </motion.div> */}

        {/* Description Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1,
            transition: {
              duration: 0.6,
              delay: 0.4
            }
          }}
          className="text-left text-base md:text-lg lg:text-xl 
          text-gray-600 mx-auto mb-16"
        >
          By offering a rich suite of resources, expert guidance, and strategic partnerships, 
          InFED empowers startups to transform ideas into impactful ventures. Its comprehensive 
          incubation programs, deep domain expertise, and strong market linkages provide entrepreneurs 
          with the critical support needed to drive innovation, achieve sustained growth, and create 
          meaningful societal impact.
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {objectivesData.map((objective, index) => (
            <ObjectiveCard 
              key={index} 
              img={objective.img} 
              text={objective.text} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Objectives;