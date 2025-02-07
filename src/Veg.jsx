import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'; // Make sure to import useState
import './App.css'
import { addToCart } from './store';

function Veg() {
  let vegItems = useSelector((state) => state.products.vegItems);
  let dispatch = useDispatch();

  // State for filters
  const [filters, setFilters] = useState({ low: false, mid: false, high: false });

  // Update filters on checkbox change
  const applyFilter = (range) => setFilters({ ...filters, [range]: !filters[range] });

  // Filter items based on selected checkboxes
  const filteredItems = vegItems.filter((item) => {
    if (filters.low && item.price <= 100) return true;
    if (filters.mid && item.price > 100 && item.price <= 200) return true;
    if (filters.high && item.price > 200 && item.price <= 300) return true;
    return !filters.low && !filters.mid && !filters.high;  
  });

  // Map the filtered items
  const finalItems = filteredItems.map((item, index) => (
    <li key={index}>
      {item.name} - ₹ {item.price} <img src={item.image} alt=""/>
      <button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
    </li>
  ));

  return (
    <div className="container">
      <h1>Welcome to the Veg Items.</h1>
      <img src="vegetables.jpg" alt="vegetable" className='items' />
      <div>
        <label> <input type="checkbox" onChange={() => applyFilter('low')} /> 0 - 100 </label>
        <label> <input type="checkbox" onChange={() => applyFilter('mid')} /> 101 - 200 </label>
        <label> <input type="checkbox" onChange={() => applyFilter('high')} /> 201 - 300 </label>
      </div>
      <ul>{finalItems}</ul>
    </div>
  );
}

export default Veg;
