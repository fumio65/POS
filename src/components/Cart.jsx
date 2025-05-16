import React, { useState } from 'react'

const initialCartItems = [
  { image: '/images/UN•UW Balloons.png', name: 'UN•UW Balloons', variation: '10" Green', quantity: 2, price: 250, total: 500, delete: '/icons/trash.svg' },
  { image: '/images/UN•UW Balloons.png', name: 'UN•UW Balloons', variation: '10" Green', quantity: 2, price: 250, total: 500, delete: '/icons/trash.svg' },
  { image: '/images/UN•UW Balloons.png', name: 'UN•UW Balloons', variation: '10" Green', quantity: 2, price: 250, total: 500, delete: '/icons/trash.svg' },
  { image: '/images/UN•UW Balloons.png', name: 'UN•UW Balloons', variation: '10" Green', quantity: 2, price: 250, total: 500, delete: '/icons/trash.svg' },

]

function Cart({ className = '' }) {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const handleQuantityChange = (index, delta) => {
    setCartItems(items =>
      items.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
              total: item.price * Math.max(1, item.quantity + delta),
            }
          : item
      )
    )
  }

  // Calculate dynamic totals
  const totalItems = cartItems.length
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.total, 0)

  return (
    <div
      style={{ gridArea: 'cart' }}
      className={`flex flex-col justify-between bg-white rounded-lg p-4 ${className}`}
    >
      <div>
        <div className='flex justify-between items-center pb-2'>
          <p className='font-bold text-xl'>New Order Bill</p>
          <span className='text-side-text text-sm font-bold'>Monday 5 may 2025</span>
        </div>
        <hr />
      </div>


      <div className='flex flex-col gap-2 min-h-[248px] max-h-[248px] overflow-y-auto'>
        {cartItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className='flex p-1'>
              <div className='flex flex-col gap-2 w-[240px] py-1'>
                <div className='flex'>
                  <img className='h-13' src={item.image} alt="item" />
                  <div className='flex flex-col gap-1'>
                    <p className='font-bold'>{item.name}</p>
                    <p className='text-sm text-side-text'>{item.variation}</p>
                  </div>
                </div>

                <div className='flex justify-center gap-1'>
                  <button
                    className='border-2 h-8 w-8 font-bold border-border rounded-md hover:bg-nav-hover transition duration-300 ease-in-out cursor-pointer'
                    onClick={() => handleQuantityChange(index, -1)}
                  >-</button>
                  <input
                    className='bg-[#ddd] w-16 text-center rounded-md focus:outline-none'
                    type="text"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    className='border-2 h-8 w-8 font-bold border-border rounded-md hover:bg-nav-hover transition duration-300 ease-in-out cursor-pointer'
                    onClick={() => handleQuantityChange(index, 1)}
                  >+</button>
                </div>
              </div>

              <div className='flex-grow flex flex-col items-center justify-between py-1'>
                <p className='font-bold text-xl'>{item.total}</p>
                <button className='border-2 border-border p-1 rounded-full hover:opacity-80 transition duration-300 cursor-pointer'>
                  <img className='h-6' src={item.delete} alt="delete" />
                </button>
              </div>
            </div>
            <hr className=" border-t border-gray-300 w-full" />
          </React.Fragment>
        ))}
      </div>

      <div className=' flex justify-between px-3'>
        <div>
          <p className='text-[1.5rem] font-bold'>Total</p>
          <p>Items: {totalItems}, Quantity {totalQuantity}</p>
        </div>
        <p className='text-[1.5rem] font-bold'>₱ {totalPrice}</p>
      </div>

      <button className='border-2 border-side-text py-4 text-side-text text-xl rounded-lg hover:bg-nav-hover transition duration-300 cursor-pointer'
      >Print Receipt
      </button>

      <button className='border-2 bg-button flex items-center justify-center py-4 text-white text-xl gap-2 rounded-lg hover:opacity-80 transition duration-300 cursor-pointer'>
        <img className='h-6'
         src="/icons/pay.svg" alt="wallet" />
        Payment
      </button>
    </div>
  )
}

export default Cart