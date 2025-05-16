import React from 'react'
import InputField from './InputField.jsx'
import { Link } from 'react-router-dom'

function Input() {
  return (
    <form action="" 
    className='flex flex-col gap-4'>
      <InputField 
      label="Username" 
      type="text" 
      placeholder="Username"
      icon="/icons/user.svg" />

      <InputField 
      label="Password" 
      type="password" 
      placeholder="Password"
      icon="/icons/lock.svg" />

      <Link className='text-sm font-bold text-active' to="/forgot-password">
        Forgot Password?
      </Link>
      <button className='bg-active text-white font-bold rounded-full h-[35px]  ' type="submit">Login</button>
      
    </form>
  )
}

export default Input
