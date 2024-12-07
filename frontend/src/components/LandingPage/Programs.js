import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Programme = () => {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("https://infed-website-kkva.onrender.com/api/get-schemes");
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleClick = (program) => {
    if (program && program._id) {
      navigate(`/scheme/${program._id}`);
    }
  };

  return (
    <div className="my-24 px-5 md:px-10 lg:px-20 relative">
      <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: {
              duration: 0.6
            }
          }}
          className="flex items-center text-2xl md:text-3xl font-bold mb-8"
        >
          <span className="text-gray-800">Our</span>
          <span className="ml-3 text-[#F7A221]">Programs</span>
      </motion.div>

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
          <SwiperSlide key={program.id} className="pt-2">
            <div className="scale-effect flex mb-[100px] items-center gap-x-6 gap-y-4 p-2 md:p-6 border border-gray-200 rounded-xl hover:rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300 h-[220px] hover:border-[#F7A221]">
              <img
                src={program.image}
                alt={program.name}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-contain rounded"
              />
              <div>
                <h2
                    className="text-base font-medium mb-1 text-center text-ellipsis"
                >
                    {program.name}
                </h2>
                <button
                  className="mt-4 w-32 bg-white text-black font-bold py-2 px-4 rounded border border-black hover:shadow-[4px_4px_0px_#F7A221] hover:scale-105 transition-transform duration-200"
                  onClick={() => handleClick(program)}
                >
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