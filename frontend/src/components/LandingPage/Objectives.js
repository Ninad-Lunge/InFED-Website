import React from 'react';
import image from '../../assests/images/image.png';
import image1 from '../../assests/images/image-1.png';
import image2 from '../../assests/images/image-2.png';
import image3 from '../../assests/images/image-3.png';
import image4 from '../../assests/images/image-4.png';
import image5 from '../../assests/images/image-5.png';

const Objectives = () => {
  return (
    <div className="mb-[120px] px-5 md:px-10 lg:px-20">
      {/* Title Section */}
      <div className="flex justify-start text-2xl font-semibold">
        <span>Our</span>
        <span className="ml-2 text-[#F7A221]">Objectives</span>
      </div>

      {/* Subtitle Section */}
      <div className="mt-[30px] text-lg md:text-xl">
        We give <span className="text-[#F7A221] font-bold">Everything</span> it takes.
      </div>

      {/* Description Section */}
      <div className="mt-[50px] text-base md:text-lg lg:text-xl mx-5 md:mx-32 lg:mx-[250px] mb-[80px] text-center">
        Mentoring entrepreneurs with incubation support, providing essential techno-business services, 
        and empowering the startup ecosystem through research and education.
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[50px] mt-10 px-5 md:px-10 lg:px-20">
        {[
          { img: image, text: 'Curated\nMentoring' },
          { img: image1, text: 'Market\nLinkages' },
          { img: image2, text: 'Networking\nOpportunities' },
          { img: image3, text: 'Startup-Scaleup\nSupport' },
          { img: image4, text: 'Paid Pilot\nOpportunity' },
          { img: image5, text: 'Funding\nOpportunities' },
        ].map(({ img, text }, index) => (
          <div
            key={index}
            className="group flex flex-col items-center space-y-2 p-5 border border-black rounded-md transition-transform duration-300 ease-in-out hover:shadow-[10px_10px_0px_#F7A221] hover:scale-105 hover:border-black"
          >
            <img
              src={img}
              alt=""
              className="w-[80px] md:w-[100px] h-auto object-cover"
            />
            <h1 className="font-semibold text-center whitespace-pre-line">
              {text}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Objectives;
