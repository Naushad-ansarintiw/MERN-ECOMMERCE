import Navbar from './components/header/Navbar.js';
import './components/header/Navbar.css'
import NewNavbar from './components/NewNavbar/newNavbar.js';
import './App.css'
import Maincomponent from './components/Home/Maincomponent.js';
import Footer from './components/footer/footer.js';
import SignUp from './components/signup_sign/SignUp.js';
import SignIn from './components/signup_sign/Sign_in.js';
import { Routes, Route } from "react-router-dom";
import Cart from './components/Cart/Cart.js';
import Buynow from './components/Buynow/Buynow.js';
import NoteState from './context/ProductData/NoteState.js';

function App() {


  return (
    <>
      <NoteState>
        <Routes>
          <Route path='/' element={<><Navbar /><NewNavbar /><Maincomponent /><Footer /></>} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/api/getproductsone/:id' element={<><Navbar /><NewNavbar /><Cart /><Footer /></>} />
          <Route path='/buynow' element={<><Navbar /><NewNavbar /><Buynow /><Footer /></>} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
