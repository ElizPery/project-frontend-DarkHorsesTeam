
import { createSlice } from '@reduxjs/toolkit';
import { logIn, fetchUser, updateUserInfo, changeUserPhoto, signUp, logoutUser } from './operations';
import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axios from 'axios';


axios.defaults.baseURL = 'https://project-backend-darkhorsesteam.onrender.com/';
const initialState = {
  user: {
    name: null,
    email: "eli@gmail.com",
    photo: null,
    gender: 'woman',
    weight: null,
    sportTime: null,
    dailyNorma: 1500,
  },
  token: null,
  isLoggedIn: true,
  isRefreshing: false,
  isLoading: false,
  isFetchingUser: false,
  isUpdatingInfo: false,
  isChangingPhoto: false,
  error: null,
  fetchUserError: null,
  updateInfoError: null,
  changePhotoError: null,
};


const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};


const handleFulfilledLogin = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoading = false;
  state.isLoggedIn = true;
  state.error = null;
};


const authSlice = createSlice({
    name: "auth",
    initialState,
  
    extraReducers: (builder) => {
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
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = initialState.user;
          state.token = null;
          state.isLoggedIn = false;
          state.isRefreshing = false;
          state.isLoading = false; 
          state.error = null;
        })
        .addCase(logoutUser.pending, (state) => {
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
        .addCase(fetchUser.pending, (state) => {
          state.isFetchingUser = true;
          state.fetchUserError = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isFetchingUser = false;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.isFetchingUser = false;
          state.fetchUserError = action.payload;
          toast.error(`Fetch user failed: ${action.payload}`);
        })
        .addCase(updateUserInfo.pending, (state) => {
          state.isUpdatingInfo = true;
          state.updateInfoError = null;
        })
        .addCase(updateUserInfo.fulfilled, (state, action) => {
          state.user = { ...state.user, ...action.payload };
          state.isUpdatingInfo = false;
        })
        .addCase(updateUserInfo.rejected, (state, action) => {
          state.isUpdatingInfo = false;
          state.updateInfoError = action.payload;
          toast.error(`Update info failed: ${action.payload}`);
        })
        .addCase(changeUserPhoto.pending, (state) => {
          state.isChangingPhoto = true;
          state.changePhotoError = null;
        })
        .addCase(changeUserPhoto.fulfilled, (state, action) => {
          state.user.photo = action.payload.photo;
          state.isChangingPhoto = false;
        })
        .addCase(changeUserPhoto.rejected, (state, action) => {
          state.isChangingPhoto = false;
          state.changePhotoError = action.payload;
          toast.error(`Change photo failed: ${action.payload}`);
        });
    },
  })

export default authSlice.reducer;