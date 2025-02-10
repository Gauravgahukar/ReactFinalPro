import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToOrders, clearCart, decreament, increament, remove } from "./store";

function Cart() {

  //get the cart items form store
  const cartObject = useSelector(state => state.cart);

  //dispatch the onClick event
  const dispatch = useDispatch();

  //convert the above object into list items
  const cartItem = cartObject.map((item, index) =>
    <li key={index}>
      {item.name} - ₹ {item.price}
      <button onClick={() => dispatch(addToCart(item))}>OK</button> 
                                                   {/* Add to Cart */}

      <button onClick={() => dispatch(increament(item))}> + </button>
      <button onClick={() => dispatch(decreament(item))}> - </button>
      <p className="cart-item-quantity"> Quantity: </p>
      {item.quantity}
      <button onClick={() => dispatch(remove(item))}> Remove </button>
    </li>
  );
  /*
    const cartItem = cartObject.map((item, index) =>
        <li key={index}>
            <table>
                <tr>
                    <td> {item.name}</td> 
                    <td> - </td>
                    <td>₹{item.price}</td>
                    <td><button onClick={() => dispatch(increament(item))}> + </button></td>
                    <td><button onClick={() => dispatch(decreament(item))}> - </button></td> 
                    <td><p className="cart-item-quantity"> Quantity: </p></td>
                    <td>{item.quantity}</td>
                    <td> <button onClick={() => dispatch(remove(item))}> Remove </button> </td>

                </tr> 
            </table>

        </li>
    );
*/
  //calculate the total price
  const totalPrice = cartObject.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //set the discount percentage
  const [discPercent, setDiscPercent] = useState(0);
  //calculate the discount amount
  const discAmount = totalPrice * discPercent / 100;

  //take state variable
  const [showDisc, setShowDisc] = useState(false);
  const [showCouponDisc, setShowCouponDisc] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [couponCodePercent, setCouponCodePercent] = useState(0);
  //Coupon Code calculation
  const couponDiscAmt = totalPrice * couponCodePercent / 100;

  //calculate the final amount
  const finalAmount = totalPrice - (discAmount + couponDiscAmt);

  const handleCouponPercent = () => {
    const code = couponCode.toUpperCase();
    let discount = 0;
  
    switch (code) {
      case "Ratan@10":
        discount = 10;
        break;
      case "Yakub@20":
        discount = 20;
        break;
      case "Shrinivas@30":
        discount = 30;
        break;
      default:
        alert("Invalid Coupon Code!");
        discount = 0;
    }
  
    setCouponCodePercent(discount);
    setShowCouponDisc(discount > 0); // Only show discount if valid coupon
  };



  // ---------purachase all button
  
  //const purchaseDetailsOBject ={date: purchaseDate, item:[...cartItems],totalAmount: totalPrice,}
  const now = new Date();
  const purchaseDate = now.toLocaleDateString(); 
  const purachaseHour = now.getHours().toString().padStart(2, '0');
  const purachaseMin = now.getMinutes().toString().padStart(2, '0');
  const purachaseSec = now.getSeconds().toString().padStart(2, '0');
  
//create function to handle purchasedetails
  const handlePurchaseDetails = () => {
    //const purchaseDetailsOBject ={date: purchaseDate, item:[...cartItems],totalAmount: totalPrice,}
    const purchaseDetails = {
      items: [...cartObject],
      totalAmount: finalAmount,
      date: purchaseDate, 
      hour: purachaseHour,
      min: purachaseMin,
      sec: purachaseSec,
    };

  //send the object to store purchaseDetails slice using useDispatch
    dispatch(addToOrders(purchaseDetails));
    //clear the cart
    dispatch(clearCart());
  };



  return (
    <>
      {cartObject.length > 0 ?
        <div className="container">
          <h1>Welcome to the Cart.</h1>
          <ul>{cartItem}</ul>
          <h2>Your Total Price: ₹ {totalPrice.toFixed(2)}</h2>
          {showDisc && (
            <div className="discount">
              <h2>Your Discount Applied : {discPercent}%</h2>
              <h2>Your Discount Amount : ₹{discAmount.toFixed(2)}</h2>
            </div>
          )}
          
          <button onClick={() => { setDiscPercent(10), setShowDisc(true) }}>Apply 10% Discount</button>
          <button onClick={() => { setDiscPercent(20), setShowDisc(true) }}>Apply 20% Discount</button>
          <button onClick={() => { setDiscPercent(30), setShowDisc(true) }}>Apply 30% Discount</button>
          {showCouponDisc && couponCodePercent > 0 && (
            <div className="coupon-discount">
              <h2>Your Coupon :{couponCode}</h2>
              <h2>Your Coupon Discount Applied : {couponCodePercent}%</h2>
              <h2>Your Coupon Discount Amount : ₹{couponDiscAmt.toFixed(2)}</h2>
            </div>
          )}

          <h2>Your Net Amount to Pay : ₹{finalAmount.toFixed(2)}</h2>
          <input
            type="text"
            className="coupon"
            placeholder="Enter coupon code..."
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button onClick={() => {handleCouponPercent(),setShowCouponDisc(true)}}>Apply Coupon</button>
          <button onClick={handlePurchaseDetails}>Purchase All</button>
        </div>
        :
        (<div className="empty-cart">
          <h1>Your cart is empty.</h1>
        </div>)
      } 
    </>
  )
}
export default Cart;