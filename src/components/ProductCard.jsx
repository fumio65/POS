import React from 'react'

const ProductCard = React.memo(({ item, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='flex flex-col items-center justify-center bg-white p-2 rounded-lg opacity-100 hover:opacity-70 transition duration-300 ease-in-out cursor-pointer transform hover:scale-101'
    >
      <img className='h-55' src={item.image} alt={item.name} loading="lazy" />
      <div className='flex flex-col w-full gap-4'>
        <p className='text-xl text-start font-bold'>{item.name}</p>
        <div className='flex items-center justify-between px-2'>
          <p className='text-lg font-bold'>{item.price}</p>
          <p className='text-md text-side-text'>{item.quantity} left</p>
        </div>
      </div>
    </button>
  )
})

export default ProductCard
