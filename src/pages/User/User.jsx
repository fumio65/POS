import React from 'react'
import Carousel from '../../components/Carousel.jsx'
import UserPin from '../../components/UserPin.jsx'

function User() {
  return (
    <div className="bg-[url('/images/background.png')] bg-no-repeat bg-cover flex flex-col min-h-screen flex items-center justify-around">
      <Carousel />
      <UserPin />
    </div>
  )
}

export default User
