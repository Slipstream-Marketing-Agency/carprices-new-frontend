// /src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/carSlice';
import imageReducer from './slices/imageSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    car: carReducer,
    image: imageReducer,
    auth: authReducer,
  },
});

export default store;
