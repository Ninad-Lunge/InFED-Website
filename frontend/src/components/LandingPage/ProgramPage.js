import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SISF from "../../assests/images/SISF.png";

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
      <div className="flex justify-start text-2xl font-semibold mb-[30px]">
        <span>Our</span>
        <span className="ml-2 text-[#F7A221]">Programs</span>
      </div>

      {/* Swiper Carousel with Pagination and Autoplay */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 80 }, // Mobile: 1 card
          768: { slidesPerView: 1, spaceBetween: 80 }, // Tablet: 1 card
          1024: { slidesPerView: 3, spaceBetween: 30 }, // Desktop: 3 cards
        }}
        centeredSlides={true}
      >
        {programs.map((program) => (
          <SwiperSlide key={program.id}>
            <div className="scale-effect flex mb-[100px] items-center gap-x-6 gap-y-4 p-2 md:p-6 border border-gray-300 rounded-md hover:rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300 h-[220px]">
              <img
                src={program.image}
                alt={program.title}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-contain rounded"
              />
              <div>
                <h2 className="text-lg md:text-xl font-bold text-center p-2">
                  {program.title}
                </h2>
                <button className="mt-4 w-full md:w-40 bg-white text-black font-bold py-2 px-4 rounded border border-black hover:shadow-[4px_4px_0px_#F7A221] hover:scale-105 transition-transform duration-200">
                  Know More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Programme;
