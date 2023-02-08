import React, { useState } from 'react'
import './common_SignUp_singin.css';
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Sign_in = () => {

  const Navigate = useNavigate('');
  const [logdata,setData] = useState({
    email: '',
    password: ''
  });
console.log(logdata);
  const addData = (e)=>{
       const {name,value} = e.target;
      setData(()=>{
         return {
           ...logdata,
           [name]: value
          }
        })
  }

  const sendData = async(e)=>{
    e.preventDefault();
    const {email,password} = logdata;
    const res = await fetch('http://localhost:406/api/login', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    console.log(data)

    if(res.status === 400 || !data){
      console.log('Invalid details');
      toast.warn('invalid details', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }else{
      console.log('Data valid');
      // toast.success('user valid', {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // })
      setData({...logdata,email:"",password:""});
      Navigate('/');
    }
  }


  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <Link to='/'><img src="https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/blacklogoamazon.png" alt="amazonlogo" /></Link>
          </div>
          <div className="sign_form">
            <form method='POST'>
              <h1>Sign_In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input type="text" name='email' id='email'placeholder='Enter your Email' value={logdata.email} onChange={addData}/>
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='At lease 6 char' id='password' value={logdata.password} onChange={addData}/>
              </div>
              <button className='signin_btn' onClick={sendData}>Continue</button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New to Amazon?</p>
            <Link to='/register'><button>Create Your amazon account</button></Link>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Sign_in
