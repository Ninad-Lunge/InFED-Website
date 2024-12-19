import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

const DynamicMarquee = () => {
  const [marqueeItems, setMarqueeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchMarqueeItems = async () => {
      try {
        const response = await fetch('https://infed-website-kkva.onrender.com/api/admin/marquee');
        const data = await response.json();
        setMarqueeItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching marquee items:', error);
        setError('Failed to load updates');
        setIsLoading(false);
      }
    };

    fetchMarqueeItems();
  }, []);

  return (
    <div className="grid grid-cols-12 shadow-sm border border-gray-200 rounded-md overflow-hidden">
      <div className="col-span-2 bg-customYellow-300 flex items-center">
        <div className="px-4 py-2 flex items-center">
          <div 
            className="relative flex items-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AlertCircle className="w-4 h-4 text-white" />
            <div className={`
              ml-2 
              transition-opacity duration-200 ease-in-out
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
              <p className="text-white font-semibold text-sm whitespace-nowrap">
                Ecosystem Updates
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-10 bg-gray-100">
        {isLoading ? (
          <div className="py-2 px-4">
            <div className="animate-pulse flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ) : error ? (
          <div className="py-2 px-4 text-red-500 text-sm">{error}</div>
        ) : (
          <div className="overflow-hidden py-2">
            <div className="animate-marquee whitespace-nowrap">
              {marqueeItems.map((item, index) => (
                <span key={index} className="inline-flex items-center mx-8">
                  <p className="text-sm font-medium text-gray-700">{item.text}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add custom animation
const style = document.createElement('style');
style.textContent = `
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
`;
document.head.appendChild(style);

export default DynamicMarquee;