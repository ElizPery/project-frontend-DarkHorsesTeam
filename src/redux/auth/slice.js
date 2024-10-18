import { createSlice } from '@reduxjs/toolkit';
import { logIn } from './operations.js';
import toast from 'react-hot-toast';

const initialState = {
  user: {
    name: null,
    email: null,
    photo: null,
    gender: 'woman',
    weight: null,
    sportTime: null,
    dailyNorma: 1500,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

const handleFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoading = false;
  state.isLoggedIn = true;
  state.error = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Login failed: ${action.payload}`);
      })
      .addCase(logIn.fulfilled, handleFulfilled);
    // .addCase(register.pending, handlePending)
  },
});

export default authSlice.reducer;
