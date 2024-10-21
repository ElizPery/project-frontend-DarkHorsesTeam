import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from './operations';
import { logIn, signUp } from './operations.js';
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
      .addCase(logIn.fulfilled, handleFulfilled)
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Registration failed: ${action.payload}`);
      })
      .addCase(signUp.fulfilled, handleFulfilled)
      // .addCase(register.pending, handlePending)
      .addCase(logoutUser.fulfilled, state => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
