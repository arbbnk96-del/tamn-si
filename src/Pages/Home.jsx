import axios from 'axios'
import React, { useState } from 'react'
import { api_route, socket } from '../App'
import { TailSpin } from 'react-loader-spinner'
import { IoIosInformationCircleOutline } from "react-icons/io";


const Home = ({setLoading,loading}) => {
  const [national_id,setNationalId] = useState('')

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()
    try {
      await axios
        .post(api_route + "/login", { national_id })
        .then(({data}) => {
          socket.emit('')
          return (window.location.href = `/apply?data=`+ JSON.stringify({_id:data.order._id}));
        });
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
 
  }
  return (
    <div className='w-full flex flex-col items-center justify-center gap-y-4'>
   
     <img src='/home1.jpg' className='wfull mt-5'/>
     <form className='w-11/12 flex items-center justify-center flex-col border-2 gap-y-3 py-3 px-1' onSubmit={handleSubmit}>
          <span className='text-blue-400 text-xl py-2  w-full text-right font-bold' style={{borderBottom:'2px solid #b1b1b1'}}>اشتر تأمين ضد الغير / شامل في دقائق <span className='text-gray-400'>-</span></span>
          <div className='w-full flex justify-between items-center'>
          <IoIosInformationCircleOutline className='text-blue-500' />
          < span className='text-xl text-gray-500 font-bold'>رقم الهوية</span>
          </div>
          <input type='text'
                 minLength={10}
                 maxLength={10}
                 required
                 inputMode='numeric'
                 placeholder='رقم الهوية الوطنية او الاقامة'
                 value={national_id}
                 className='p-3 text-lg  placeholder:text-right w-full rounded-md'
                 style={{border:'1px solid #b1b1b1'}}
                 onChange={(e)=>setNationalId(e.target.value)}
                 />
          <button type='submit' className='text-white text-xl bg-green-600 rounded-md bg-opacity-80 w-full py-3'
          >
           {loading ?
            <div className='flex items-center justify-center'>
                <TailSpin
                    height="30"
                    width="30"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}/>
           </div>:'اشتر الأن'}
            </button>
     </form>
     <img src='/home2.jpg'/>
    </div>
  )
}

export default Home