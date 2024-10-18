import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
      try {
        await axios.post(`${BASE_URL}/users/logout`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        localStorage.removeItem('token');
      } catch (error) {
        return thunkApi.rejectWithValue(
          error.response?.data?.message || 'Logout failed'
        );
      }
    }
  );
  


axios.defaults.baseURL = "";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };