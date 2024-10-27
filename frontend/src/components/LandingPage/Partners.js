import React from 'react'
import partner from '../../assests/images/partners.png';

const Partners = () => {
  return (
    <div>
    <div className="mb-[80px] px-5 md:px-10 lg:px-20">
      <div className="flex justify-start text-2xl font-semibold">
        <span>Our</span>
        <span className="ml-2 text-[#F7A221]">Partners</span>
      </div>
    </div>

    <div className='flex flex-row'>
    <span className="flex flex-col items-start ml-[80px]">
  <img src={partner} alt="Partner Logo" className="w-[100px] h-auto mb-2" />
  <h1 className="font-semibold">ABC Company</h1>
    </span>

    <span className="flex flex-col items-start ml-[80px]">
  <img src={partner} alt="Partner Logo" className="w-[100px] h-auto mb-2" />
  <h1 className="font-semibold">ABC Company</h1>
    </span>

    <span className="flex flex-col items-start ml-[80px]">
  <img src={partner} alt="Partner Logo" className="w-[100px] h-auto mb-2" />
  <h1 className="font-semibold">ABC Company</h1>
    </span>

    <span className="flex flex-col items-start ml-[80px]">
  <img src={partner} alt="Partner Logo" className="w-[100px] h-auto mb-2" />
  <h1 className="font-semibold">ABC Company</h1>
    </span>
    </div>
    

    </div>
  )
}

export default Partners