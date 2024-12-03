import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import IIMNing from '../../assests/images/IIMN.png';

const CarouselCard = ({ isVisible, title, desc, image }) => {
  return (
    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative flex flex-col items-center justify-center overflow-hidden">
        <div className="relative mx-auto">
          <div className="group relative flex cursor-pointer after:shadow-lg after:shadow-black">
            <div className="relative -left-10 top-0 z-10 w-96 h-72 rounded-xl bg-[#F7A221] text-base font-semibold leading-7 transition-all duration-700 group-hover:-left-32 group-hover:bg-white group-hover:border-2 border-[#F7A221]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center rounded-xl justify-center gap-1 w-10 h-72">
                    <p className="text-l font-bold text-white transform -rotate-90 w-60 group-hover:text-[#F7A221]">
                      {title}
                    </p>
                  </div>
                  <p className="text-white opacity-0 delay-200 duration-700 ease-in-out group-hover:opacity-100 w-44 group-hover:text-black">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 top-0 z-20 flex w-96 h-72 flex-col gap-4 self-end border-dashed border-2 border-black rounded-xl rounded-l-2xl bg-white text-base font-semibold leading-7 transition-all duration-700 group-hover:-right-14 group-hover:w-80 group-hover:rounded-l-lg overflow-hidden">
              <div className="w-full h-full">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover rounded-xl rounded-l-2xl"
                />
              </div>
            </div>
            <div className="h-16 bg-white w-96 -left-10 absolute bottom-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const cards = [
    { id: 1, title: "CURATED MENTORING", desc: "Curated mentoring tailored to empower entrepreneurs through personalized guidance, expertise sharing, and growth-oriented strategies for impactful success.", image: IIMNing},
    { id: 2, title: "MARKET LINKAGES", desc: "Curated mentoring tailored to empower entrepreneurs through personalized guidance, expertise sharing, and growth-oriented strategies for impactful success.", image: IIMNing },
    { id: 3, title: "NETWORKING OPPORTUNITIES", desc: "Curated mentoring tailored to empower entrepreneurs through personalized guidance, expertise sharing, and growth-oriented strategies for impactful success.", image: IIMNing},
    { id: 4, title: "STARTUP-SCALEUP SUPPORT", desc: "Curated mentoring tailored to empower entrepreneurs through personalized guidance, expertise sharing, and growth-oriented strategies for impactful success.", image: IIMNing},
    { id: 5, title: "PAID PILOT OPPORTUNITY", desc: "Curated mentoring tailored to empower entrepreneurs through personalized guidance, expertise sharing, and growth-oriented strategies for impactful success.", image: IIMNing},
    { id: 6, title: "FUNDING OPPORTUNITIES", desc: "Curated mentoring tailored to empower entrepreneurs through personalized guidance, expertise sharing, and growth-oriented strategies for impactful success.", image: IIMNing},
  ];

  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, cards.length]);

  const nextSlide = () => {
    setIsAutoScrolling(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setIsAutoScrolling(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const getSlideStyles = (index) => {
    const position = index - currentIndex;
    const zIndex = position === 0 ? 20 : 10;

    // Base transform for slides
    let transform = 'translateX(100%)';
    let opacity = '0';

    if (position === 0) {
      transform = 'translateX(0)';
      opacity = '1';
    } else if (position === -1 || (position === cards.length - 1 && currentIndex === 0)) {
      transform = 'translateX(-100%)';
      opacity = '0';
    }

    return {
      transform,
      opacity,
      zIndex,
      transition: 'all 0.5s ease-in-out',
      position: 'absolute',
      width: '100%',
    };
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden relative">
        <div className="relative w-full h-96">
          {cards.map((card, index) => (
            <div
              key={card.id}
              style={getSlideStyles(index)}
            >
              <CarouselCard 
                isVisible={index === currentIndex}
                title={card.title}
                desc={card.desc}
                image={card.image}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all z-30"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all z-30"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-[#F7A221] w-4' : 'bg-gray-300'
            }`}
            onClick={() => {
              setIsAutoScrolling(true);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;