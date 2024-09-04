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

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        status: null
    },
    reducers: {},
    extraReducers: {
        [addToCart.fulfilled]: (state, action) => {
            // If the product already exists in the cart, update the quantity
            const existingProduct = state.cartItems.find(
                item => item.productId === action.payload.productId
            );
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                // Otherwise, add the new product to the cart
                state.cartItems.push(action.payload);
            }
        }
    }
});

export default cartSlice.reducer;