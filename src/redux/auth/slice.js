import { createSlice } from '@reduxjs/toolkit';
import { logIn, fetchUser, updateUserInfo, changeUserPhoto, signUp, logoutUser } from './operations';
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
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};


const handlePending = (state) => {
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
        .addCase(signUp.fulfilled, (state, action) => {
          state.user.name = action.payload.data.name;
          state.user.email = action.payload.data.email;
          state.user.dailyNorma = action.payload.data.dailyNorma;
          state.user.gender = action.payload.data.gender;
          state.user.photo = action.payload.data.photo;
          state.isLoading = false;
          state.error = null;
        })
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
        .addCase(updateUserInfo.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateUserInfo.fulfilled, (state, action) => {
          state.user.name = action.payload.data.name;
          state.user.email = action.payload.data.email;
          state.user.dailyNorma = action.payload.data.dailyNorma;
          state.user.gender = action.payload.data.gender;
          state.user.photo = action.payload.data.photo;
          state.isLoading = false;
        })
        .addCase(updateUserInfo.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          toast.error(`Update info failed: ${action.payload}`);
        })
        .addCase(changeUserPhoto.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(changeUserPhoto.fulfilled, (state, action) => {
          state.user.photo = action.payload.data.photo;
          state.isLoading = false;
        })
        .addCase(changeUserPhoto.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          toast.error(`Change photo failed: ${action.payload}`);
        });
    },
  })

export default authSlice.reducer;