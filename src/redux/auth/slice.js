import { createSlice } from '@reduxjs/toolkit';
import {
  logIn,
  fetchUser,
  updateUserInfo,
  changeUserPhoto,
  signUp,
  logoutUser,
  updateDailyWaterRate,
  refreshUser,
} from './operations';
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-backend-darkhorsesteam.onrender.com/';
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
  isModalOpen: false,
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

// const handleFulfilled = (state, action) => {
//   state.user = action.payload.user;
//   state.token = action.payload.token;
//   state.isLoading = false;
//   state.isLoggedIn = true;
//   state.error = null;
// };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetModalState: state => {
      state.isModalOpen = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Login failed: ${action.payload}`);
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Registration failed: ${action.payload}`);
      })
      .addCase(signUp.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
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
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user.name = action.payload.data.name;
        state.user.email = action.payload.data.email;
        state.user.dailyNorma = action.payload.data.dailyNorma;
        state.user.gender = action.payload.data.gender;
        state.user.photo = action.payload.data.photo;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Fetch user failed: ${action.payload}`);
      })
      .addCase(updateUserInfo.pending, state => {
        state.isModalOpen = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isModalOpen = false;
        state.user.name = action.payload.data.name;
        state.user.email = action.payload.data.email;
        state.user.dailyNorma = action.payload.data.dailyNorma;
        state.user.gender = action.payload.data.gender;
        state.user.photo = action.payload.data.photo;
        state.isLoading = false;
        toast.success('User information updated successfully!');
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isModalOpen = true;
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Update info failed: ${action.payload}`);
      })
      .addCase(changeUserPhoto.pending, state => {
        state.isModalOpen = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeUserPhoto.fulfilled, (state, action) => {
        state.isModalOpen = true;
        state.user.photo = action.payload.data.photo;
        state.isLoading = false;
      })
      .addCase(changeUserPhoto.rejected, (state, action) => {
        state.isModalOpen = true;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateDailyWaterRate.pending, state => {
        state.isModalOpen = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDailyWaterRate.fulfilled, (state, action) => {
        state.isModalOpen = true;
        state.user.dailyNorma = action.payload.data.dailyNorma;
        state.isLoading = false;
      })
      .addCase(updateDailyWaterRate.rejected, (state, action) => {
        state.isModalOpen = true;
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});
export const { resetModalState } = authSlice.actions;

export default authSlice.reducer;
