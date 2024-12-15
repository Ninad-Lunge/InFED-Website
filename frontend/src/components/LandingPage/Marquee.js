import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import axios from 'axios';

const DynamicMarquee = () => {
  const [marqueeItems, setMarqueeItems] = useState([]);

  useEffect(() => {
    const fetchMarqueeItems = async () => {
      try {
        const response = await axios.get('https://infed-website-kkva.onrender.com/api/admin/marquee');
        setMarqueeItems(response.data);
      } catch (error) {
        console.error('Error fetching marquee items:', error);
      }
    };

    fetchMarqueeItems();
  }, []);

  return (
    <div className="w-full bg-gray-100 py-1">
      {marqueeItems.length > 0 ? (
        <Marquee speed={50} gradient={false}>
          {marqueeItems.map((item, index) => (
            <span key={index} className="mx-6 whitespace-nowrap flex items-center">
              <p className="text-base font-medium mr-2">{item.text}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Click Here
              </a>
            </span>
          ))}
        </Marquee>
      ) : (
        <p className="text-center text-gray-500">Loading marquee...</p>
      )}
    </div>
  );
};

export default DynamicMarquee;