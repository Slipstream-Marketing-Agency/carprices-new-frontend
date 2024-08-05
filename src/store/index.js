// /src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/carSlice';
import imageReducer from './slices/imageSlice';

export const store = configureStore({
  reducer: {
    car: carReducer,
    image: imageReducer,
  },
});

export default store;
