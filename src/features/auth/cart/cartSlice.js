import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Add product to cart
export const addToCart = createAsyncThunk('cart/addToCart', async (product,{getState}) => {
     // Get the token from the Redux state (assuming the token is stored in state.auth.token)
     const token = getState().auth.token;
     
     console.log('Token retrieved from Redux:', token);  // Debugging log
    
    const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });
    return response.json();
});


// Update cart item quantity
export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }, { getState }) => {
    const token = getState().auth.token; // Get token from Redux state
    const response = await fetch(`http://localhost:5000/api/cart/update-quantity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    return response.json(); // Return the updated cart item
  });

// Checkout action
export const checkout = createAsyncThunk('cart/checkout', async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch('http://localhost:5000/api/cart/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  });

  // Fetch cart items
export const getCart = createAsyncThunk('cart/getCart', async (_, { getState }) => {
    const token = getState().auth.token;  // Get token from Redux state
    const response = await fetch('http://localhost:5000/api/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();  // Assuming the response is the user's cart
  });


  
  const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      cartItems: [],  // Ensure cartItems is initialized as an empty array
      status: null
    },
    reducers: {},
    extraReducers: {
      [addToCart.fulfilled]: (state, action) => {
        const existingProduct = state.cartItems.find(item => item.productId === action.payload.productId);
        if (existingProduct) {
          existingProduct.quantity += action.payload.quantity;
        } else {
          state.cartItems.push(action.payload);
        }
      },
      [updateQuantity.fulfilled]: (state, action) => {
        const updatedItem = state.cartItems.find(item => item.productId === action.payload.productId);
        if (updatedItem) {
          updatedItem.quantity = action.payload.quantity; // Update quantity
        }
      },
      [getCart.fulfilled]: (state, action) => {
        state.cartItems = action.payload; // Load the cart from the backend
      },
      [checkout.fulfilled]: (state) => {
        state.cartItems = []; // Clear the cart after checkout
        state.status = 'Checkout successful';
      }
    }
  });
  

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         cartItems: [],
//         status: null
//     },
//     reducers: {},
//     extraReducers: {
//         [addToCart.fulfilled]: (state, action) => {
//             // If the product already exists in the cart, update the quantity
//             const existingProduct = state.cartItems.find(
//                 item => item.productId === action.payload.productId
//             );
//             if (existingProduct) {
//                 existingProduct.quantity += action.payload.quantity;
//             } else {
//                 // Otherwise, add the new product to the cart
//                 state.cartItems.push(action.payload);
//             }
//         }
//     }
// });

export default cartSlice.reducer;