import { configureStore, createSlice } from '@reduxjs/toolkit';


//Product Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        vegItems: [
            { name: "Paneer", price: 250.54, image:"paneer.webp"},
            { name: "Tomato", price: 40.00,  image:"tomatoes.webp"},
            { name: "Potato", price: 30.90, image:"potato.webp"},
            { name: "Onion", price: 50.20, image:"onions.webp"},
            { name: "Carrot", price: 60, image:"carrots.webp"},
            { name: "Cabbage", price: 25, image:"cabbage.webp"}, 
            { name: "Broccoli", price: 80.75, image:"broccoli.webp"},
            { name: "Spinach", price: 45.00, image:"spinach.webp"},
            { name: "Capsicum", price: 70.40, image:"Capsicum.webp"},
            { name: "Mushroom", price: 120.90, image:"Mushroom.webp"},
            { name: "Sweet Corn", price: 35.60, image:"Sweet Corn.webp"},
            { name: "Peas", price: 90.50, image:"Peas.webp"},
            { name: "Garlic", price: 150.00, image:"Garlic.webp"},
            { name: "Ginger", price: 200.80, image:"Ginger.webp"},
            { name: "Cucumber", price: 30.00, image:"Cucumber.webp"},
            { name: "Lettuce", price: 55.90, image:"Lettuce.webp"} 
        ],
        nonVegItems: [
            { name: "Chicken", price: 300.80, image:"Chicken.webp"},
            { name: "Mutton", price: 600.60, image:"Mutton.webp" },
            { name: "Fish", price: 400.54, image:"Fish.webp"},
            { name: "Prawns", price: 500.21, image:"Prawns.webp"},
            { name: "Eggs", price: 60.00, image:"Eggs.webp"},
            { name: "Crab", price: 700.00, image:"Crab.webp"},
            { name: "Squid", price: 600.90, image:"Squid.webp"},
            { name: "Lobster", price: 1200.25, image:"Lobester.webp"},
            { name: "Duck Eggs", price: 80.00, image:"Duck Eggs.webp"},
            { name: "Salmon", price: 950.75, image:"Salmon.webp"},
            { name: "Octopus", price: 1100.10, image:"Octopus.webp"},
            { name: "chicken", price: 400.40, image:"Turkeychicken.webp"},
            { name: "Clams", price: 300.30, image:"Clams.webp"},
            { name: "Quail Eggs", price: 90.50, image:"Q    uail Eggs.webp"},
            { name: "Shrimp", price: 450.75, image:"Shrimp.webp"}
          ],
        dairyItems: [
            { name: "Amul (Milk)", company: "Amul", price: 50.36, image:"Milk.webp"},
            { name: "Amul (Ghee)", company: "Dinshaw", price: 250.99, image:"Ghee.webp"},
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
