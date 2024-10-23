import React from 'react'
import CountUp from 'react-countup';

const Statistics = () => {
  return (
    <div> 
      <div className="flex flex-row justify-between mt-[200px]">
        <div className="ml-[120px]">
          <h1 className="text-4xl font-bold text-[#F7A221]">
            <CountUp end={51} duration={2.5} />+
          </h1>
          <h3 className="text-xl">Enterprises</h3>
        </div>
        <div className="ml-[120px]">
          <h1 className="text-4xl font-bold text-[#F7A221]">
            <CountUp end={20} separator="," duration={3} />
            M
          </h1>
          <h3 className="text-xl">Lives Impacted</h3>
        </div>
        <div className="ml-[120px] ">
          <h1 className="text-4xl font-bold text-[#F7A221]">
            <CountUp end={8000} separator="," duration={3.5} />
            {/* + */}
          </h1>
          <h3 className="text-xl">Jobs Created</h3>
        </div>
        <div className="ml-[120px] mr-[120px]">
          <h1 className="text-4xl font-bold text-[#F7A221]">
            <CountUp end={5.8} separator="," duration={3} />
            M
          </h1>
          <h3 className="text-xl">Seed Funding (INR)</h3>
        </div>
      </div>  
    </div>
  )
}

export default Statistics