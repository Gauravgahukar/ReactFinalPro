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
          <Link to='/home' className='links'>Home</Link>
          <Link to='/veg' className='links'>Veg-Items</Link>
          <Link to='/nonVeg' className='links'>NonVeg-Items</Link>
          <Link to='/dairy' className='links'>Dairy-Items</Link>
          <Link to='/cart' className='links'>Cart <span className='cart-items'>{totalItems}</span></Link>
          <Link to='/orders' className='links'>Orders</Link>
          <Link to='/aboutUs' className='links'>AboutUs</Link>
          <Link to='/contactUs' className='links'>ContactUs</Link>
          {
            isAuthenticated ? (
              <div>
                <span className='user-great'>Welcome, {user}!</span>
                <button className='user-great' onClick={() => dispatch(logout())}>Logout</button>
              </div>
            ) : (
              <Link to="/login" className='links'>Sign In</Link>
            )
          }
        </div>

        <Routes>
          <Route path="/home" element={<Home />} />
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
