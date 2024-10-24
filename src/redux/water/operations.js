import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';


export const getWaterMonth = createAsyncThunk('water/addMonth', async (month, thunkAPI) => {
    try {
        const result = await axios.post('/water/month', month)
        return result.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
    
});