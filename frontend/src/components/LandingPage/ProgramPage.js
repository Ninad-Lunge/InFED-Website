import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import Swiper modules
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
    <div className="mb-[80px] px-5 md:px-10 lg:px-20 relative">
      {/* Title Section */}
      <div className="flex justify-start text-2xl md:text-3xl font-semibold mb-[30px]">
        <span>Our</span>
        <span className="ml-2 text-[#F7A221]">Programs</span>
      </div>

      {/* Swiper Carousel with Navigation */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 80 }, // Mobile: 1 card
          768: { slidesPerView: 1, spaceBetween: 80 }, // Tablet: 1 card
          1024: { slidesPerView: 3, spaceBetween: 30 }, // Desktop: 3 cards
        }}
      >
        {programs.map((program) => (
          <SwiperSlide key={program.id}>
            <div className="flex flex-col mb-[100px] items-center gap-y-4 p-2  md:p-6 border border-gray-300 rounded-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={program.image}
                alt={program.title}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-contain rounded"
              />
              <h2 className="text-lg md:text-xl font-bold text-center p-2">
                {program.title}
              </h2>
              <button className="border border-black px-6 py-2 rounded-md hover:bg-[#F7A221] hover:text-white hover:border-white transition-colors">
                Know More
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <div className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 text-2xl text-black hover:text-[#F7A221] cursor-pointer z-10">
        ❮
      </div>
      <div className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-black hover:text-[#F7A221] cursor-pointer z-10">
        ❯
      </div>
    </div>
  );
};

export default Programme;
