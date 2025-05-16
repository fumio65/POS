import React from 'react'
import { Link } from 'react-router-dom'

export default function UserDropdown({ show, subMenuTeams, subMenuLinks }) {
  return (
    <div
      className={`
        absolute border-2 top-20 right-4 p-4 w-[320px] bg-white rounded-lg
        z-50 transition-all duration-300 ease-in-out
        ${show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
      style={{ zIndex: 50 }}
    >
      <div className='flex flex-col'>
        <div className='flex items-center pb-4 gap-2'>
          <img className='h-20 rounded-full' src="/images/Lhester.jpg" alt="" />
          <div>
            <h3 className='text-xl font-bold'>Lhester Tomenio</h3>
            <p>Owner</p>
          </div>
        </div>
        <hr />
        <div className='mb-2'>
          <p className='text-sm font-bold py-2'>Teams</p>
        </div>
        <div className='flex flex-col gap-2 max-h-[250px] overflow-y-auto'>
          {subMenuTeams.map((team, idx) => (
            <Link
              key={team.name}
              className={`flex items-center p-1 gap-2 hover:bg-nav-hover transition duration-300 ${idx === 0 ? "bg-active-user-menu" : ""}`}>
              <img className='h-10 rounded-full'
                src={team.profile} alt="profile" />
              <div>
                <h4 className='font-bold'>{team.name}</h4>
                <p>{team.role}</p>
              </div>
            </Link>
          ))}
        </div>
        <hr />
        {subMenuLinks.map((item, idx) => (
          <Link
            key={item.Label}
            className='flex flex-col p-1 mt-2 hover:bg-nav-hover transition duration-300'
            to={item.to}>
            <p className='font-bold'>{item.Label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}