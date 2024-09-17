import { configureStore } from '@reduxjs/toolkit';

//here all the slices must be imported
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/auth/cart/cartSlice';
import recommendationReducer from '../features/auth/cart/recommendationSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    recommendations: recommendationReducer,
  },
});