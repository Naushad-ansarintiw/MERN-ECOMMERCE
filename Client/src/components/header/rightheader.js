import React, { useContext } from 'react'
import { Avatar, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import noteContext from '../../context/ProductData/noteContext'
import { NavLink } from 'react-router-dom';
import './rightheader.css'


const Rightheader = ({ onclose, logoutuser }) => {

    const context = useContext(noteContext);
    const { account } = context;

    return (
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {
                        account.carts ? <Avatar className='avtar2'>{account.fname[0].toUpperCase()}</Avatar> : <Avatar className='avtar' />
                    }
                </div>
                {account ? <h3>Helloo, {account.fname.toUpperCase()}</h3> : ""}
                <div className="nav_btn" onClick={() => { onclose() }}>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/'>Shop by category</NavLink>

                    <Divider style={{ width: '100%', marginleft: '-20px' }} />

                    <NavLink to='/'>Today's Deals</NavLink>
                    {
                        account ? <NavLink to='/buynow'>Your orders</NavLink> : <NavLink to='/login'>Your Orders</NavLink>
                    }

                    <Divider style={{ width: '100%', marginleft: '-20px' }} />

                    <div className="flag">
                        <NavLink to='/'>Settings</NavLink>
                        <img src="" alt="" />
                    </div>
                    {
                        account ?
                            <div className='flag'>
                                <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                                <h3 style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => { logoutuser() }}>Logout</h3>
                            </div> :
                            <NavLink className='flagNav' to={`/login`}>
                                Sign-In
                            </NavLink>
                    }
                </div>

            </div>
        </>
    )
}

export default Rightheader
