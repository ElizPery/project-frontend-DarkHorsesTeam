import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await axios.post("/auth/logout");

      clearAuthHeader();

      localStorage.removeItem('token');
    } catch (error) {

        return thunkApi.rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);

