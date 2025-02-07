
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { useState } from "react";

function Dairy() {
   
  let dairyItems = useSelector(state => state.products.dairyItems);
  let dispatch = useDispatch();

  
    // State for filters
    const [filters, setFilters] = useState({ low: false, mid: false, high: false });
    // Update filters on checkbox change
    const applyFilter = (range) => setFilters({ ...filters, [range]: !filters[range] });
    // Filter items based on selected checkboxes
    const filteredItems = dairyItems.filter((item) => {
      if (filters.low && item.price <= 100) return true;
      if (filters.mid && item.price > 100 && item.price <= 200) return true;
      if (filters.high && item.price > 200 && item.price <= 300) return true;
      return !filters.low && !filters.mid && !filters.high;  
    });

    let finalItems = filteredItems.map((item, index) => (
      <li key={index}>
        {item.name}- ₹ {item.price}
        <button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
      </li>
    ));
  

  return (
    <>
     <div className='container'>
      <h1>Welcome to the Dairy Items.</h1>
      <img src="dairy.png" alt="dairy" className='items' />
      <div>
        <label> <input type="checkbox" onChange={() => applyFilter('low')} /> 0 - 100 </label>
        <label> <input type="checkbox" onChange={() => applyFilter('mid')} /> 101 - 200 </label>
        <label> <input type="checkbox" onChange={() => applyFilter('high')} /> 201 - 300 </label>
      </div>
      <ul>{finalItems}</ul>
      </div>
    </>
  )
}
export default Dairy;