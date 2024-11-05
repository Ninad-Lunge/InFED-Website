// ProgramGrid.js
import React from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick

// Sample data (Replace this with your actual cards or props if needed)
const programs = [
  { id: 1, title: 'Program 1', description: 'Description of Program 1' },
  { id: 2, title: 'Program 2', description: 'Description of Program 2' },
  { id: 3, title: 'Program 3', description: 'Description of Program 3' },
  { id: 4, title: 'Program 4', description: 'Description of Program 4' },
  { id: 5, title: 'Program 5', description: 'Description of Program 5' },
];

const ProgramGrid = () => {
  // Carousel settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides visible at once
    slidesToScroll: 1, // Scroll one slide at a time
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="program-grid">
      <Slider {...settings}>
        {programs.map((program) => (
          <div key={program.id} className="p-5">
            <div className="border rounded-lg shadow-lg p-5">
              <h3 className="text-xl font-semibold">{program.title}</h3>
              <p className="mt-2 text-gray-600">{program.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProgramGrid;
