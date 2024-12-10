import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Fetch data from backend using fetch()
    fetch('https://infed-website-kkva.onrender.com/api/partners/get')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPartners(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching partners:', error);
      });
  }, []);

  return (
    <div className="mb-12 px-5 md:px-10 lg:px-20">
      <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: {
              duration: 0.6
            }
          }}
          className="flex items-center text-2xl md:text-3xl font-bold mb-16"
        >
          <span className="text-gray-800">Our</span>
          <span className="ml-3 text-[#F7A221]">Partners</span>
      </motion.div>

      {/* Marquee Container towards left */}
      <div className="relative overflow-hidden h-auto">
        <div
          className="flex gap-x-[80px] animate-marquee mb-10"
          style={{ animationDuration: '30s' }}
        >
          {partners.map((partner, index) => (
            <div
              key={partner.id || index}
              className="flex flex-col items-center min-w-52"
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="object-contain my-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Container towards right */}
      <div className="relative overflow-hidden h-auto mt-5">
        <div
          className="flex gap-[80px] animate-marqueeReverse"
          style={{ animationDuration: '30s' }}
        >
          {partners.map((partner, index) => (
            <div
              key={partner.id || index}
              className="flex flex-col items-center min-w-52"
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="object-contain my-auto"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;