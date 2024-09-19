import React from 'react'

function Hotels({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5 '>Hotel Recommendations</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        {trip?.tripData?.hotels?.map((item,index)=>(
            <div>
               <img src="/placeholder.jpg" className='rounded-xl'/> 
            </div>
        ))}
      </div>
    </div>
  )
}

export default Hotels
