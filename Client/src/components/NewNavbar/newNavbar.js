import React from 'react'
import './newNavbar.css'

const newNavbar = () => {
  return (
    <div className='new_nav'>
      <div className="nav_data">
        <div className="left_data">
            <p>All</p>
            <p>Sell</p>
            <p>Mobile</p>
            <p>Bestseller</p>
            <p>Fashion</p>
            <p>Customer Services</p>
            <p>Electronics</p>
            <p>Prime</p>
            <p>Today's deal</p>
            <p>Amazon Pay</p>
        </div>
        <div className="right_data">
            <img src="https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/nav.jpg" alt="amazon prime" />
        </div>
      </div>
    </div>
  )
}

export default newNavbar
