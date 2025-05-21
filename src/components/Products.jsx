import React, { useState } from 'react'
import ProductCard from './ProductCard'
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
        <ProductCard
          key={index}
          item={item}
          onClick={() => setSelectedProduct(item)}
        />
      ))}

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
