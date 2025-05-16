import React, { useState } from 'react'

function ProductSelection({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  return (
    <div className='absolute bg-white p-12 rounded-lg w-[1000px] h-[560px] bottom-10 left-60 z-50 shadow-lg'>
      <div className='flex relative'>
        <img className='h-110' src={product.image} alt="product" />

        <div className='flex flex-col justify-around'>
          <div className='flex flex-col gap-4'>
            <p className='text-3xl font-bold'>{product.name}</p>
            <p className='text-2xl font-bold'>{product.price}</p>
          </div>

          {/* Color selection */}
          <div className='flex flex-col gap-1'>
            <p className='font-bold'>Color:</p>
            <div className='flex flex-wrap gap-2'>
              {product.color.map((color, idx) => (
                <button
                  key={idx}
                  className={`border-2 rounded-full p-1 text-xs font-bold
                  ${selectedColor === color ? 'bg-nav-active' : 'hover:bg-nav-hover transition duration-300 cursor-pointer'}`}
                  onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Type and Size */}
          <div className='flex gap-12'>
            <div className='flex flex-col gap-1'>
              <p className='font-bold'>Type:</p>
              <div className='flex gap-2'>
                {product.type.map((type, idx) => (
                  <button
                    key={idx}
                    className={`border-2 rounded-full p-1 text-xs font-bold
                      ${selectedType === type ? 'bg-nav-active' : 'hover:bg-nav-hover transition duration-300 cursor-pointer'}`}
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <p className='font-bold'>Size:</p>
              <div className='flex gap-2'>
                {product.size.map((size, idx) => (
                  <button
                    key={idx}
                    className={`border-2 rounded-md p-1 text-xs font-bold
                      ${selectedSize === size ? 'bg-nav-active' : 'hover:bg-nav-hover transition duration-300 cursor-pointer'}`}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className='flex gap-1'>
            <button
              className='border-2 border-border bg-white h-8 w-8 rounded-md hover:bg-nav-hover transition duration-300 cursor-pointer'
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            >
              -
            </button>
            <input
              className='bg-[#ddd] h-8 w-14 rounded-md text-center focus:outline-none'
              type="text"
              value={quantity}
              readOnly
            />
            <button
              className='border-2 border-border bg-white h-8 w-8 rounded-md hover:bg-nav-hover transition duration-300 cursor-pointer'
              onClick={() => setQuantity(prev => prev + 1)}
            >
              +
            </button>
          </div>

          <button className='border-2 bg-button text-white text-lg font-bold p-3 rounded-lg hover:opacity-80 transition duration-300 cursor-pointer'>
            Add To Cart
          </button>
        </div>

        <button
          onClick={onClose}
          className='absolute bottom-[420px] border-2 rounded-xl hover:transition duration-300 cursor-pointer p-1'
        >
          <img
            className='h-10 hover:opacity-70 transition duration-300'
            src="/icons/return.svg"
            alt="close"
          />
        </button>
      </div>
    </div>
  )
}

export default ProductSelection
