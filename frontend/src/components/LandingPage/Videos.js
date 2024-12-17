import React from 'react';
import { motion } from 'framer-motion';

const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 w-full h-[300px]">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const Videos = () => {
  const videoIds = [
    'heFYALTj1NE',
    'Fjnk1JGebpk',
    'ZRMR9uTrvoU',
  ];

  return (
    <div className="px-5 md:px-10 lg:px-20">
      <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: {
              duration: 0.6
            }
          }}
          className="flex items-center text-2xl md:text-3xl font-bold mb-16"
        >
          <span className="text-gray-800">Media</span>
          <span className="ml-3 text-[#F7A221]">Coverage</span>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videoIds.map((id, index) => (
          <YouTubeEmbed key={index} videoId={id} />
        ))}
      </div>
    </div>
  );
};

export default Videos;