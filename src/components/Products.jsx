import React, { useState } from 'react'
import ProductSelection from './ProductSelection'

const productGrid = [
  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },
  
  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },
  
  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },

  {
    image: '/images/UN•UW Balloons.png',
    name: 'UN•UW Balloons',
    price: '₱ 250',
    quantity: 10,
    color: ['Gold', 'Red', 'Blue', 'Sky Blue', 'Violet', 'Yellow', 'White', 'Green', 'Pastel Blue', 'Pastel Pink', 'Pastel Violet', 'Pastel Yellow'],
    type: ['Metallic', 'Chrome'],
    size: ['5"', '6"', '10"', '12"']
  },
]

function Products({ className = '' }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div
      style={{
        gridArea: 'product-grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
      }}
      className={`rounded-lg grid gap-4 max-h-[550px] overflow-auto scrollbar-hide ${className}`}
    >
      {productGrid.map((item, index) => (
        <button
          key={index}
          onClick={() => setSelectedProduct(item)}
          className='flex flex-col items-center justify-center bg-white p-2 rounded-lg opacity-100 hover:opacity-70 transition duration-300 ease-in-out cursor-pointer transform hover:scale-101'
        >
          <img className='h-55' src={item.image} alt="item" />
          <div className='flex flex-col w-full gap-4'>
            <p className='text-xl text-start font-bold'>{item.name}</p>
            <div className='flex items-center justify-between px-2'>
              <p className='text-lg font-bold'>{item.price}</p>
              <p className='text-md text-side-text'>{item.quantity} left</p>
            </div>
          </div>
        </button>
      ))}

      {/* Render the product selection modal */}
      {selectedProduct && (
        <ProductSelection
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default Products
