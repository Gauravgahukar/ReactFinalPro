import React, { useState } from "react"; // Ensure useState is imported
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function NonVeg() {
  // Fetch non-veg items from state
  const nonVegItems = useSelector((state) => state.products.nonVegItems);

  // Dispatch hook
  const dispatch = useDispatch();

  // State for filters
  const [filters, setFilters] = useState({ low: false, mid: false, high: false });

  // Update filters on checkbox change
  const applyFilter = (range) => {
    setFilters({ ...filters, [range]: !filters[range] });
  };

  // Filter items based on selected checkboxes
  const filteredItems = nonVegItems.filter((item) => {
    if (filters.low && item.price <= 400) return true;
    if (filters.mid && item.price > 400 && item.price <= 800) return true;
    if (filters.high && item.price > 800 && item.price <= 1200) return true;
    return !filters.low && !filters.mid && !filters.high; // Show all if no filter is selected
  });

  // Render filtered items
  const finalItems = filteredItems.map((item, index) => (
    <li key={index}>
      {item.name} - ₹ {item.price}
      <button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
    </li>
  ));

  return (
    <div className="container">
      <h1>Welcome to the Non-Veg Items</h1>
      <img src="nonveg.jpg" alt="nonveg" className='items' />
      <div className="filter-options">
        <label> <input type="checkbox" onChange={() => applyFilter("low")} /> 0 - 400 </label>
        <label> <input type="checkbox" onChange={() => applyFilter("mid")} /> 400 - 800 </label>
        <label> <input type="checkbox" onChange={() => applyFilter("high")} /> 800 - 1200 </label>
      </div>
      <ul>{finalItems}</ul>
    </div>
  );
}

export default NonVeg;
