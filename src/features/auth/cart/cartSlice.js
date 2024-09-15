import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';



// Add product to cart
export const addToCart = createAsyncThunk('cart/addToCart', async (product, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('http://localhost:5000/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to add product to cart');
  }
  return response.json();
});

// Update cart item quantity
export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`http://localhost:5000/api/cart/update-quantity`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to update cart quantity');
  }
  return { productId, quantity };
});

// Checkout action
export const checkout = createAsyncThunk('cart/checkout', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('http://localhost:5000/api/cart/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to checkout');
  }
  return response.json();
});

// Fetch cart items
export const getCart = createAsyncThunk('cart/getCart', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  const response = await fetch('http://localhost:5000/api/cart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();

    // Check if the error is due to an expired token
    if (response.status === 401 && errorData.message === 'jwt expired') {
      return rejectWithValue('Session expired');  // Return this as the error message
    }

    throw new Error('Failed to fetch cart');
  }

  const data = await response.json();
  return data;
});

// Remove item from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`http://localhost:5000/api/cart/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }

  return productId; // Return the productId to remove it from the Redux state
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [], // Ensure cartItems is initialized as an empty array
    status: null,
    error: null,
    sessionExpired: false,  // Add this flag to track session expiration
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        console.log('Cart data stored in Redux:', action.payload); // Check the data stored in Redux
        state.cartItems = action.payload || []; // Ensure cartItems is always an array
        state.error = null;
        state.sessionExpired = false;  // Reset this if cart fetch is successful
      })
      .addCase(getCart.rejected, (state, action) => {
        if (action.payload === 'Session expired') {
          state.sessionExpired = true;  // Set this to true when session expires
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // Filter out the removed productId from cartItems
        state.cartItems = state.cartItems.filter(item => item.productId._id !== action.payload);
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        console.error('Failed to remove item from cart:', action.error.message);
        state.error = action.error.message;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        // Find the cart item and update its quantity
        const { productId, quantity } = action.payload;
        const item = state.cartItems.find(item => item.productId._id === productId);
        if (item) {
          item.quantity = quantity;
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        console.error('Failed to update cart quantity:', action.error.message);
      });
  },
});

// Selector for cartItems
export const selectCartItems = createSelector(
  (state) => state.cart?.cartItems || [], // Ensure cart slice exists in state, fall back to empty array if undefined
  (cartItems) => cartItems || [] // Ensure cartItems is always an array
);

// Selector for session expiration
export const selectSessionExpired = (state) => state.cart.sessionExpired;

export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';



// // Add product to cart
// export const addToCart = createAsyncThunk('cart/addToCart', async (product, { getState }) => {
//   const token = getState().auth.token;
//   const response = await fetch('http://localhost:5000/api/cart/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(product),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to add product to cart');
//   }
//   return response.json();
// });

// // Update cart item quantity
// export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }, { getState }) => {
//   const token = getState().auth.token;
//   const response = await fetch(`http://localhost:5000/api/cart/update-quantity`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ productId, quantity }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to update cart quantity');
//   }
//   return { productId, quantity };
// });

// // Checkout action
// export const checkout = createAsyncThunk('cart/checkout', async (_, { getState }) => {
//   const token = getState().auth.token;
//   const response = await fetch('http://localhost:5000/api/cart/checkout', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to checkout');
//   }
//   return response.json();
// });

// // Fetch cart items

// export const getCart = createAsyncThunk('cart/getCart', async (_, { getState, rejectWithValue }) => {
//   const token = getState().auth.token;
//   const response = await fetch('http://localhost:5000/api/cart', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
    
//     // Check if the error is due to an expired token
//     if (response.status === 401 && errorData.message === 'jwt expired') {
//       return rejectWithValue('Session expired');  // Return this as the error message
//     }
    
//     throw new Error('Failed to fetch cart');
//   }

//   const data = await response.json();
//   return data;
// });

// // export const getCart = createAsyncThunk('cart/getCart', async (_, { getState }) => {
// //   const token = getState().auth.token;
// //   const response = await fetch('http://localhost:5000/api/cart', {
// //     method: 'GET',
// //     headers: {
// //       'Content-Type': 'application/json',
// //       Authorization: `Bearer ${token}`,
// //     },
// //   });

// //   if (!response.ok) {
// //     throw new Error('Failed to fetch cart');
// //   }

// //   const data = await response.json();
// //   console.log("data:",data)
// //   return data; // This is the cart payload
// // });

// // Remove item from cart
// export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { getState }) => {
//   const token = getState().auth.token;
//   const response = await fetch(`http://localhost:5000/api/cart/remove`, {
//     method: 'DELETE', 
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ productId }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to remove item from cart');
//   }

//   return productId; // Return the productId to remove it from the Redux state
// });



// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cartItems: [], // Ensure cartItems is initialized as an empty array
//     status: null,
//     error: null,
//     sessionExpired: false,  // Add this flag to track session expiration
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCart.fulfilled, (state, action) => {
//         console.log('Cart data stored in Redux:', action.payload); // Check the data stored in Redux
//         state.cartItems = action.payload || []; // Ensure cartItems is always an array
//         state.error = null;
//         state.sessionExpired = false;  // Reset this if cart fetch is successful
//       })
//       .addCase(getCart.rejected, (state, action) => {
//         if (action.payload === 'Session expired') {
//           state.sessionExpired = true;  // Set this to true when session expires
//         } else {
//           state.error = action.error.message;
//         }
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         // Filter out the removed productId from cartItems
//         state.cartItems = state.cartItems.filter(item => item.productId._id !== action.payload);
//         state.error = null;
//       })
//       .addCase(removeFromCart.rejected, (state, action) => {
//         console.error('Failed to remove item from cart:', action.error.message);
//         state.error = action.error.message;
//       })
//       builder.addCase(updateQuantity.fulfilled, (state, action) => {
//         // Find the cart item and update its quantity
//         const { productId, quantity } = action.payload;
//         const item = state.cartItems.find(item => item.productId._id === productId);
//         if (item) {
//           item.quantity = quantity;
//         }
//       });
//       builder.addCase(updateQuantity.rejected, (state, action) => {
//         console.error('Failed to update cart quantity:', action.error.message);
//       });
//   },
// });


// // Selector for cartItems
// export const selectCartItems = createSelector(
//   (state) => state.cart?.cartItems || [], // Ensure cart slice exists in state, fall back to empty array if undefined
//   (cartItems) => cartItems || [] // Ensure cartItems is always an array
// );

// export default cartSlice.reducer;

