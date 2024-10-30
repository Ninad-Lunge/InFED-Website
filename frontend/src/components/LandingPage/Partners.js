import React from 'react';
import partner from '../../assests/images/partners.png'; // Adjust the path if needed

const Partners = () => {
  return (
    <div className="mb-[80px] px-5 md:px-10 lg:px-20">
      <div className="flex justify-start text-2xl font-semibold mb-5">
        <span>Our</span>
        <span className="ml-2 text-[#F7A221]">Partners</span>
      </div>

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
