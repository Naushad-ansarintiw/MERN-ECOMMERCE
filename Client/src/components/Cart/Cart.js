import { Divider } from '@mui/material'
import React, { useEffect, useState , useContext } from 'react'
import noteContext from '../../context/ProductData/noteContext'
import { useParams } from 'react-router'
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


import './Cart.css'

const Cart = () => {

  const { id } = useParams('');
  // console.log(id);

  const [inddata, setInddata] = useState('');
  console.log(inddata);

// Using Context api
  const context = useContext(noteContext);
  const {setaccount} = context; // used to set the cart number dynamically


  // to Navigate a user after adding in cart
  const Navigate = useNavigate('');


  // Getting individual data from the backend
  const getindividualdata = async () => {
    const res = await fetch(`http://localhost:406/api/getproductsone/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    // console.log(data);
    if (res.status !== 201) {
      console.log('no data available');
    } else {
      console.log('getdata');
      setInddata(data);
    }
  }

  useEffect(() => {
    setTimeout(()=>{
     getindividualdata();
    },1000);
    // eslint-disable-next-line
  }, [id]);

  // add Cart function

  const addtocart = async(id)=>{
      const checkres = await fetch(`http://localhost:406/api/addcart/${id}`,{
        method: "POST",
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inddata
        }),
        credentials: 'include'
      });

      const data1 = await checkres.json();
      console.log(data1 + 'frontend data');

      if(checkres.status === 401 || !data1){
        alert('user invalid');
      }else {
        // alert('data added in your cart');
        Navigate('/buynow');
        setaccount(data1);
      }
  }

  return (
    <div className='cart_section'>
      {inddata && Object.keys(inddata).length &&
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.url} alt="cart_img" />
            <div className="cart_btn">
              <button className='cart_btn1' onClick={()=>{addtocart(inddata.id)}}>Add to Cart</button>
              <button className='cart_btn2'>Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className='mrp'>M.R.P. : ₹{inddata.price.mrp}</p>
            <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
            <p>You save : <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp - inddata.price.cost}.00 ({inddata.price.discount})`</span></p>
            <div className="discount_box">
              <h5>Discount : <span style={{ color: '#111' }}>{inddata.discount}</span></h5>
              <h4>Free Delivery <span style={{ color: "#111", fontWeight: 600 }}>Oct 8 - 21 </span>Details</h4>
              <p>Fastest delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span></p>
              <div className="description">About the Item : <span style={{ color: '#565959', fontSize: 14, fontWeight: 500, letterSpacing: 0.4 }}>{inddata.description}</span></div>
            </div>
          </div>
        </div>
      }

      {
        (!inddata) ? (
          <div className="circle">
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        ) : ''
      }
    </div>
  )
}

export default Cart
