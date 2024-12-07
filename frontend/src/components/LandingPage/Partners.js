import React from 'react';
import partner from '../../assests/images/partners.png';
import { motion } from 'framer-motion';

const Partners = () => {
  return (
    <div className="mb-[80px] px-5 md:px-10 lg:px-20">
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
          <span className="ml-3 text-[#F7A221]">Partners</span>
      </motion.div>

      {/* Marquee Container towards left */}
      <div className="relative overflow-hidden h-[120px]">
        <div
          className="flex gap-[80px] animate-marquee"
          style={{ animationDuration: '30s' }}
        >
          {Array(15)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[120px]"
              >
                <img
                  src={partner}
                  alt={`Partner Logo ${index + 1}`}
                  className="w-[100px] h-auto mb-2"
                />
                <h1 className="font-semibold">ABC Company</h1>
              </div>
            ))}
        </div>
      </div>

      {/* Marquee Container towards right */}
      <div className="relative overflow-hidden h-[120px] mt-20">
        <div
          className="flex gap-[80px] animate-marqueeReverse"
          style={{ animationDuration: '30s' }}
        >
          {Array(15)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[120px]"
              >
                <img
                  src={partner}
                  alt={`Partner Logo ${index + 1}`}
                  className="w-[100px] h-auto mb-2"
                />
                <h1 className="font-semibold">ABC Company</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
