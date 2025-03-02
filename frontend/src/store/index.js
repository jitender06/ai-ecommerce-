import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import recommendationsReducer from './recommendationsSlice';
import tryOnReducer from './tryOnSlice';
import swapResellReducer from './swapResellSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    recommendations: recommendationsReducer,
    tryOn: tryOnReducer,
    swapResell: swapResellReducer,
  },
});