import React from 'react'
import { IoIosShare } from "react-icons/io";
import { FaRegShareSquare } from "react-icons/fa";

function InfoSection({trip}) {
  return (
    <div>
      <img src='/placeholder.jpg' className='h=[100px] w-full object-cover rounded-xl'/>


      <div className='flex justify-between items-center'>
         <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'> 
             <h2 className = 'p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️{trip.userSelection?.noOfDays} Day</h2>
            <h2 className = 'p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md '>💸 {trip.userSelection?.budget} Budget </h2>
            <h2 className = 'p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 🎎 No of Travellers {trip.userSelection?.traveller} </h2>
        </div>
      </div>
      <button><FaRegShareSquare /></button>

    </div>
    </div>
  )
}

export default InfoSection
