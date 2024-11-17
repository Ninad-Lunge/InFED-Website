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
      {/* <!-- component --> */}
{/* <!-- component --> */}
<div class="relative flex flex-col items-center justify-center overflow-hidden ">
  <div class="relative mx-auto">
    <div class="group relative flex cursor-pointer after:shadow-lg after:shadow-black">
      {/* <!-- hidden slide --> */}
      <div class="relative -left-16 top-0 z-10 w-96 rounded-xl bg-[#F7A221] px-5 py-3 text-base font-semibold leading-7 transition-all duration-700 group-hover:-left-14">
        <div class="flex flex-col gap-4">
          {/* <!-- item 1 --> */}
          <div class="flex items-center gap-2">
            
            <div class="flex items-center gap-1 rounded-full bg-green-400/45 py-0.5 pl-1 pr-2">
              <p class="-rotate-90 leading-tight text-green-500">&rarr;</p>
              <p class="text-xs leading-tight text-white">10%</p>
            </div>
            <p class="text-white opacity-0 delay-200 duration-700 ease-in-out group-hover:opacity-100">1,300 Goals</p>
          </div>
          {/* <!-- item 2 --> */}
          <div class="flex items-center gap-2">
            
            <div class="flex items-center gap-1 rounded-full bg-green-400/45 py-0.5 pl-1 pr-2">
              <p class="-rotate-90 leading-tight text-green-500">&rarr;</p>
              <p class="text-xs leading-tight text-white">30%</p>
            </div>
            <p class="text-white opacity-0 delay-200 duration-700 ease-in-out group-hover:opacity-100">30 Records</p>
          </div>
          <p>
            <a href="https://tailwindcss.com/docs" class="text-sky-500 opacity-0 hover:text-sky-600">&rarr;</a>
          </p>
        </div>
      </div>
      {/* <!-- main --> */}
      <div class="absolute -right-16 top-0 z-20 flex w-96 flex-col gap-4 self-end border-dashed border-2 border-[#000]-900 rounded-xl rounded-l-2xl bg-[#FFFFFF] px-5 py-3 text-base font-semibold leading-7 transition-all duration-700 group-hover:-right-14 group-hover:w-64 group-hover:rounded-l-lg">
        <p class="text-[#000]">Achivements unlocked</p>
        <p class="text-[#000]">Records sold</p>
        <p>
          <a href="https://tailwindcss.com/docs" class="text-white/50">Learn more &rarr;</a>
        </p>
      </div>
      <div class="h-16 bg-[#3d348b] w-[28rem] -left-10 shadow-2xl shadow-[#3d348b] absolute bottom-0"></div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Objectives;
