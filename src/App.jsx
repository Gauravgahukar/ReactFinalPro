import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Home from './Home.jsx';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Cart from './Cart';
import Orders from './Orders';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Dairy from './Dairy.jsx';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './NotFound.jsx';
import SignIn from './SignIn.jsx';
import { logout } from './store.js'; 
import { useEffect } from 'react';

import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {

  const cart = useSelector(state => state.cart || []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const dispatch = useDispatch();
 
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user); 
  
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      dispatch(logout()); 
    }
  }, [dispatch]);
  

  return (
    <>
      <BrowserRouter>
        <div className='nav'>
           <span className="cropix-text">Cropix<span style={{fontSize:"0.73cm"}}>.in</span></span>
          <div className='bor'>
          <Link to='/home' className='links'><i class="fa-solid fa-house"></i>Home</Link>
          <Link to='/veg' className='links'><i class="fa-solid fa-pepper-hot"></i>Veg-Items</Link>
          <Link to='/nonVeg' className='links'><i class="fa-solid fa-drumstick-bite"></i>NonVeg-Items</Link>
          <Link to='/dairy' className='links'><i class="fa-solid fa-cow"></i>Dairy-Items</Link>
          <Link to='/cart' className='links'><i class="fa-solid fa-cart-shopping"></i>Cart <span className='cart-items'>{totalItems}</span></Link>
          <Link to='/orders' className='links'><i class="fa-brands fa-shopify"></i>Orders</Link>
          <Link to='/aboutUs' className='links'><i class="fa-solid fa-circle-info"></i>AboutUs</Link>
          <Link to='/contactUs' className='links'><i class="fa-solid fa-address-card"></i>ContactUs</Link>
          {
            isAuthenticated ? (
              <div>
                <span className='user-great'>Welcome, {user}!</span>
                <button className='user-great' onClick={() => dispatch(logout())}>Logout</button>
              </div>
            ) : (
              <Link to="/login" className='links'><i class="fa-solid fa-user"></i>Sign In</Link>
            )
          }
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonVeg" element={<NonVeg />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/dairy" element={<Dairy />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
