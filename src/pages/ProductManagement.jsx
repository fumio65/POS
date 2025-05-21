import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import AddForm from '../components/AddForm.jsx'
import Products from '../components/Products.jsx'

function Product() {
  return (
    <div className='relative bg-background h-screen flex flex-col'>
      <Navbar />
      <main
        className="grid flex-grow p-4 gap-4 h-full"
        style={{
          gridTemplateColumns: 'max-content 400px auto',
          gridTemplateRows: 'auto 1fr 1fr',
          gridTemplateAreas: `
            "sidebar add-form search-bar"
            "sidebar add-form product-grid"
            "sidebar add-form product-grid"
          `
        }}
      >
        <Sidebar />
        <SearchBar />
        <AddForm />
        <Products />
      </main>
    </div>
  )
}

export default Product
