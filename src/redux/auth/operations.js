import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';
export const signUp = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };

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
