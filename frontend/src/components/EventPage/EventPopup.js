import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const EventPopup = ({ event, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.isArray(event.image) ? event.image : [event.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full relative shadow-[8px_4px_0px_0px_#F7A221]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10 hover:scale-110 transition-transform duration-200"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#F7A221' }}>{event.name}</h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Carousel */}
            <div className="relative w-full md:w-1/2">
              <img
                src={images[currentImageIndex]}
                alt={event.name}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:shadow-[4px_4px_0px_#F7A221] transition-all duration-200"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:shadow-[4px_4px_0px_#F7A221] transition-all duration-200"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentImageIndex
                            ? 'bg-[#F7A221]'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 text-left">
              <div className="prose max-w-none">
                <div className="mb-6">
                  <p className="text-gray-700">{event.description}</p>
                </div>

                <div className="space-y-2">
                  <h5 className="text-gray-500">{formattedDate}</h5>
                  <h5 className="text-gray-500">{event.mode} - {event.venue}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;