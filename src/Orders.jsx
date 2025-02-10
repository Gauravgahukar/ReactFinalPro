import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector((state) => state.purchaseDetails.orderDetails);

  const OrderItems = (items) => {
    return items.map((item, index) => (
      <li key={index}>
        {item.name} - ₹{item.price} x {item.quantity}
      </li>
    ));
  };

  const deleteOrder = () => {
  }

  return (
    <>
      {orders.length > 0 ? (
        <div className="orders">
          <h1>Purchase History</h1>
          {orders.map((order, index) => (
            <div key={index} className="order">
              <h2>Order Date: {order.date}  Time: {order.hour} : {order.min} : {order.sec}</h2>
              <h3>Total Amount: ₹{order.totalAmount.toFixed(2)}</h3>
              <ul>{OrderItems(order.items)}</ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-cart">
          <h1>No orders placed yet.</h1>
        </div>
      )}
      {/* <button className="button">Delete Order</button> */}
    </>
  );
}

export default Orders;
