import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignUp = () => {
  const [udata, setUdata] = useState({
    fname: '',
    email: '',
    number: '',
    password: '',
    cpassword: ''
  });

  const addData = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...udata,
        [name]: value
      }
    })

  }

  const sendData = async (e) => {
    e.preventDefault();
    const { fname, email, number, password, cpassword } = udata;
    const res = await fetch('http://localhost:406/api/register', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ fname, email, number, password, cpassword })
    });
    const data = await res.json();
    // console.log(data);
    if (res.status === 422 || !data) {
      // alert('no data');
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

    } else {
      // alert('data successfully add');
      toast.success('data successfully added', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })

      setUdata({ ...udata, fname: "", email: "", number: "", password: "", cpassword: "" });
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
              <h1>Create Account</h1>
              <div className="form_data">
                <label htmlFor="fname">Your name</label>
                <input type="text" name='fname' id='fname' onChange={addData} value={udata.fname} placeholder='Enter your Name' />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input type="text" name='email' id='email' onChange={addData} value={udata.email} />
              </div>
              <div className="form_data">
                <label htmlFor="number">Mobile number</label>
                <input type="text" name='number' id='number' onChange={addData} value={udata.number} placeholder='Enter your number' />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' onChange={addData} value={udata.password} placeholder='At lease 6 characters' id='password' />
              </div>
              <div className="form_data">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" name='cpassword' id='cpassword' onChange={addData} value={udata.cpassword} />
              </div>
              <button className='signin_btn' onClick={sendData}>Continue</button>
              <div className="signin_info">
                <p>Already have an account?</p>
                <Link to='/login'>Signin</Link>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp
