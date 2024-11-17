import React from "react";
// import image from '../../assests/images/image.png';
// import image1 from '../../assests/images/image-1.png';
// import image2 from '../../assests/images/image-2.png';
// import image3 from '../../assests/images/image-3.png';
// import image4 from '../../assests/images/image-4.png';
// import image5 from '../../assests/images/image-5.png';
import IIMNimg from "../../assests/images/IIMN.png";

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
        We give <span className="text-[#F7A221] font-bold">Everything</span> it
        takes.
      </div>

      {/* Description Section */}
      <div className="mt-[50px] text-base md:text-lg lg:text-xl mx-5 md:mx-32 lg:mx-[250px] mb-[80px] text-center">
        Mentoring entrepreneurs with incubation support, providing essential
        techno-business services, and empowering the startup ecosystem through
        research and education.
      </div>

      {/* Cards Section */}
      {/* <!-- component --> */}
      <div class="relative flex flex-col items-center justify-center overflow-hidden ">
        <div class="relative mx-auto">
          <div class="group relative flex cursor-pointer after:shadow-lg after:shadow-black">
            {/* <!-- hidden slide --> */}
            <div class="relative -left-10 top-0 z-10 w-96 h-72 rounded-xl bg-[#F7A221] text-base font-semibold leading-7 transition-all duration-700 group-hover:-left-32 group-hover:bg-white group-hover:border-2 border-[#F7A221]">
              <div class="flex flex-col gap-4">
                {/* <!-- item 1 --> */}
                <div class="flex items-center gap-2">
                  <div class="flex flex-col items-center rounded-xl justify-center gap-1 w-10 h-72 ">
                    <p class="text-l font-bold text-white transform -rotate-90 w-60 group-hover:text-[#F7A221]">
                      CURATED MENTORING
                    </p>
                  </div>
                  <p class="text-white opacity-0 delay-200 duration-700 ease-in-out group-hover:opacity-100 w-44 group-hover:text-black">
                  Curated mentoring tailored to empower entrepreneurs through personalized guidance, expertise sharing, and growth-oriented strategies for impactful success.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- image --> */}
            <div class="absolute -right-20 top-0 z-20 flex w-96 h-72 flex-col gap-4 self-end border-dashed border-2 border-[#000]-900 rounded-xl rounded-l-2xl bg-[#FFFFFF] text-base font-semibold leading-7 transition-all duration-700 group-hover:-right-14 group-hover:w-80 group-hover:rounded-l-lg overflow-hidden">
              <div class="w-full h-full">
                <img
                  src={IIMNimg}
                  class="w-full h-full object-cover rounded-xl rounded-l-2xl"
                  alt="IIMN"
                />
              </div>
            </div>
            <div class="h-16 bg-[#FFFFF] w-[28rem] -left-10 absolute bottom-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
