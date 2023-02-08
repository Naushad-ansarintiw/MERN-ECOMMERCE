import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Badge } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './rightheader.js'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noteContext from '../../context/ProductData/noteContext'


function Navbar() {

  // Using Context api
  const context = useContext(noteContext);
  const { products,account, setaccount } = context; // used to set the cart number dynamically

  console.log(account);

  // for Navigation purpose 

  const Navigate = useNavigate();

  // for setting a avatar to open a menu bar 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text,setText] = useState('');
  const [liopen,setLiopen] = useState(true);
  //  for opening the drawer

  const [dropen, setDropen] = useState(false);



  // Validate the user to open first time the website

  const getdetailvaliduser = async () => {
    const res = await fetch('http://localhost:406/api/validuser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log('error');
    } else {
      console.log('data valid');
      setaccount(data);
    }
  };

  // log out the user by /logout api

  const logoutUser = async () => {
    console.log("clicking");
    const res2 = await fetch('http://localhost:406/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    console.log(res2);

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status !== 201) {
      console.log('error');
    } else {
      console.log('data valid');
      // alert('User logout Succcesfully');
      toast.success('User logout', {
        position: "top-center",
      })
      setaccount(false);
      Navigate('/');
      setDropen(false);
    }
  };


  // to openig the hamburger

  const handleopen = () => {
    setDropen(true);
  }

  // to closing the hamburger

  const handledrclose = () => {
    setDropen(false);
  }


  // Using for Showing the list in the search bar

  const getText = (item) => {
        setText(item);
        setLiopen(false);
  }

  // handle list closing and opening and set the text in search bar 

  const handleListANDText = (product)=>{
      // handle list 
      setLiopen(true);
      
      // Now handling the search bar text 

      setText(product.title.longTitle);

  }


  useEffect(() => {
    getdetailvaliduser();
    // eslint-disable-next-line
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className='hamburgur' onClick={handleopen}>
            <MenuIcon style={{ color: 'white' }} />
          </IconButton>
          {/* Drawer use kiya 800px se kam hote hi left side me drawer aa gayga */}
          <Drawer open={dropen}>
            <Rightheader onclose={handledrclose} logoutuser={logoutUser}/>
          </Drawer>
          <div className="navlogo">
            <Link to='/'><img src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="Logo" /></Link>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name="" id="" placeholder='Search your Products' onChange={(e)=>getText(e.target.value)} value={text}/>
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* Search filter */}
            {
              text && 
              <List className='extrasearch' hidden={liopen}>
                     {
                      products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map((product) => { return (
                        <ListItem>
                        <NavLink to={`/api/getproductsone/${product.id}`} onClick={()=>{handleListANDText(product)}}>
                          {product.title.longTitle}
                        </NavLink>
                        </ListItem>
                      )})
                     }
              </List>
            }
            
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <Link to="/login">signin</Link>
          </div>
          <div className="cart_btn">

            {/* If user is not login and then */}
            {
              account ? <Link to={'/buynow'}>
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </Link> : <Link to={'/login'}>
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </Link>
            }

            <ToastContainer />

            <p>Cart</p>
          </div>
          {
            account.carts ? <Avatar className='avtar2'
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >{account.fname[0].toUpperCase()}</Avatar> :
              <Avatar className='avtar'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} />
          }

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ? <MenuItem onClink={handleClose} onClick={logoutUser} ><LogoutIcon style={{fontSize: 16,marginRight: 3}}/>Logout</MenuItem> :""
            }
          </Menu>
        </div>
      </nav>
    </header>
  )
}

export default Navbar



// account.carts.length