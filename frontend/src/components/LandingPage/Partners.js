import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

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
    <div className="mb-12 px-5">
      <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: {
              duration: 0.6
            }
          }}
          className="flex items-center text-2xl md:text-3xl font-bold mb-16 md:px-10 lg:px-20"
        >
          <span className="text-gray-800">Our</span>
          <span className="ml-3 text-[#F7A221]">Partners</span>
      </motion.div>

      {/* Marquee towards left */}
      <Marquee gradient={false} speed={100} className="mb-16">
        {partners.map((partner, index) => (
          <div
            key={partner.id || index}
            className="flex flex-col items-center mx-6"
          >
            <img
              src={partner.logoUrl}
              alt={partner.name}
              className="h-24 max-w-60 object-contain my-auto"
              loading="eager"
            />
          </div>
        ))}
      </Marquee>

      {/* Marquee towards right */}
      <Marquee gradient={false} speed={100} direction="right" className="mt-12">
        {partners.map((partner, index) => (
          <div
            key={partner.id || index}
            className="flex flex-col items-center mx-6"
          >
            <img
              src={partner.logoUrl}
              alt={partner.name}
              className="h-24 max-w-60 object-contain my-auto"
              loading="eager"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Partners;