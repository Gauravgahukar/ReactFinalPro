import { configureStore, createSlice } from '@reduxjs/toolkit';


//Product Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        vegItems: [
            { name: "Paneer", price: 250.54, image:"paneer.webp"},
            { name: "Tomato", price: 40.00 },
            { name: "Potato", price: 30.90 },
            { name: "Onion", price: 50.20 },
            { name: "Carrot", price: 60 },
            { name: "Cabbage", price: 25 }, 
            { name: "Broccoli", price: 80.75},
            { name: "Spinach", price: 45.00},
            { name: "Capsicum", price: 70.40},
            { name: "Mushroom", price: 120.90},
            { name: "Sweet Corn", price: 35.60},
            { name: "Peas", price: 90.50 },
            { name: "Garlic", price: 150.00 },
            { name: "Ginger", price: 200.80 },
            { name: "Cucumber", price: 30.00 },
            { name: "Lettuce", price: 55.90 } 
        ],
        nonVegItems: [
            { name: "Chicken", price: 300.80 },
            { name: "Mutton", price: 600.60 },
            { name: "Fish", price: 400.54 },
            { name: "Prawns", price: 500.21 },
            { name: "Eggs", price: 60.00 },
            { name: "Crab", price: 700.00 },
            { name: "Squid", price: 600.90 },
            { name: "Lobster", price: 1200.25 },
            { name: "Duck Eggs", price: 80.00 },
            { name: "Salmon", price: 950.75 },
            { name: "Octopus", price: 1100.10 },
            { name: "Turkey", price: 400.40 },
            { name: "Clams", price: 300.30 },
            { name: "Quail Eggs", price: 90.50 },
            { name: "Shrimp", price: 450.75 }
          ],
        dairyItems: [
           
  { name: "Amul (Milk)", company: "Amul", price: 50.36 },
  { name: "Dinshaw (Milk)", company: "Dinshaw", price: 250.99 },
  { name: "MilkyWay (Milk)", company: "MilkyWay", price: 200.88 },
  { name: "Mother Dairy (Milk)", company: "Mother Dairy", price: 55.00 },
  { name: "Britannia (Ghee)", company: "Britannia", price: 270.50 },
  { name: "Nestle (Ghee)", company: "Nestle", price: 100.45 },
  { name: "Amul (Butter)", company: "Amul", price: 200.00 },
  { name: "Amul (Yogurt)", company: "Amul", price: 52.00 },
  { name: "MilkyWay (Paneer)", company: "MilkyWay", price: 205.70 },
  { name: "Dinshaw (Cheese)", company: "Dinshaw", price: 249.50 },
  { name: "Mother Dairy (Ghee)", company: "Mother Dairy", price: 300.00 },
  { name: "Britannia (Cheese)", company: "Britannia", price: 269.99 },
  { name: "Amul (Cheese)", company: "Amul", price: 199.99 },
  { name: "Nestle (Yogurt)", company: "Nestle", price: 102.50 },
  { name: "Amul (Ghee)", company: "Amul", price: 51.20 },
          ]
          
    },
    reducers: {}
});

//Cart Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: JSON.parse(localStorage.getItem("cart")) || [],  // ✅ Load from localStorage
    reducers: {
        addToCart: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state));  // ✅ Save to localStorage
        },
        increament: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            }
            localStorage.setItem("cart", JSON.stringify(state));  // ✅ Save to localStorage
        },
        decreament: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                return state.filter(item => item.name !== action.payload.name);
            }
            localStorage.setItem("cart", JSON.stringify(state));  // ✅ Save to localStorage
        },
        remove: (state, action) => {
            const newState = state.filter(item => item.name !== action.payload.name);
            localStorage.setItem("cart", JSON.stringify(newState));  // ✅ Save to localStorage
            return newState;
        },
        clearCart() {
            localStorage.removeItem("cart");  // ✅ Remove from localStorage
            return [];
        }
    }
});

//purchaseDetails Slice
/*
const purchaseDetailsSlice = createSlice({
    name: "purchaseDetails",
    initialState:{
        orderDetails:[]
    },
    reducers: {
        addToOrders(state, action) {
            state.orderDetails.push(action.payload);
          },
    },
  });
  */
  const purchaseDetailsSlice = createSlice({
    name: "purchaseDetails",
    initialState: {
        orderDetails: JSON.parse(localStorage.getItem("orderDetails")) || []
    },
    reducers: {
        addToOrders(state, action) {
            state.orderDetails.push(action.payload);
            localStorage.setItem("orderDetails", JSON.stringify(state.orderDetails));  // ✅ Save to localStorage
        },
    },
});

  //authSlice
  const authSlice = createSlice({
    name : "auth",
    initialState : {
        isAuthenticated: localStorage.getItem("username") ? true : false,

        user : localStorage.getItem("username") || "",
    },
    reducers : {
        login : (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem("username", action.payload);
        },
        logout : (state) => {
            state.isAuthenticated = false;
            state.user = "";
            localStorage.removeItem("username");
            localStorage.removeItem("cart");
            localStorage.removeItem("orderDetails")
        },
    }
  })
  
//configuration
const Store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        purchaseDetails: purchaseDetailsSlice.reducer,
        auth : authSlice.reducer,
    }
});


export default Store;
export const { addToCart, increament, decreament, remove, clearCart } = cartSlice.actions;
export const {addToOrders} = purchaseDetailsSlice.actions;
export const {login, logout} = authSlice.actions;
