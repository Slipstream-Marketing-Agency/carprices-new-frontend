// /src/store/slices/imageSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: {},
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading[action.payload.id] = action.payload.loading;
    },
  },
});

export const { setLoading } = imageSlice.actions;

export default imageSlice.reducer;
