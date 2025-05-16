import React from 'react'
import './SearchBar.css' 

function SearchBar({ className = '' }) {
  return (
    <div
      style={{ gridArea: 'search-bar' }}
      className={`bg-white p-2 rounded-lg ${className}`}
    >
      <div className='bg-white flex items-center p-1 gap-2 rounded-lg'>
        <img className='h-5' src="/icons/search.svg" alt="" />
        <input
          className='flex-grow focus:outline-none remove-clear'
          type="search"
          placeholder='Search product'
        />
      </div>
    </div>
  )
}

export default SearchBar
