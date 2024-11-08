// authSlice.js
import { getCookie, removeCookie } from '@/lib/helper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for verifying user authentication
export const verifyUser = createAsyncThunk('auth/verifyUser', async (_, { rejectWithValue }) => {
  try {
    // Retrieve the JWT token from the cookies
    const token = getCookie('jwt');
    if (!token) {
      throw new Error('No token found');
    }

    // Make an API call to verify the user
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the user data if verification is successful
    return response.data;
  } catch (error) {
    console.error('Verification error:', error);
    return rejectWithValue(error.response?.data?.message || 'Failed to verify user');
  }
});

// Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      removeCookie('jwt')
      removeCookie('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
