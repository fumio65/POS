import React from 'react'
import { Link } from 'react-router-dom'

export default function NotificationDropdown({ show, lotStock, noStock }) {
  return (
    <div
      className={`
        border-2 absolute top-20 right-69 bg-white rounded-lg w-[350px] z-50
        transition-all duration-300 ease-in-out
        ${show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
      style={{ zIndex: 50 }}
    >
      <div>
        <h2 className='font-bold px-2 py-1'>Notifications</h2>
      </div>
      <div className='flex items-center gap-2 bg-[#ddd] px-2 py-1'>
        <img className='h-6 p-1 rounded-full bg-low-stock'
          src="/icons/notification-black.svg" alt="low-stock" />
        <h3 className='text-sm font-bold'>Low Stock</h3>
      </div>
      {lotStock.map((item, idx) => (
        <Link className='flex items-center p-1 opacity-100 hover:opacity-50 transition duration-500 ease-in-out transform hover:scale-101' to={item.to} key={idx}>
          <img
            className='h-14'
            src={item.image}
            alt="product"
          />
          <div>
            <p className='text-[0.7rem] font-bold'>{item.content}</p>
            <span className='text-side-text text-[0.7rem] font-bold'>{item.time}</span>
          </div>
        </Link>
      ))}
      <div className='flex items-center gap-2 bg-[#ddd] px-2 py-1'>
        <img className='h-6 p-1 rounded-full bg-no-stock'
          src="/icons/notification-black.svg" alt="low-stock" />
        <h3 className='text-sm font-bold'>No Stock</h3>
      </div>
      {noStock.map((item, idx) => (
        <Link className='flex items-center p-1 opacity-100 hover:opacity-50 transition duration-300 ease-in-out transform hover:scale-101'
         to={item.to} key={idx}>
          <img
            className='h-14'
            src={item.image}
            alt="product"
          />
          <div>
            <p className='text-[0.7rem] font-bold'>{item.content}</p>
            <span className='text-side-text text-[0.7rem] font-bold'>{item.time}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}