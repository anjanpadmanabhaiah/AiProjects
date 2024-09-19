import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1
        className = 'font-extrabold text-[30px] text-center mt-10'>
        Plan Your Next Adventure with <span className ='text-[#f56551]'>SAVARI AI </span><br></br>A friend to plan your next adventure</h1>
    <p className='text-xl text-gray-500 text-center'>With SAVARI AI, you’ll have a well-organized itinerary that ensures you never miss out on the best experiences during your trip.

    </p>
    <Link to={'/create-trip'}>
    <Button>Get started,It's Free</Button>
    </Link>
    </div>
  )
}

export default Hero
