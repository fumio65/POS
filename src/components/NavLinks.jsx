import React from 'react'
import { Link } from 'react-router-dom'

export default function NavLinks({ navLinks }) {
  return (
    <>
      {navLinks.map((link, idx) => (
        <Link className="flex gap-1 items-center"
          key={link.label} to={link.to}>
          <img className='h-5' src={link.icon} alt={link.label} />
          <p className={`text-sm font-bold pt-[0.2rem] ${idx === 0 ? "text-active" : "text-side-text"}`}>
            {link.label}
          </p>
        </Link>
      ))}
    </>
  )
}