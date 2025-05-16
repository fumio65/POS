import React from 'react'
import Input from './Input.jsx'


function InputForm() {
  return (
    <>

      <div className="flex-grow flex-col bg-[url('/images/background.png')] bg-no-repeat bg-cover rounded-lg w-900">

      </div>

      <div className='rounded-lg flex-grow flex flex-col gap-14 w-full py-[32px] px-[90px] mr-8'>
        <div className='flex justify-center gap-2'>
          <img className='w-[75px] h-[75px] rounded-full' src="../../../../public/images/Logo.png" 
          alt="Logo" />
          <h1 className='font-bold text-sm self-center'
          >Magsohongnon Balloons & Flowershop</h1>
        </div>

        <div className='flex flex-col gap-8'>
          <div>
            <h2 className='text-center text-[24px] font-bold'>Login form</h2>
            <p className="text-center text-[10px] text-side-text">Please enter your login credentials to access the system.</p>
          </div>
          <Input />
        </div>

      </div>
    </>
    


    
  )
}

export default InputForm
