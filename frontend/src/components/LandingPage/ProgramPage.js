import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import Swiper modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SISF from "../../assests/images/SISF.png"; // Update path if necessary

const programs = [
  { id: 1, title: "Startup India Seed Fund Scheme (SISF)", image: SISF },
  { id: 2, title: "Program 2", image: SISF },
  { id: 3, title: "Program 3", image: SISF },
  { id: 4, title: "Program 4", image: SISF },
  { id: 5, title: "Program 5", image: SISF },
];

const Programme = () => {
  return (
    <div className="mb-[60px] px-5 md:px-10 lg:px-20">
      <div className="flex justify-start text-2xl font-semibold mb-[50px]">
        <span>Our</span>
        <span className="ml-2 text-[#F7A221]">Programs</span>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        // breakpoints={{
        //   1920: { slidesPerView: 10, spaceBetween: 5 },
        //   1028: { slidesPerView: 2, spaceBetween: 2 },
        //   990: { slidesPerView: 1, spaceBetween: 0 },
        // }}
        loop={true}
      >
        {programs.map((program) => (
          <SwiperSlide key={program.id}>
            <div className="flex flex-col mb-[100px] items-center w-150 h-full p-8 gap-y-2 border border-gray-200 rounded-md hover:shadow-2xl hover:rounded-2xl cursor-pointer">
              <img
                src={program.image}
                alt={program.title}
                className="w-40 h-40 object-contain rounded"
              />
              <h2 className="text-lg font-bold">{program.title}</h2>
              <button className="border border-black px-4 py-1 rounded-md hover:bg-[#F7A221] hover:text-white hover:border-yellow-400">
                Know More
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Programme;
