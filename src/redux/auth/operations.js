import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-backend-darkhorsesteam.onrender.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signUp = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('auth/register', userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 409) {
          return thunkAPI.rejectWithValue(
            'This email is already registered. Please sign in.'
          );
        }
        if (status === 400) {
          return thunkAPI.rejectWithValue(
            'Invalid data provided. Please check your inputs.'
          );
        }
      }
      return thunkAPI.rejectWithValue(
        'Something went wrong. Please try again.'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await axios.post('auth/logout');

      clearAuthHeader();

      localStorage.removeItem('token');
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('auth/login', userData);
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
