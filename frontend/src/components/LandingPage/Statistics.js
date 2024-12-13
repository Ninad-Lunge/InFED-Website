import React from 'react';
import CountUp from 'react-countup';

const Statistics = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-x-16 my-14 md:mx-20">
      {/* Enterprises */}
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#F7A221]">
          <CountUp end={600} duration={3} />+
        </h1>
        <h3 className="text-lg md:text-xl">Enterprises</h3>
      </div>

      {/* Lives Impacted */}
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#F7A221]">
          <CountUp end={67} separator="," duration={3} />%
        </h1>
        <h3 className="text-lg md:text-xl">Women-Led Businesses</h3>
      </div>

      {/* Jobs Created */}
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#F7A221]">
          <CountUp end={5500} separator="," duration={3} />+
        </h1> 
        <h3 className="text-lg md:text-xl">Jobs Created</h3>
      </div>

      {/* Seed Funding */}
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#F7A221]">
          <CountUp end={32} separator="," duration={4} />Cr+
        </h1>
        <h3 className="text-lg md:text-xl">Follow-on Funding (INR)</h3>
      </div>
    </div>
  );
};

export default Statistics;